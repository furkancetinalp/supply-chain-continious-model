use candid::{CandidType, Deserialize};

#[derive(CandidType, Deserialize, Clone)]
pub enum Unit{
    Kg,
    Tonne,
    Piece,

}