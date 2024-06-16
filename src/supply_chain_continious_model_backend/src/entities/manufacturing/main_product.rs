
use candid::{CandidType, Deserialize};

use crate::entities::unit::Unit;


#[derive(CandidType, Deserialize, Clone)]
pub(crate) struct MainProduct{
    pub id:u32,
    pub identity:String,
    pub name:String, //product name
    pub barcode :String,
    pub total_amount:u64,
    pub unit: Unit,
    pub price : u64,
    pub quantity_per_product:u32,
    pub created_date:String,
}



