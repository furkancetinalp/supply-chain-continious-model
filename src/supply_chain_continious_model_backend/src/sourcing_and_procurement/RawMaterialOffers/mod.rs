pub(crate) mod add_raw_material_offer_request;
use add_raw_material_offer_request::AddRawMaterialOfferRequest;

use crate::{context::RAW_MATERIAL_OFFERS,entities::sourcing_and_procurement::raw_material_offers::RawMaterialOffer};
use super::idgenerator;

#[ic_cdk::update]
 pub async fn add_raw_material_offer(request: AddRawMaterialOfferRequest) -> Option<bool> {
    let created_date = ic_cdk::api::time().to_string();
    let unique_id:u32 = idgenerator::create_id().await;
    let user_id = ic_cdk::caller();

    let data = RawMaterialOffer{
        id:unique_id,
        identity:user_id.to_string(),
        name:request.name,
        amount:request.amount,
        unit:request.unit,
        created_date,
        delivery_date:request.delivery_date,
        unit_price:request.unit_price,
        total_price:request.total_price,
        delivery_time:request.delivery_time,
        company_name:request.company_name,
        warehouse_name:request.warehouse_name,
    };
    RAW_MATERIAL_OFFERS.with(|p| p.borrow_mut().insert(unique_id, data));
    return Some(true);
}

//GET ALL
#[ic_cdk::query]
pub async fn get_all_raw_material_offers() -> Vec< RawMaterialOffer> {
    let data: Vec<RawMaterialOffer> = RAW_MATERIAL_OFFERS.with(|demands| {
        let binding = demands.borrow();
        let filter = binding.iter().filter(|& x| x.1.identity == ic_cdk::caller().to_string()).collect::<Vec<_>>();
        let result = filter.iter().map(|x| x.1.clone()).collect::<Vec<_>>();
        return result;
    });

    return data;
}