
use candid::{CandidType, Deserialize};
use crate::entities::{time::Time, unit::Unit};

#[derive(CandidType, Deserialize, Clone)]
pub(crate) struct RawMaterialAgreement{
    pub id:u32,
    pub identity:String,
    pub product_name:String, //product name
    pub amount: f64,
    pub unit_price : f64,
    pub total_price : f64,
    pub company_name:String, //company to make the agreement
    pub agreement_date:String,
    pub delivery_date:String, 
    pub warehouse_name:String, 
    pub unit: Unit,
    pub created_date:String,
}


