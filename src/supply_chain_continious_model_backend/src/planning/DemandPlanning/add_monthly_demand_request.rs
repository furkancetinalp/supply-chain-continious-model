use candid::{CandidType, Deserialize};
use crate::entities::unit::Unit;



#[derive(CandidType, Deserialize, Clone)]
pub struct AddMonthlyDemandRequest{
    pub name:String,//product name
    pub description:String, //product description
    pub amount: f64,
    pub unit: Unit,
    pub customer_group:String, //corporate,foundation,government,hospitality,education,individual
    pub from_month:u8,
    pub year:u16,

}
