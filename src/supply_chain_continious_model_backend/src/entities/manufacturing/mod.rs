
use candid::{CandidType, Deserialize};

use super::{product_status::ProductStatus, unit::Unit};

#[derive(CandidType, Deserialize, Clone)]
pub(crate) struct Product{
    pub id:u32,
    pub identity:String,
    pub name:String, //product name
    pub price : u64,
    pub unit: Unit,
    pub status: ProductStatus,
    pub created_date:String,
}



