use candid::{CandidType, Deserialize};
use crate::entities::unit::Unit;

#[derive(CandidType, Deserialize, Clone)]
pub struct AddYearlyDemandRequest{
    pub name:String,//product name
    pub description:String, //product description
    pub customer_group:String, //corporate,foundation,government,hospitality,education,individual
    pub amount: f64,
    pub unit: Unit,
    pub from_year:u16,

}