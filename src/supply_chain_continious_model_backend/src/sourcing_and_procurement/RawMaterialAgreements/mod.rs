pub(crate) mod add_raw_material_agreement_request;
use crate::{context::RAW_MATERIAL_AGREEMENTS, entities::{sourcing_and_procurement::raw_material_agreements::RawMaterialAgreement, unit::Unit}};
pub(crate) mod update_raw_material_agreement_request;
use add_raw_material_agreement_request::AddRawMaterialAgreementRequest;
use update_raw_material_agreement_request::UpdateRawMaterialAgreementRequest;

use super::idgenerator;

#[ic_cdk::update]
 pub async fn add_raw_material_agreement(request: AddRawMaterialAgreementRequest) -> bool {
    let created_date = ic_cdk::api::time().to_string();
    let unique_id:u32 = idgenerator::create_id().await;
    let user_id = ic_cdk::caller();

    let data = RawMaterialAgreement{ 
        id: unique_id, 
        identity:user_id.to_string(),
        product_name:request.product_name,
        amount:request.amount,
        warehouse_name: request.warehouse_name, 
        unit:Unit::Piece , 
        created_date ,
        unit_price:request.unit_price,
        agreement_date:request.agreement_date,
        total_price:request.unit_price * request.amount,
        company_name:request.company_name,
        delivery_date:request.delivery_date,
    };
    RAW_MATERIAL_AGREEMENTS.with(|p| p.borrow_mut().insert(unique_id, data));
    return check_if_data_exists(unique_id).await;
}


//GET ALL
#[ic_cdk::query]
pub async fn get_all_raw_material_agreements() -> Vec< RawMaterialAgreement> {
    let data: Vec<RawMaterialAgreement> = RAW_MATERIAL_AGREEMENTS.with(|raw_materials| {
        let binding = raw_materials.borrow();
        let filter = binding.iter().filter(|& x| x.1.identity == ic_cdk::caller().to_string()).collect::<Vec<_>>();
        let result = filter.iter().map(|x| x.1.clone()).collect::<Vec<_>>();
        return result;
    });

    return data;
}


//

#[ic_cdk::query]
 pub async fn get_raw_material_agreement_by_id(id:u32) -> RawMaterialAgreement {
     let data: RawMaterialAgreement = RAW_MATERIAL_AGREEMENTS.with(|item|{
        let  items = item.borrow_mut();
        let item = items.get(&id).unwrap();
        return item.clone();
    });

    return data;
}
#[ic_cdk::update]
 pub async fn delete_raw_material_agreement_by_id(id:u32) -> bool {
     let data = RAW_MATERIAL_AGREEMENTS.with(|item|{
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
 pub async fn update_raw_material_agreement(request: UpdateRawMaterialAgreementRequest) -> bool {
    // let unique_id:u32 = idgenerator::create_id().await;
    let data = get_raw_material_agreement_by_id(request.id).await;

    let  item = RawMaterialAgreement{
        id:request.id,
        identity:data.identity,
        amount:request.amount,
        unit:Unit::Piece,
        created_date:data.created_date,
        warehouse_name:request.warehouse_name,
        unit_price:request.unit_price,
        total_price:request.unit_price * request.amount,
        company_name:request.company_name,
        delivery_date:request.delivery_date,
        product_name:request.product_name,
        agreement_date:request.agreement_date,

    };
    RAW_MATERIAL_AGREEMENTS.with(|p| p.borrow_mut().insert(request.id, item));
    return true;
}

pub async fn check_if_data_exists(id:u32) -> bool {
    let data = RAW_MATERIAL_AGREEMENTS.with(|item|{
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