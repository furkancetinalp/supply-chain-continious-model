use candid::{CandidType, Deserialize};

#[derive(CandidType, Deserialize, Clone)]
#[derive(PartialEq)]
pub enum OrderStatus{
    Received,
    Processing,
    Shipped,
    Delivered,
    Completed,
    Rejected,
    Cancelled,

}