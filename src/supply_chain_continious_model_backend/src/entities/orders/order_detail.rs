
use candid::{CandidType, Deserialize};

use crate::entities::order_status::OrderStatus;

#[derive(CandidType, Deserialize, Clone)]
pub struct OrderDetail{
    pub id:u32,
    pub identity:String,
    pub order_id :u32,
    pub product_id:u32,
    pub product_name:String,
    pub quantity:f32,
    pub price:f32,
    pub created_date:String,
}

