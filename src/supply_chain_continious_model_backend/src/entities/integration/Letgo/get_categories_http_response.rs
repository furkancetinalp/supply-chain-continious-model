
use candid::{CandidType, Decode, Deserialize, Encode};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{BoundedStorable, DefaultMemoryImpl, StableBTreeMap, Storable};
use serde::Serialize;

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GetCategoriesHttpResponse {
    pub data: Vec<Daum>,
    // pub metadata: Metadata,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Daum {
    pub id: String,
    pub key: String,
    #[serde(rename = "display_order")]
    pub display_order: i64,
    pub name: String,
    #[serde(rename = "search_allowed")]
    pub search_allowed: bool,
    #[serde(rename = "adding_allowed")]
    pub adding_allowed: bool,
    #[serde(rename = "max_photos")]
    pub max_photos: MaxPhotos,
    #[serde(rename = "min_photos")]
    pub min_photos: MinPhotos,
    #[serde(rename = "default_layout")]
    pub default_layout: String,
    #[serde(rename = "card_info_template")]
    pub card_info_template: String,
    #[serde(rename = "default_location_level")]
    pub default_location_level: String,
    pub sorting: Sorting,
    #[serde(rename = "sub_categories")]
    pub sub_categories: Vec<SubCategory>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MaxPhotos {
    pub c2c: i64,
    pub b2c: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MinPhotos {
    pub c2c: i64,
    pub b2c: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Sorting {
    pub options: Vec<i64>,
    pub default: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SubCategory {
    pub id: String,
    pub key: String,
    #[serde(rename = "display_order")]
    pub display_order: i64,
    pub name: String,
    #[serde(rename = "search_allowed")]
    pub search_allowed: bool,
    #[serde(rename = "adding_allowed")]
    pub adding_allowed: bool,
    #[serde(rename = "max_photos")]
    pub max_photos: MaxPhotos2,
    #[serde(rename = "min_photos")]
    pub min_photos: MinPhotos2,
    #[serde(rename = "default_layout")]
    pub default_layout: String,
    #[serde(rename = "card_info_template")]
    pub card_info_template: String,
    #[serde(rename = "default_location_level")]
    pub default_location_level: String,
    pub sorting: Sorting2,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MaxPhotos2 {
    pub c2c: i64,
    pub b2c: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MinPhotos2 {
    pub c2c: i64,
    pub b2c: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Sorting2 {
    pub options: Vec<i64>,
    pub default: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Metadata {
    pub update: i64,
}