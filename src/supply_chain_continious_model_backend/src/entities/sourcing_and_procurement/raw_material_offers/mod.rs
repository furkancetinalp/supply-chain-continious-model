
use candid::{CandidType, Deserialize};
use crate::entities::{time::Time, unit::Unit};

#[derive(CandidType, Deserialize, Clone)]
pub(crate) struct RawMaterialOffer{
    pub id:u32,
    pub identity:String,
    pub name:String, //product name
    pub amount: f64,
    pub unit_price : f64,
    pub total_price : f64,
    pub company_name:String, //company that makes the offer ***
    pub warehouse_name:String, 
    pub unit: Unit,
    pub requested_date:String,
    pub delivery_date:String,
    pub created_date:String,
    // pub delivery_time:u8, // date to be delivered

}


