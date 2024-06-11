use candid::{CandidType, Deserialize};

#[derive(CandidType, Deserialize, Clone)]
pub enum ProductStatus{
    PendingApproval,
    Approved,
    Rejected,

}