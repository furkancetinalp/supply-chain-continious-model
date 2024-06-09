
use candid::{CandidType, Deserialize};
use crate::entities::{time::Time, unit::Unit};

#[derive(CandidType, Deserialize, Clone)]
pub(crate) struct AddRawMaterialOfferRequest{
    pub name:String, //product name
    pub amount: f64,
    pub unit_price : f64,
    pub total_price : f64,
    pub company_name:String, //company that makes the offer ***
    pub delivery_time:u8, // date to be delivered
    pub warehouse_name:String, 
    pub unit: Unit,
    pub delivery_date:Time,

}


