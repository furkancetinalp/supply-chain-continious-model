pub(crate) mod create_product_request;
use crate::{context::PRODUCTS, entities::{manufacturing::Product, product_status::ProductStatus}};
use create_product_request::CreateProductRequest;
use crate::idgenerator;

#[ic_cdk::update]
 pub async fn create_product(request: CreateProductRequest) -> Option<bool> {
    let created_date = ic_cdk::api::time().to_string();
    let unique_id:u32 = idgenerator::create_id().await;
    let user_id = ic_cdk::caller();

    let data = Product{ 
        id: unique_id, 
        identity:user_id.to_string(),
        name:request.name,
        created_date,
        price:request.price,
        unit:request.unit,
        status:ProductStatus::PendingApproval,
  
    };
    PRODUCTS.with(|p| p.borrow_mut().insert(unique_id, data));
    return Some(true);
}


#[ic_cdk::update]
 pub async fn create_bulk_product(request: CreateProductRequest,quantity:u32) -> Option<bool> {
    let mut index = 1;
    while index <=quantity {
        create_product(request.clone()).await;
        index +=1;
    };

    return Some(true);
}



//GET ALL
#[ic_cdk::query]
pub async fn get_all_created_products() -> Vec< Product> {
    let data: Vec<Product> = PRODUCTS.with(|raw_material_warehouses| {
        let binding = raw_material_warehouses.borrow();
        let filter = binding.iter().filter(|& x| x.1.identity == ic_cdk::caller().to_string()).collect::<Vec<_>>();
        let result = filter.iter().map(|x| x.1.clone()).collect::<Vec<_>>();
        return result;
    });

    return data;
}