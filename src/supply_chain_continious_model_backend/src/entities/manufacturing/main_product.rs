
use candid::{CandidType, Deserialize};

use crate::entities::unit::Unit;


#[derive(CandidType, Deserialize, Clone)]
pub(crate) struct MainProduct{
    pub id:u32,
    pub identity:String,
    pub name:String, //product name
    pub barcode :String,
    pub total_amount:u32,
    pub unit: Unit,
    pub price : f64,
    pub category:String,
    pub brand:String,
    pub created_date:String,
    pub image_list:Vec<String>,
    // pub image_list:Vec<ImageList>,
}




#[derive(CandidType, Deserialize, Clone)]
pub struct ImageList{
    pub url : Vec<u8>
}

