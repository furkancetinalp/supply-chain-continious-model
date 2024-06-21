pub(crate) mod add_raw_material_offer_request;
use add_raw_material_offer_request::AddRawMaterialOfferRequest;
use update_raw_material_offer_request::UpdateRawMaterialOfferRequest;
pub mod update_raw_material_offer_request;
use crate::{context::RAW_MATERIAL_OFFERS,entities::{sourcing_and_procurement::raw_material_offers::RawMaterialOffer, unit::Unit}};
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
        unit:Unit::Piece,
        created_date,
        requested_date:request.requested_date,
        delivery_date:request.delivery_date,
        unit_price:request.unit_price,
        total_price:request.unit_price * request.amount,
        company_name:request.company_name,
        warehouse_name:request.warehouse_name,
        // delivery_time:request.delivery_time,
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




//

#[ic_cdk::query]
 pub async fn get_raw_material_offer_by_id(id:u32) -> RawMaterialOffer {
     let data: RawMaterialOffer = RAW_MATERIAL_OFFERS.with(|item|{
        let  items = item.borrow_mut();
        let item = items.get(&id).unwrap();
        return item.clone();
    });

    return data;
}
#[ic_cdk::update]
 pub async fn delete_raw_material_offer_by_id(id:u32) -> bool {
     let data = RAW_MATERIAL_OFFERS.with(|item|{
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

#[ic_cdk::update]
 pub async fn update_raw_material_offer(request: UpdateRawMaterialOfferRequest) -> bool {
    // let unique_id:u32 = idgenerator::create_id().await;
    let data = get_raw_material_offer_by_id(request.id).await;

    let  item = RawMaterialOffer{
        id:request.id,
        identity:data.identity,
        name:request.name,
        amount:request.amount,
        unit:Unit::Piece,
        created_date:data.created_date,
        warehouse_name:request.warehouse_name,
        unit_price:request.unit_price,
        total_price:request.unit_price * request.amount,
        company_name:request.company_name,
        requested_date:request.requested_date,
        delivery_date:request.delivery_date,

    };
    RAW_MATERIAL_OFFERS.with(|p| p.borrow_mut().insert(request.id, item));
    return true;
}

pub async fn check_if_data_exists(id:u32) -> bool {
    let data = RAW_MATERIAL_OFFERS.with(|item|{
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