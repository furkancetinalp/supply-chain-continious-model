
use candid::{CandidType, Decode, Deserialize, Encode};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{BoundedStorable, DefaultMemoryImpl, StableBTreeMap, Storable};
use serde::Serialize;

//base struct
#[derive(CandidType, Deserialize, Clone)]
#[derive(Default, Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct LoginModel {
    pub status: String,
    pub user: User,
    pub refresh_token: String,
    pub access_token: String,
    pub notification_hub_id: String,
    pub chat_token: String,
}

#[derive(CandidType, Deserialize, Clone)]
#[derive(Default, Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct User {
    pub about: String,
    pub anonymous: bool,
    pub avatar_id: String,
    pub badges: Vec<Badge>,
    pub created_at: String,
    pub has_phone: bool,
    pub id: String,
    pub images: Vec<Image>,
    pub is_banned: bool,
    pub is_business: bool,
    pub is_phone_visible: bool,
    pub lang: String,
    pub locations: Vec<Location>,
    pub name: String,
    pub name_provided: bool,
    pub verification_status: String,
}

#[derive(CandidType, Deserialize, Clone)]
#[derive(Default, Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Badge {
    pub name: String,
    pub status: bool,
    #[serde(rename = "type")]
    pub type_field: String,
}

#[derive(CandidType, Deserialize, Clone)]
#[derive(Default, Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Image {
    pub external_id: String,
    pub height: i64,
    pub id: String,
    pub url: String,
    pub width: i64,
    pub medium: Medium,
    pub background: Background,
    pub small: Small,
    pub big: Big,
}

#[derive(CandidType, Deserialize, Clone)]
#[derive(Default, Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Medium {
    pub height: i64,
    pub url: String,
    pub width: i64,
}

#[derive(CandidType, Deserialize, Clone)]
#[derive(Default, Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Background {
    pub height: i64,
    pub url: String,
    pub width: i64,
}

#[derive(CandidType, Deserialize, Clone)]
#[derive(Default, Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Small {
    pub height: i64,
    pub url: String,
    pub width: i64,
}

#[derive(CandidType, Deserialize, Clone)]
#[derive(Default, Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Big {
    pub height: i64,
    pub url: String,
    pub width: i64,
}

#[derive(CandidType, Deserialize, Clone)]
#[derive(Default, Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Location {
    pub city_id: String,
    pub district_id: String,
    pub lat: i64,
    pub lon: i64,
    pub region_id: String,
    pub subregion_id: String,
}
