
use candid::{CandidType, Deserialize};
use crate::entities::{product_status::ProductStatus, time::Time, unit::Unit};

#[derive(CandidType, Deserialize, Clone)]
pub(crate) struct CreateProductRequest{
    pub name:String, //product name
    pub price : u64,
    pub unit: Unit,
}


