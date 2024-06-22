pub(crate) mod add_raw_material_warehouse_request;
use crate::{context::RAW_MATERIAL_WAREHOUSES, entities::procurement_warehouse::raw_material_warehouse::RawMaterialWarehouse};
use add_raw_material_warehouse_request::AddRawMaterialWarehouseRequest;
use update_raw_material_warehouse_request::UpdateRawMaterialWarehouseRequest;
use crate::idgenerator;
pub(crate) mod update_raw_material_warehouse_request;
#[ic_cdk::update]
 pub async fn add_raw_material_warehouse(request: AddRawMaterialWarehouseRequest) -> bool {
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
    return check_if_data_exists(unique_id).await;
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



//

#[ic_cdk::query]
 pub async fn get_raw_material_warehouse_by_id(id:u32) -> RawMaterialWarehouse {
     let data: RawMaterialWarehouse = RAW_MATERIAL_WAREHOUSES.with(|item|{
        let  items = item.borrow_mut();
        let item = items.get(&id).unwrap();
        return item.clone();
    });

    return data;
}
#[ic_cdk::update]
 pub async fn delete_raw_material_warehouse_by_id(id:u32) -> bool {
     let data = RAW_MATERIAL_WAREHOUSES.with(|item|{
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
 pub async fn update_raw_material_warehouse(request: UpdateRawMaterialWarehouseRequest) -> bool {
    // let unique_id:u32 = idgenerator::create_id().await;
    let data = get_raw_material_warehouse_by_id(request.id).await;

    let  item = RawMaterialWarehouse{
        id:request.id,
        identity:data.identity,
        name:request.name,
        district:request.district,
        created_date:data.created_date,
        location_detail:request.location_detail,
        province:request.province,
        country:request.country,
    };
    RAW_MATERIAL_WAREHOUSES.with(|p| p.borrow_mut().insert(request.id, item));
    return true;
}

pub async fn check_if_data_exists(id:u32) -> bool {
    let data = RAW_MATERIAL_WAREHOUSES.with(|item|{
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


#[ic_cdk::query]
pub async fn check_if_warehouse_name_exists(name:String) -> bool {
    let data = RAW_MATERIAL_WAREHOUSES.with(|items| {
        let binding = items.borrow();
        let filter = binding.iter()
        .find(|& x| x.1.identity == ic_cdk::caller().to_string() && x.1.name==name);
        if filter.is_some(){
            return true;
        }
        else{
            return false;
        }
    });

    return data;
}