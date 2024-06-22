
use candid::{CandidType, Deserialize};
use crate::entities::{unit::Unit};

#[derive(CandidType, Deserialize, Clone)]
pub struct CreateMainProductRequest{
    pub name:String, //product name
    pub barcode :String,
    // pub unit: Unit,
    pub price : f64,
    pub category:String,
    pub brand:String,
    pub image_list :Vec<String>,
        
    
}



