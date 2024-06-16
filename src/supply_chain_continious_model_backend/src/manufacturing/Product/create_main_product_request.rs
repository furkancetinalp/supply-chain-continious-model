
use candid::{CandidType, Deserialize};
use crate::entities::{unit::Unit};

#[derive(CandidType, Deserialize, Clone)]
pub struct CreateMainProductRequest{
    pub name:String, //product name
    pub barcode :String,
    pub unit: Unit,
    pub price : u64,
    pub quantity_per_product:u32
        
    
}



