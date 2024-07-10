
use candid::{CandidType, Deserialize};
use crate::entities::{unit::Unit};

#[derive(CandidType, Deserialize, Clone)]
pub struct CreateOrderRequest{
    pub barcode :String,
    pub customer_title:String,
    pub address :String,
    pub quantity:f32,
    // pub unit_price : f32,
    // pub total_price:f32,
    pub order_date:String,
    pub customer_profile:String

        
    
}


