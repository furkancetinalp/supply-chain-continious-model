
use candid::{CandidType, Deserialize};
use crate::entities::{time::Time, unit::Unit, urgency::Urgency};

#[derive(CandidType, Deserialize, Clone)]
pub(crate) struct AddRawMaterialPlanningRequest{
    pub name:String,
    pub amount: f64,
    pub requested_delivery_time:u8, //required date to be delivered
    pub urgency:String,
    pub warehouse_name:String,
    pub description:String,
    pub date:String,
}

