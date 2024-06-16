
use candid::{CandidType, Deserialize};
use crate::entities::{unit::Unit};

#[derive(CandidType, Deserialize, Clone)]
pub struct CreateProductRequest{
    // pub name:String, //product name
    // pub price : u64,
    pub barcode :String,
    // pub unit: Unit,
}


