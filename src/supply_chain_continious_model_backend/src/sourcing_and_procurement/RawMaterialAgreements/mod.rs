pub(crate) mod add_raw_material_agreement_request;
use crate::{context::RAW_MATERIAL_AGREEMENTS, entities::sourcing_and_procurement::raw_material_agreements::RawMaterialAggreement};

use add_raw_material_agreement_request::AddRawMaterialAgreementRequest;

use super::idgenerator;

#[ic_cdk::update]
 pub async fn add_raw_material_agreement(request: AddRawMaterialAgreementRequest) -> Option<bool> {
    let created_date = ic_cdk::api::time().to_string();
    let unique_id:u32 = idgenerator::create_id().await;
    let user_id = ic_cdk::caller();

    let data = RawMaterialAggreement{ 
        id: unique_id, 
        identity:user_id.to_string(),
        product_name:request.product_name,
        amount:request.amount,
        warehouse_name: request.warehouse_name, 
        unit:request.unit , 
        created_date ,
        unit_price:request.unit_price,
        agreement_date:request.agreement_date,
        total_price:request.total_price,
        company_name:request.company_name,
        delivery_date:request.delivery_date,
        delivery_time:request.delivery_time,
    };
    RAW_MATERIAL_AGREEMENTS.with(|p| p.borrow_mut().insert(unique_id, data));
    return Some(true);
}


//GET ALL
#[ic_cdk::query]
pub async fn get_all_raw_material_agreements() -> Vec< RawMaterialAggreement> {
    let data: Vec<RawMaterialAggreement> = RAW_MATERIAL_AGREEMENTS.with(|raw_materials| {
        let binding = raw_materials.borrow();
        let filter = binding.iter().filter(|& x| x.1.identity == ic_cdk::caller().to_string()).collect::<Vec<_>>();
        let result = filter.iter().map(|x| x.1.clone()).collect::<Vec<_>>();
        return result;
    });

    return data;
}