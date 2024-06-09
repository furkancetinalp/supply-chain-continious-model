pub(crate) mod add_yearly_demand_request;
pub (crate) mod add_monthly_demand_request;
use self::add_monthly_demand_request::AddMonthlyDemandRequest;
use self::add_yearly_demand_request::AddYearlyDemandRequest;

use super::idgenerator;
use crate::context::DEMAND_PLAN_MAP;
use crate::entities::period::Period;
use crate::entities::time::Time;
use crate::entities::demand_planning::Demand;


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
 pub async fn add_yearly_demand_plan(request: AddYearlyDemandRequest) -> Option<bool> {
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
    return Some(true);
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