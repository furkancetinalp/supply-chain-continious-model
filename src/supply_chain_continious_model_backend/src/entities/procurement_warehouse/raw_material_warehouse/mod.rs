use candid::{CandidType, Deserialize};

#[derive(CandidType, Deserialize, Clone)]
pub(crate) struct RawMaterialWarehouse{
    pub id:u32,
    pub identity:String,
    pub name:String,
    pub district:String,
    pub province :String,
    pub country:String,
    pub location_detail:String,
    pub created_date:String,

}


