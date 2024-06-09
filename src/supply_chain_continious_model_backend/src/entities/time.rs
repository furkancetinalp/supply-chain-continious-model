use candid::{CandidType, Deserialize};

#[derive(CandidType, Deserialize, Clone)]
pub struct Time{
    pub year:u16,
    pub month:u8,
    pub day: u8,
    pub formatted:String,

}