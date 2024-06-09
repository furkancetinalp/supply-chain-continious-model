
use candid::{CandidType, Deserialize};
use crate::entities::{time::Time, unit::Unit};

#[derive(CandidType, Deserialize, Clone)]
pub(crate) struct CreateProductRequest{
    pub name:String, //product name
    pub quantity:f32,
    pub price : f64,
    pub unit: Unit,
}


