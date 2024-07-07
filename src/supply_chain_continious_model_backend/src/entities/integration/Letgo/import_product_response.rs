use candid::{CandidType, Decode, Deserialize, Encode};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{BoundedStorable, DefaultMemoryImpl, StableBTreeMap, Storable};
use serde::Serialize;

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ImportProductResponse {
    pub data: Vec<Daum>,
    // pub metadata: Metadata,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Daum {
    // pub lead_enabled_categories: bool,
    // pub monetization_info: Option<MonetizationInfo>,
    pub id: String,
    // pub revision: i64,
    #[serde(rename = "created_at")]
    pub created_at: String,
    // #[serde(rename = "created_at_first")]
    // pub created_at_first: String,
    // #[serde(rename = "republish_date")]
    // pub republish_date: Value,
    // #[serde(rename = "valid_to")]
    // pub valid_to: String,
    // #[serde(rename = "valid_from")]
    // pub valid_from: String,
    pub title: String,
    pub description: String,
    #[serde(rename = "category_id")]
    pub category_id: String,
    // pub favorites: Favorites,
    pub status: Status,
    // pub locations: Vec<Location>,
    pub images: Vec<Image>,
    #[serde(rename = "user_id")]
    pub user_id: String,
    pub price: Price,
    // pub parameters: Vec<Value>,
    // pub views: i64,
    // pub replies: i64,
    // pub calls: i64,
    // pub is_lead_available: bool,
    // #[serde(rename = "main_info")]
    // pub main_info: Value,
    // #[serde(rename = "location_source")]
    // pub location_source: String,
    // #[serde(rename = "extra_parameters")]
    // pub extra_parameters: Vec<Value>,
    // #[serde(rename = "inspection_info")]
    // pub inspection_info: Value,
    // #[serde(rename = "booking_info")]
    // pub booking_info: Value,
    // #[serde(rename = "is_inspection_centre_available")]
    // pub is_inspection_centre_available: bool,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MonetizationInfo {
    pub ad_id: i64,
    pub category_id: i64,
    pub limits: Value,
    pub last_boosted: Value,
    pub auto_boost_at_ad_applied: bool,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Favorites {
    pub count: i64,
    #[serde(rename = "count_label")]
    pub count_label: String,
    #[serde(rename = "count_label_next")]
    pub count_label_next: String,
    #[serde(rename = "count_label_prev")]
    pub count_label_prev: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Status {
    pub status: String,
    // pub link: Value,
    // pub message: Option<String>,
    // #[serde(rename = "allow_edit")]
    // pub allow_edit: bool,
    // #[serde(rename = "allow_deactivate")]
    // pub allow_deactivate: Option<bool>,
    pub display: String,
    // #[serde(rename = "translated_display")]
    // pub translated_display: String,
    // pub flags: Flags,
    // #[serde(rename = "ban_reason_id")]
    // pub ban_reason_id: Option<i64>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Flags {
    pub new: bool,
    pub hot: bool,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Location {
    pub lat: f64,
    pub lon: f64,
    #[serde(rename = "region_id")]
    pub region_id: String,
    #[serde(rename = "subregion_id")]
    pub subregion_id: String,
    #[serde(rename = "city_id")]
    pub city_id: String,
    #[serde(rename = "district_id")]
    pub district_id: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Image {
    pub id: String,
    #[serde(rename = "external_id")]
    pub external_id: String,
    pub width: i64,
    pub height: i64,
    pub url: String,
    pub full: Full,
    pub big: Big,
    pub medium: Medium,
    pub small: Small,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Full {
    pub width: i64,
    pub height: i64,
    pub url: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Big {
    pub width: i64,
    pub height: i64,
    pub url: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Medium {
    pub width: i64,
    pub height: i64,
    pub url: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Small {
    pub width: i64,
    pub height: i64,
    pub url: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Price {
    pub key: String,
    #[serde(rename = "key_name")]
    pub key_name: String,
    pub value: Value,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Value {
    pub raw: f64,
    pub display: String,
    pub currency: Currency,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Currency {
    pub pre: String,
    pub post: String,
    #[serde(rename = "iso_4217")]
    pub iso_4217: String,
    pub locale: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Metadata {
    pub update: Value,
    pub filters: Filters,
    pub links: Links,
    pub cursor: String,
    pub total: i64,
    pub show_download_leads: bool,
    #[serde(rename = "unfiltered_total")]
    pub unfiltered_total: i64,
    pub users: Users,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Filters {
    pub status: Vec<Status2>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Status2 {
    pub key: String,
    pub label: String,
    pub count: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Links {
    pub posting_guidelines: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Users {
    #[serde(rename = "162458791")]
    pub n162458791: n162458791,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct n162458791 {
    pub about: String,
    pub address: Vec<Value>,
    pub anonymous: bool,
    #[serde(rename = "avatar_id")]
    pub avatar_id: String,
    pub badges: Vec<Badge>,
    #[serde(rename = "business_categories")]
    pub business_categories: Vec<Value>,
    pub contacts: Contacts,
    #[serde(rename = "created_at")]
    pub created_at: String,
    #[serde(rename = "data_request")]
    pub data_request: Vec<Value>,
    pub email: String,
    #[serde(rename = "has_phone")]
    pub has_phone: bool,
    pub id: String,
    pub images: Vec<Image2>,
    #[serde(rename = "is_banned")]
    pub is_banned: bool,
    #[serde(rename = "is_business")]
    pub is_business: bool,
    #[serde(rename = "is_phone_visible")]
    pub is_phone_visible: bool,
    pub lang: String,
    #[serde(rename = "last_login_at")]
    pub last_login_at: String,
    pub locations: Vec<Location2>,
    pub name: String,
    #[serde(rename = "name_provided")]
    pub name_provided: bool,
    pub phone: String,
    #[serde(rename = "require_password")]
    pub require_password: bool,
    pub status: String,
    #[serde(rename = "verification_status")]
    pub verification_status: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Badge {
    pub name: String,
    pub status: bool,
    #[serde(rename = "type")]
    pub type_field: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Contacts {
    pub email: String,
    pub is_phone_visible: bool,
    pub is_valid_email: bool,
    pub phones: Vec<String>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Image2 {
    #[serde(rename = "external_id")]
    pub external_id: String,
    pub height: i64,
    pub id: String,
    pub url: String,
    pub width: i64,
    pub background: Background,
    pub medium: Medium2,
    pub big: Big2,
    pub small: Small2,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Background {
    pub height: i64,
    pub url: String,
    pub width: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Medium2 {
    pub height: i64,
    pub url: String,
    pub width: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Big2 {
    pub height: i64,
    pub url: String,
    pub width: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Small2 {
    pub height: i64,
    pub url: String,
    pub width: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Location2 {
    #[serde(rename = "city_id")]
    pub city_id: String,
    #[serde(rename = "district_id")]
    pub district_id: String,
    pub lat: f64,
    pub lon: f64,
    #[serde(rename = "region_id")]
    pub region_id: String,
    #[serde(rename = "subregion_id")]
    pub subregion_id: String,
}