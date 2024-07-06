use candid::{CandidType, Deserialize};
use crate::entities::unit::Unit;

#[derive(CandidType, Deserialize, Clone)]
pub struct Categories {
    pub id: String,
    pub key: String,
    pub name: String,
}