use candid::CandidType;
use serde::{Deserialize, Serialize};

#[derive(CandidType, Deserialize, Clone)]
#[derive(Default, Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct TokenModel {
    pub token: String,
    pub id: String
}
