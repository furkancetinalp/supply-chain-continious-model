pub(crate) mod create_product_request;
pub(crate) mod create_main_product_request;
use crate::{context::{MAIN_PRODUCTS, PRODUCTS}, entities::{manufacturing::{main_product::MainProduct, product::Product}, product_status::ProductStatus, unit::Unit}};
use create_product_request::CreateProductRequest;
use create_main_product_request::CreateMainProductRequest;
use update_main_product_request::UpdateMainProductRequest;
use crate::idgenerator;
pub(crate) mod update_main_product_request;


#[ic_cdk::update]
 pub async fn create_main_product(request: CreateMainProductRequest) -> bool {
    let created_date = ic_cdk::api::time().to_string();
    let unique_id:u32 = idgenerator::create_id().await;
    let user_id = ic_cdk::caller();

    let data = MainProduct{ 
        id: unique_id, 
        identity:user_id.to_string(),
        name:request.name,
        created_date,
        barcode:request.barcode,
        total_amount:0,
        price:request.price,
        category:request.category,
        brand:request.brand,
        unit:Unit::Piece,
        image_list:request.image_list,
  
    };
    MAIN_PRODUCTS.with(|p| p.borrow_mut().insert(unique_id, data));
    return check_if_data_exists(unique_id).await;
}

#[ic_cdk::query]
pub async fn get_all_main_products() -> Vec< MainProduct> {
    let data: Vec<MainProduct> = MAIN_PRODUCTS.with(|products| {
        let binding = products.borrow();
        let filter = binding.iter().filter(|& x| x.1.identity == ic_cdk::caller().to_string()).collect::<Vec<_>>();
        let result = filter.iter().map(|x| x.1.clone()).collect::<Vec<_>>();
        return result;
    });

    return data;
}

#[ic_cdk::query]
pub async fn get_main_product_by_barcode(barcode:String) -> MainProduct {
    let data = MAIN_PRODUCTS.with(|products| {
        let binding = products.borrow();
        let filter = binding.iter()
        .find(|& x| x.1.identity == ic_cdk::caller().to_string() && x.1.barcode==barcode).unwrap();
        return filter.1.clone();
    });

    return data;
}


#[ic_cdk::update]
 pub async fn create_product( request: CreateProductRequest) -> Option<bool> {
    let product_control = check_if_already_produced(&request.barcode).await;
    if(!product_control.0){
        return Some(false);
    }
    else{
        let main_product_id = product_control.1.as_ref().unwrap().id;
        let barcode = request.barcode.clone();
        product_create_process(request,&product_control.1.as_ref().unwrap().name,1,main_product_id).await;
        update_product_stock(&barcode, 1).await;
        return Some(true);
    }
}




#[ic_cdk::update]
 pub async fn create_bulk_product( request: CreateProductRequest,quantity:u32) -> bool {
    let product_control = check_if_already_produced(&request.barcode).await;
    if(!product_control.0){
        return false;
    }
    else{
        let main_product_id = product_control.1.as_ref().unwrap().id;

        let mut index = 1;
        while index <=quantity {
            product_create_process(request.clone(),&product_control.1.as_ref().unwrap().name,1,main_product_id).await;
            index +=1;
        };
        update_product_stock(&request.barcode, quantity as i64).await;
    }

    return true;
}



//GET ALL
#[ic_cdk::query]
pub async fn get_all_created_products() -> Vec< Product> {
    let data: Vec<Product> = PRODUCTS.with(|products| {
        let binding = products.borrow();
        let filter = binding.iter().filter(|& x| x.1.identity == ic_cdk::caller().to_string()).collect::<Vec<_>>();
        let result = filter.iter().map(|x| x.1.clone()).collect::<Vec<_>>();
        return result;
    });

    return data;
}



//PRODUCT APPROVING
#[ic_cdk::update]
 pub async fn approve_product(product_id:u32,status:ProductStatus) -> bool {
     PRODUCTS.with(|products|{
        let mut products = products.borrow_mut();
        let  item = products.get_mut(&product_id).unwrap();
        item.status = status;
    });
    return true;


}

#[ic_cdk::update]
 pub async fn delete_product(id:u32) -> bool {
     let data = PRODUCTS.with(|item|{
        let mut items = item.borrow_mut();
        let item = items.remove(&id);
        return item;
    });
    if( data.is_some()){
        return true;
    }
    else{
        return false;
    }

}

async fn product_create_process(request:CreateProductRequest,product_name:&str,quantity_per_product:u32,main_product_id:u32) {
    let created_date = ic_cdk::api::time().to_string();
    let unique_id:u32 = idgenerator::create_id().await;
    let user_id = ic_cdk::caller();

    let data = Product{ 
        id: unique_id, 
        identity:user_id.to_string(),
        name:product_name.to_string(),
        main_product_id,
        created_date,
        barcode:request.barcode,
        quantity:quantity_per_product as u64,
        status:ProductStatus::PendingApproval,
  
    };
    PRODUCTS.with(|p| p.borrow_mut().insert(unique_id, data));

}

async fn check_if_already_produced(barcode:&str) -> (bool,Option<MainProduct>){
    MAIN_PRODUCTS.with(|products|{
        let products = products.borrow_mut();
        let product =  (products.iter()
            .find(|x| x.1.barcode==barcode && x.1.identity == ic_cdk::caller().to_string()));
        if  product.is_some(){
            return (true,Some(product.unwrap().1.clone()));
        }
        else{
            return (false,None);
        }
    })
}

async fn update_product_stock(barcode:&str,quantity:i64) {
    MAIN_PRODUCTS.with(|products|{
        let mut products = products.borrow_mut();
        let  item = products.iter_mut()
            .find(|x| x.1.barcode==barcode && x.1.identity == ic_cdk::caller().to_string())
                .unwrap().1;
        item.total_amount =item.total_amount + quantity  as u32;
    });
}


#[ic_cdk::query]
pub async fn assign_products_for_order(amount:u32,barcode:String) -> Option<Vec<Product>>{
    let data = PRODUCTS.with(|products|{
        let  products = products.borrow();
        let  item:Vec<_> = products.iter().
            filter(|x| x.1.barcode==barcode && x.1.status==ProductStatus::Approved && x.1.identity == ic_cdk::caller().to_string()).
                take(amount.try_into().unwrap()).map(|x| x.1.clone())
                    .collect();

        return item;
    });
    if(data.len() < amount as usize){
        return None;
    }
    else{
        let id_list:Vec<u32> = data.iter().map(|x| x.id).clone().collect();
        for id in id_list{
            update_product_status(id,ProductStatus::Ordered).await;
        }
        return Some(data);
    }
}

//SETTING PRODUCT STATUS
#[ic_cdk::update]
 pub async fn update_product_status(product_id:u32,status:ProductStatus) {
     PRODUCTS.with(|products|{
        let mut products = products.borrow_mut();
        let  item = products.get_mut(&product_id).unwrap();
        item.status = status;
    });
}


pub async fn check_if_data_exists(id:u32) -> bool {
    let data = MAIN_PRODUCTS.with(|item|{
       let  items = item.borrow_mut();
       let item = items.get(&id);
       if item.is_none(){
        return false;
       }
       else{
        return true;
       }
   });

   return data;
}

//





#[ic_cdk::query]
 pub async fn get_main_product_by_id(id:u32) -> MainProduct {
     let data = MAIN_PRODUCTS.with(|item|{
        let  items = item.borrow_mut();
        let item = items.get(&id).unwrap();
        return item.clone();
    });

    return data;
}


#[ic_cdk::update]
 pub async fn delete_main_product_by_id(id:u32) -> bool {
    let main_product = get_main_product_by_id(id).await;
    let check = check_single_product_by_barcode(main_product.barcode).await;
    if(check == false){
        return false;
     }
     else{
        let data = MAIN_PRODUCTS.with(|item|{
            let mut items = item.borrow_mut();
            let item = items.remove(&id);
            return item;
        });
        if( data.is_some()){
         
            return true;
        }
        else{
            return false;
        }
     }
   

}

//UPDATE DEMAND YEARLY 
#[ic_cdk::update]
 pub async fn update_main_product(request: UpdateMainProductRequest) -> bool {
    let data = get_main_product_by_id(request.id).await;

    let mut data = MainProduct{
        id:request.id,
        identity:data.identity,
        name:request.name,
        barcode:data.barcode,
        total_amount:0,
        price:request.price,
        category:request.category,
        brand:request.brand,
        unit:Unit::Piece,
        image_list:request.image_list,
        created_date:data.created_date,
    };
    MAIN_PRODUCTS.with(|p| p.borrow_mut().insert(request.id, data));
    return true;
}


pub async fn check_single_product_by_barcode(barcode:String) -> bool {
    let data = PRODUCTS.with(|products| {
        let binding = products.borrow();
        let filter = binding.iter()
        .find(|& x| x.1.identity == ic_cdk::caller().to_string() && x.1.barcode==barcode);
        if filter.is_some(){
            return false;
        }
        else{
            return true;
        }
    });

    return data;
}
