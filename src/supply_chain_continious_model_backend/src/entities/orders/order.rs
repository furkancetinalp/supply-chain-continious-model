
use candid::{CandidType, Deserialize};

use crate::entities::order_status::OrderStatus;

#[derive(CandidType, Deserialize, Clone)]
pub struct Order{
    pub id:u32,
    pub identity:String,
    pub barcode :String,
    pub product_name:String,
    pub customer_title:String,
    pub address :String,
    pub quantity:f32,
    pub unit_price : f32,
    pub total_price:f32,
    pub order_date:String,
    pub order_status: OrderStatus,
    pub delivery_date:String,
    pub created_date:String,
}

