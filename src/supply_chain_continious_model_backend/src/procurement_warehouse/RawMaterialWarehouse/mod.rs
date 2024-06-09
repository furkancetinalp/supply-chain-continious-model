pub(crate) mod add_raw_material_warehouse_request;
use crate::{context::RAW_MATERIAL_WAREHOUSES, entities::procurement_warehouse::raw_material_warehouse::RawMaterialWarehouse};
use add_raw_material_warehouse_request::AddRawMaterialWarehouseRequest;
use crate::idgenerator;

#[ic_cdk::update]
 pub async fn add_raw_material_warehouse(request: AddRawMaterialWarehouseRequest) -> Option<bool> {
    let created_date = ic_cdk::api::time().to_string();
    let unique_id:u32 = idgenerator::create_id().await;
    let user_id = ic_cdk::caller();

    let data = RawMaterialWarehouse{ 
        id: unique_id, 
        identity:user_id.to_string(),
        name:request.name,
        district:request.district,
        province:request.province,
        country:request.country,
        location_detail:request.location_detail,
        created_date
  
    };
    RAW_MATERIAL_WAREHOUSES.with(|p| p.borrow_mut().insert(unique_id, data));
    return Some(true);
}


//GET ALL
#[ic_cdk::query]
pub async fn get_all_raw_material_warehouses() -> Vec< RawMaterialWarehouse> {
    let data: Vec<RawMaterialWarehouse> = RAW_MATERIAL_WAREHOUSES.with(|raw_material_warehouses| {
        let binding = raw_material_warehouses.borrow();
        let filter = binding.iter().filter(|& x| x.1.identity == ic_cdk::caller().to_string()).collect::<Vec<_>>();
        let result = filter.iter().map(|x| x.1.clone()).collect::<Vec<_>>();
        return result;
    });

    return data;
}