pub(crate) mod create_product_request;
pub(crate) mod create_main_product_request;
use crate::{context::{MAIN_PRODUCTS, PRODUCTS}, entities::{manufacturing::{main_product::MainProduct, product::Product}, product_status::ProductStatus}};
use create_product_request::CreateProductRequest;
use create_main_product_request::CreateMainProductRequest;
use crate::idgenerator;



#[ic_cdk::update]
 pub async fn create_main_product(request: CreateMainProductRequest) -> Option<bool> {
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
        quantity_per_product:request.quantity_per_product,
        unit:request.unit,
  
    };
    MAIN_PRODUCTS.with(|p| p.borrow_mut().insert(unique_id, data));
    return Some(true);
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



#[ic_cdk::update]
 pub async fn create_product( request: CreateProductRequest) -> Option<bool> {
    let product_control = check_if_already_produced(&request.barcode).await;
    if(!product_control.0){
        return Some(false);
    }
    else{

        let barcode = request.barcode.clone();
        product_create_process(request,&product_control.1.as_ref().unwrap().name,product_control.1.as_ref().unwrap().quantity_per_product).await;
        update_product_stock(&barcode, product_control.1.unwrap().quantity_per_product.clone() as i64).await;
        return Some(true);
    }
}




#[ic_cdk::update]
 pub async fn create_bulk_product( request: CreateProductRequest,quantity:u32) -> Option<bool> {
    let product_control = check_if_already_produced(&request.barcode).await;
    if(!product_control.0){
        return Some(false);
    }
    else{

        let mut index = 1;
        while index <=quantity {
            product_create_process(request.clone(),&product_control.1.as_ref().unwrap().name,product_control.1.as_ref().unwrap().quantity_per_product).await;
            index +=1;
        };
        update_product_stock(&request.barcode, quantity as i64).await;
    }

    return Some(true);
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
 pub async fn approve_product(product_id:u32,status:ProductStatus) -> Option<bool> {
     PRODUCTS.with(|products|{
        let mut products = products.borrow_mut();
        let  item = products.get_mut(&product_id).unwrap();
        item.status = status;
    });
    return Some(true);


}

async fn product_create_process(request:CreateProductRequest,product_name:&str,quantity_per_product:u32) {
    let created_date = ic_cdk::api::time().to_string();
    let unique_id:u32 = idgenerator::create_id().await;
    let user_id = ic_cdk::caller();

    let data = Product{ 
        id: unique_id, 
        identity:user_id.to_string(),
        name:product_name.to_string(),
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
        let product =  (products.iter().find(|x| x.1.barcode==barcode));
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
        let  item = products.iter_mut().find(|x| x.1.barcode==barcode).unwrap().1;
        item.total_amount =item.total_amount + quantity  as u64;
    });
}