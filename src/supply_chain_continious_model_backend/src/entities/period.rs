use candid::{CandidType, Deserialize};

#[derive(CandidType, Deserialize, Clone)]
pub enum Period{
    Week,
    Month,
    Year,
}

