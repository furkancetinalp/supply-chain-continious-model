pub(crate) mod add_raw_material_plan_request;
use crate::{context::RAW_MATERIAL_PLANS, entities::raw_material_planning::RawMaterial};

use add_raw_material_plan_request::AddRawMaterialPlanningRequest;

use super::idgenerator;

#[ic_cdk::update]
 pub async fn add_raw_material_plan(request: AddRawMaterialPlanningRequest) -> Option<bool> {
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
        description:request.description , 
        unit:request.unit , 
        created_date ,
        from:request.from, 
        to: request.to, 
    };
    RAW_MATERIAL_PLANS.with(|p| p.borrow_mut().insert(unique_id, data));
    return Some(true);
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