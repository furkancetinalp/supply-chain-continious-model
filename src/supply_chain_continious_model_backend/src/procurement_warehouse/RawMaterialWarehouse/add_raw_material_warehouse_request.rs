use candid::{CandidType, Deserialize};
use crate::entities::{time::Time, unit::Unit, urgency::Urgency};

#[derive(CandidType, Deserialize, Clone)]
pub(crate) struct AddRawMaterialWarehouseRequest{
    pub name:String,
    pub district:String,
    pub province :String,
    pub country:String,
    pub location_detail:String,

}

