pub(crate) mod add_yearly_demand_request;
pub (crate) mod add_monthly_demand_request;
pub (crate) mod update_yearly_demand_request;
use update_yearly_demand_request::UpdateYearlyDemandRequest;

use self::add_monthly_demand_request::AddMonthlyDemandRequest;
use self::add_yearly_demand_request::AddYearlyDemandRequest;

use super::idgenerator;
use crate::context::DEMAND_PLAN_MAP;
use crate::entities::period::Period;
use crate::entities::time::Time;
use crate::entities::demand_planning::Demand;
use crate::entities::unit::Unit;


//ADD DEMAND MONTHLY
#[ic_cdk::update]
 pub async fn add_monthly_demand_plan(request: AddMonthlyDemandRequest) -> Option<bool> {
    let created_date = ic_cdk::api::time().to_string();
    let unique_id:u32 = idgenerator::create_id().await;

    let user_id = ic_cdk::caller();
    let data = Demand{
        id:unique_id,
        identity:user_id.to_string(),
        name:request.name,
        description:request.description,
        customer_group:request.customer_group,
        amount:request.amount,
        unit:request.unit,
        created_date,
        from:Time { 
            year: request.year, 
            month:request.from_month, 
            day:1,
            formatted: format!("01/{}/{}",request.from_month,request.year) 
        },
        to:Time { 
            year: if request.from_month==12 { request.year+1} else {request.year},
            month: if request.from_month==12 { 1 } else {request.from_month + 1}, 
            day:1,
            formatted: format!("01/{}/{}",if request.from_month==12 { 1 } else {request.from_month + 1}, if request.from_month==12 { request.year+1} else {request.year}) 
        },
        period:Period::Month,
    };
    DEMAND_PLAN_MAP.with(|p| p.borrow_mut().insert(unique_id, data));
    return Some(true);
}

//ADD DEMAND YEARLY 
#[ic_cdk::update]
 pub async fn add_yearly_demand_plan(request: AddYearlyDemandRequest) -> bool {
    let created_date = ic_cdk::api::time().to_string();
    let unique_id:u32 = idgenerator::create_id().await;

    let user_id = ic_cdk::caller();
    let data = Demand{
        id:unique_id,
        identity:user_id.to_string(),
        name:request.name,
        description:request.description,
        customer_group:request.customer_group,
        amount:request.amount,
        unit:Unit::Piece,
        created_date,
        from:Time { 
            year: request.from_year, 
            month:1, 
            day:1,
            formatted: format!("01/{}/{}",1,request.from_year) 
        },
        to:Time { 
            year: request.from_year +1,
            month:1, 
            day:1,
            formatted: format!("01/1/{}",request.from_year+1) 
        },
        period:Period::Year,
    };
    DEMAND_PLAN_MAP.with(|p| p.borrow_mut().insert(unique_id, data));
    
    return check_if_data_exists(unique_id).await;
 
}


//GET ALL
#[ic_cdk::query]
pub async fn get_all_demand_plans() -> Vec< Demand> {
    let data: Vec<Demand> = DEMAND_PLAN_MAP.with(|demands| {
        let binding = demands.borrow();
        let filter = binding.iter().filter(|& x| x.1.identity == ic_cdk::caller().to_string()).collect::<Vec<_>>();
        let result = filter.iter().map(|x| x.1.clone()).collect::<Vec<_>>();
        return result;
    });

    return data;
}


#[ic_cdk::query]
 pub async fn get_demand_plan_by_id(id:u32) -> Demand {
     let data = DEMAND_PLAN_MAP.with(|demand|{
        let  demands = demand.borrow_mut();
        let item = demands.get(&id).unwrap();
        return item.clone();
    });

    return data;
}
#[ic_cdk::update]
 pub async fn delete_demand_plan_by_id(id:u32) -> bool {
     let data = DEMAND_PLAN_MAP.with(|demand|{
        let mut demands = demand.borrow_mut();
        let item = demands.remove(&id);
        return item;
    });
    if( data.is_some()){
        return true;
    }
    else{
        return false;
    }

}

//UPDATE DEMAND YEARLY 
#[ic_cdk::update]
 pub async fn update_yearly_demand_plan(request: UpdateYearlyDemandRequest) -> bool {
    let created_date = ic_cdk::api::time().to_string();
    // let unique_id:u32 = idgenerator::create_id().await;
    let data = get_demand_plan_by_id(request.id).await;

    let mut data = Demand{
        id:request.id,
        identity:data.identity,
        name:request.name,
        description:request.description,
        customer_group:request.customer_group,
        amount:request.amount,
        unit:Unit::Piece,
        created_date,
        from:data.from,
        to:data.to,
        period:Period::Year,
    };
    data.from.year=request.from_year;
    data.to.year=request.from_year+1;
    DEMAND_PLAN_MAP.with(|p| p.borrow_mut().insert(request.id, data));
    return true;
}

pub async fn check_if_data_exists(id:u32) -> bool {
    let data = DEMAND_PLAN_MAP.with(|demand|{
       let  demands = demand.borrow_mut();
       let item = demands.get(&id);
       if item.is_none(){
        return false;
       }
       else{
        return true;
       }
   });

   return data;
}