use candid::{CandidType, Deserialize};

#[derive(CandidType, Deserialize, Clone)]

pub enum Urgency{
    Lowest,
    Low,
    Medium,
    High,
    Critical,
}