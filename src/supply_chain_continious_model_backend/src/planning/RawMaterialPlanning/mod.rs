pub(crate) mod add_raw_material_plan_request;
pub mod update_raw_material_plan_request;
use crate::{context::RAW_MATERIAL_PLANS, entities::{raw_material_planning::RawMaterial, unit::Unit}};

use add_raw_material_plan_request::AddRawMaterialPlanningRequest;
use update_raw_material_plan_request::UpdateRawMaterialPlanRequest;

use super::idgenerator;

#[ic_cdk::update]
 pub async fn add_raw_material_plan(request: AddRawMaterialPlanningRequest) -> bool {
    let created_date = ic_cdk::api::time().to_string();
    let unique_id:u32 = idgenerator::create_id().await;
    let user_id = ic_cdk::caller();

    let data = RawMaterial{ 
        id: unique_id, 
        identity:user_id.to_string(),
        name:request.name,
        amount:request.amount,
        requested_delivery_time:request.requested_delivery_time , 
        urgency:request.urgency , 
        warehouse_name: request.warehouse_name, 
        // description:request.description , 
        unit:crate::entities::unit::Unit::Piece , 
        created_date ,
        date:request.date, 
    };
    RAW_MATERIAL_PLANS.with(|p| p.borrow_mut().insert(unique_id, data));
    return check_if_data_exists(unique_id).await;
}


//GET ALL
#[ic_cdk::query]
pub async fn get_all_raw_material_plans() -> Vec< RawMaterial> {
    let data: Vec<RawMaterial> = RAW_MATERIAL_PLANS.with(|raw_materials| {
        let binding = raw_materials.borrow();
        let filter = binding.iter().filter(|& x| x.1.identity == ic_cdk::caller().to_string()).collect::<Vec<_>>();
        let result = filter.iter().map(|x| x.1.clone()).collect::<Vec<_>>();
        return result;
    });

    return data;
}



//ADDED

#[ic_cdk::query]
 pub async fn get_raw_material_plan_by_id(id:u32) -> RawMaterial {
     let data = RAW_MATERIAL_PLANS.with(|item|{
        let  items = item.borrow_mut();
        let item = items.get(&id).unwrap();
        return item.clone();
    });

    return data;
}
#[ic_cdk::update]
 pub async fn delete_raw_material_plan_by_id(id:u32) -> bool {
     let data = RAW_MATERIAL_PLANS.with(|item|{
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
 pub async fn update_raw_material_plan(request: UpdateRawMaterialPlanRequest) -> bool {
    // let unique_id:u32 = idgenerator::create_id().await;
    let data = get_raw_material_plan_by_id(request.id).await;

    let  item = RawMaterial{
        id:request.id,
        identity:data.identity,
        name:request.name,
        // description:data.description,
        amount:request.amount,
        unit:Unit::Piece,
        created_date:data.created_date,
        date:request.date,
        requested_delivery_time:request.requested_delivery_time,
        urgency:request.urgency,
        warehouse_name:request.warehouse_name
    };
    RAW_MATERIAL_PLANS.with(|p| p.borrow_mut().insert(request.id, item));
    return true;
}

pub async fn check_if_data_exists(id:u32) -> bool {
    let data = RAW_MATERIAL_PLANS.with(|item|{
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