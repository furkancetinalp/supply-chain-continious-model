use candid::{CandidType, Deserialize};

#[derive(CandidType, Deserialize, Clone)]
#[derive(PartialEq)]
pub enum ProductStatus{
    PendingApproval,
    Approved,
    Rejected,
    Ordered,
    Sold,

}