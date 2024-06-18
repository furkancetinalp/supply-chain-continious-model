mod create_order_request;

use create_order_request::CreateOrderRequest;
use crate::context::ORDER_DETAILS;
use crate::entities::manufacturing::product::Product;
use crate::entities::order_status::{self,  OrderStatus};
use crate::entities::product_status::ProductStatus;
use crate::manufacturing::Product::{assign_products_for_order, get_main_product_by_barcode, update_product_status};
use crate::{context::ORDERS, entities::orders::order::Order,entities::orders::order_detail::OrderDetail, idgenerator};



#[ic_cdk::update]
 pub async fn create_order(request: CreateOrderRequest) -> Option<bool> {
    let products =assign_products_for_order(request.quantity as u32,request.barcode.clone()).await;

    if products.is_none(){
        return None;
    }
    else{
        // let first_product = products.clone().unwrap().clone().first().unwrap().clone();
        let first_product = products.as_ref().unwrap().first().cloned().unwrap();

        let created_date = ic_cdk::api::time().to_string();
        let unique_id:u32 = idgenerator::create_id().await;
        let user_id = ic_cdk::caller();
    

        let main_product = get_main_product_by_barcode(request.barcode.clone()).await;

        let data = Order{ 
            id: unique_id, 
            identity:user_id.to_string(),
            product_name:first_product.name.clone(),
            barcode:request.barcode.clone(),
            customer_title:request.customer_title,
            address:request.address,
            quantity:request.quantity,
            unit_price:first_product.quantity as f32,
            total_price:request.quantity* (main_product.price as f32),
            order_date:request.order_date,
            order_status:OrderStatus::Received,
            delivery_date:String::new(),
            created_date

      
        };
        ORDERS.with(|p| p.borrow_mut().insert(unique_id, data));
        let order_id= get_order_by_id(unique_id).await.id;
        for item in products.unwrap().iter(){
            create_order_detail(order_id.clone(), item.to_owned(), main_product.price).await;
        }
    }

    
    
    return Some(true);
}


pub async fn create_order_detail(order_id:u32,product:Product,price:u64){
    let created_date = ic_cdk::api::time().to_string();
    let unique_id:u32 = idgenerator::create_id().await;
    let user_id = ic_cdk::caller();

    let data = OrderDetail{ 
            id: unique_id, 
            identity:user_id.to_string(),
            order_id,
            product_id:product.id,
            product_name:product.name,
            quantity:product.quantity as f32,
            price:price as f32,
            created_date,
      
        };
    ORDER_DETAILS.with(|p| p.borrow_mut().insert(unique_id, data));
}

#[ic_cdk::query]
 pub async fn get_order_by_id(id:u32) -> Order {
     let data = ORDERS.with(|order|{
        let  orders = order.borrow_mut();
        let item = orders.get(&id).unwrap();
        return item.clone();
    });

    return data;
}

#[ic_cdk::query]
pub async fn get_all_orders() -> Vec< Order> {
    let data: Vec<Order> = ORDERS.with(|orders| {
        let binding = orders.borrow();
        let filter = binding.iter()
            .filter(|& x| x.1.identity == ic_cdk::caller().to_string())
                .collect::<Vec<_>>();
        let result = filter.iter().map(|x| x.1.clone()).collect::<Vec<_>>();
        return result;
    });

    return data;
}

#[ic_cdk::query]
 pub async fn get_order_details_by_order_id(order_id:u32) -> Vec<OrderDetail> {
    let data =ORDER_DETAILS.with(|order_detail|{
        let  order_detail = order_detail.borrow();
        let  filter = order_detail.iter()
            .filter(|x| x.1.order_id==order_id && x.1.identity == ic_cdk::caller().to_string())
                .collect::<Vec<_>>();
        let result = filter.iter().map(|x| x.1.clone()).collect::<Vec<_>>();

        return result;
    });
    return  data;
}

#[ic_cdk::update]
 pub async fn update_order(order_id:u32,order_status:OrderStatus) -> bool {
    let order_details = get_order_details_by_order_id(order_id).await;
    if (order_status == OrderStatus::Completed){
        for detail in order_details.iter(){
            update_product_status(detail.product_id, ProductStatus::Sold).await;
        }
        update_order_status(order_id, OrderStatus::Completed).await;
        return true;
        //PRODUCTSTATUS: SOLD
        //ORDERSTATUS:COMPLETED
    }
    else if (order_status == OrderStatus::Rejected || order_status == OrderStatus::Cancelled ){
        for detail in order_details.iter(){
            update_product_status(detail.product_id, ProductStatus::Approved).await;
        }
        if(order_status == OrderStatus::Rejected){
            update_order_status(order_id, OrderStatus::Rejected).await;
        }
        else{
            update_order_status(order_id, OrderStatus::Cancelled).await;
        }
        return true;
        //PRODUCTSTATUS: SET AGAIN TO APPROVED (AFTER MANUCACTURING STAGE)
        //ORDERSTATUS:REJECTED or CANCELLED
    }
    else{
        update_order_status(order_id, order_status).await;
        return true;
    }

}


async fn update_order_status(order_id:u32,status:OrderStatus) {
    ORDERS.with(|orders|{
       let mut orders = orders.borrow_mut();
       let   item = orders.get_mut(&order_id).unwrap();
       item.order_status = status;
   });
}



// assign_orders(count:u32) -> (bool,Vec<String>){

// }

// sipariş geldi 5 tane diyelim
// products tablosundan approved olarak 5 tane var mı diye araması gerekiyor.
// yoksa sipariş oluşmadı diye dön, false de dönülebilir
//  o 5 tane bulunursa Ordered olarak statüsünü değiştir
// Vec<OrderDetail> tablosuna her bir productın idsi ve ilgili siparişin id'si eklenecek şekilde 5 tane kayıt atılabilir