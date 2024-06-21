
use candid::{CandidType, Deserialize};
use crate::entities::{time::Time, unit::Unit};

#[derive(CandidType, Deserialize, Clone)]
pub struct UpdateRawMaterialOfferRequest{
    pub id:u32,
    pub name:String, //product name
    pub amount: f64,
    pub unit_price : f64,
    // pub total_price : f64,
    pub company_name:String, //company that makes the offer ***
    pub warehouse_name:String, 
    pub requested_date:String,
    pub delivery_date:String,
    // pub delivery_time:u8, // date to be delivered
    // pub unit: Unit,

}


