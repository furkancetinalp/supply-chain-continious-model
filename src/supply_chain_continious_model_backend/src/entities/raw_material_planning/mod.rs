
use candid::{CandidType, Deserialize};
use crate::entities::{time::Time, unit::Unit, urgency::Urgency};

#[derive(CandidType, Deserialize, Clone)]
pub(crate) struct RawMaterial{
    pub id:u32,
    pub identity:String,
    pub name:String,
    pub amount: f64,
    pub requested_delivery_time:u8, //required date to be delivered
    pub urgency:String,
    pub warehouse_name:String, 
    // pub description:String,
    pub unit: Unit,
    pub date:String,
    pub created_date:String,

}


