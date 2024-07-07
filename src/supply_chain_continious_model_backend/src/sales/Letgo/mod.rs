
use crate::{context::{CATEGORIES, MAIN_PRODUCTS}, entities::{integration::Letgo::{categories::Categories, get_categories_http_response::GetCategoriesHttpResponse, import_product_response::ImportProductResponse, login_model::LoginModel, token_model::TokenModel}, manufacturing::main_product::MainProduct, unit::Unit}, idgenerator, manufacturing::Product::{create_main_product, get_main_product_by_name}
};
use ic_cdk::api::management_canister::http_request::{
    http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod,
};
use std::str;
use std::fs;

#[ic_cdk::update]
async fn login_letgo(email: String, password: String) -> Result<TokenModel, String> {
    let url = "https://www.letgo.com/api/auth/authenticate/login".to_string();

    let json_string = serde_json::json!({"grantType":"email","email": email,
    "password": password})
    .to_string();
    let json_utf8: Vec<u8> = json_string.into_bytes();
    let request_body: Option<Vec<u8>> = Some(json_utf8);
    // let request_headers = vec![];

    let request_headers = vec![HttpHeader {
        name: "Content-Type".to_string(),
        value: "application/json".to_string(),
    }];

    let request = CanisterHttpRequestArgument {
        url,
        method: HttpMethod::POST,
        body: request_body,
        max_response_bytes: None,
        transform: None,
        headers: request_headers,
    };
    //Ok => deserializing response
    //else => returning a string message
    match http_request(request,1_603_123_200).await {
        Ok((response,)) => {
            if response.status == 200 as u32 {
                let login_model: LoginModel =
                    serde_json::from_slice(&response.body).expect("Failed to parse JSON response.");

                let token_result = TokenModel {
                    id:login_model.user.id,
                    token: login_model.access_token,
                };
                return Ok(token_result);
            } else {
                Err(format!(
                    "HTTP request failed with status code: {}",
                    response.status
                ))
            }
        }
        Err((code, message)) => Err(format!(
            "The http_request resulted in an error. Code: {:?}, Message: {}",
            code, message
        )),
    }
}



#[ic_cdk::update]
async fn import_categories() -> bool {
    let result = get_categories_from_marketplace().await;
    match result {
        Ok(item) => {
            for data in item {
                let key: u32 = data.id.parse().unwrap();
                let if_category_exists = check_if_data_exists(key).await;
                
                if( if_category_exists){
                    continue;
                }
                else{
                    CATEGORIES.with(|p| p.borrow_mut().insert(key as u32, data));

                }
                
            }
            return true;
        }
        Err(eror) => {
            return false;
        }
    }
}

#[ic_cdk::query]
pub async fn get_all_categories() -> Vec< Categories> {
    let data: Vec<Categories> = CATEGORIES.with(|item| {
        let binding = item.borrow();
        let filter = binding.iter().collect::<Vec<_>>();
        let result = filter.iter().map(|x| x.1.clone()).collect::<Vec<_>>();
        return result;
    });

    return data;
}



pub async fn check_if_data_exists(id:u32) -> bool {
    let data = CATEGORIES.with(|item|{
       let  items = item.borrow_mut();
       let item = items.get(&id);
       if item.is_none(){
        return false;
       }
       else{
        return true;
       }
   });

   return data;
}

async fn get_categories_from_marketplace() -> Result<Vec<Categories>, String> {
    let url = "https://www.letgo.com/api/categories".to_string();

    let request_headers = vec![HttpHeader {
        name: "Content-Type".to_string(),
        value: "application/json".to_string(),
    }];

    let request = CanisterHttpRequestArgument {
        url,
        method: HttpMethod::GET,
        body: None,
        max_response_bytes: None,
        transform: None,
        headers: request_headers,
    };

    //if Ok => deserializing response
    //else => returning a string message
    match http_request(request,1_603_123_200).await {
        Ok((response,)) => {
            if response.status == 200 as u32 {
                let result_data: GetCategoriesHttpResponse =
                    serde_json::from_slice(&response.body).expect("Failed to parse JSON response.");

                let mut category_model = vec![];
                for item in &result_data.data {
                    for sub_category in &item.sub_categories {
                        let category = Categories {
                            id: sub_category.id.clone(),
                            key: sub_category.key.clone(),
                            name: sub_category.name.clone(),
                        };

                        category_model.push(category);
                    }
                }

                return Ok(category_model);
            } else {
                Err(format!(
                    "HTTP request failed with status code: {}",
                    response.status
                ))
            }
        }
        Err((code, message)) => Err(format!(
            "The http_request resulted in an error. Code: {:?}, Message: {}",
            code, message
        )),
    }
}


pub async fn get_category_by_id(id:u32) -> Categories {
    let data = CATEGORIES.with(|item|{
       let  items = item.borrow_mut();
       let item = items.get(&id).unwrap();
       return item.clone();
   });

   return data;
}


#[ic_cdk::update]
async fn import_products(user_id: String, token: String) -> String {
    let check_categories = get_all_categories().await;
    if check_categories.len() == 0 {
        import_categories().await;
    }
    let url = format!("https://www.letgo.com/api/v2/users/{user_id}/items");

    let request_headers = vec![
        HttpHeader {
            name: "Content-Type".to_string(),
            value: "application/json".to_string(),
        },
        HttpHeader {
            name: "Authorization".to_string(),
            value: "Bearer ".to_string() + &token,
        },
    ];

    let request = CanisterHttpRequestArgument {
        url,
        method: HttpMethod::GET,
        body: None,
        max_response_bytes: None,
        transform: None,
        headers: request_headers,
    };

    //if Ok => deserializing response
    //else => returning a string message
    match http_request(request,1_903_123_200).await {
        Ok((response,)) => {
            if response.status == 200 as u32 {
                let response_model: ImportProductResponse =
                    serde_json::from_slice(&response.body).expect("Failed to parse JSON response.");
                
                for data in response_model.data {
                    let item = data.clone();

                    //IMAGE ASSIGN PROCESS
                    let mut image_list:Vec<String> = Vec::new();
                    for x in item.images.clone(){
                        image_list.insert(image_list.len(),x.url);
                    }

                    let check_if_item_exists = get_main_product_by_name(item.title.clone()).await;
                    if check_if_item_exists.is_some(){

                        let current_item = check_if_item_exists.unwrap();

                        let product = MainProduct {
                            id: current_item.id,
                            name: item.title,
                            description: item.description,
                            image_url_list: image_list,
                            price: item.price.value.raw,
                            created_date: current_item.created_date,
                            category: current_item.category,
                            total_amount:current_item.total_amount,
                            identity:current_item.identity,
                            status:item.status.display,
                            barcode:current_item.barcode,
                            unit:current_item.unit,
                            brand:current_item.brand,
                            image_list:current_item.image_list,
                            marketplace_item_id:item.id,
                        };
                        MAIN_PRODUCTS.with(|p| p.borrow_mut().insert(current_item.id, product));


                    }
                    else{
                        let unique_id:u32 = idgenerator::create_id().await;
                        let category_name = get_category_by_id(item.category_id.parse().unwrap()).await.key;
                        let product = MainProduct {
                            id: unique_id,
                            name: item.title,
                            description: item.description,
                            image_url_list: image_list,
                            price: item.price.value.raw,
                            created_date: item.created_at,
                            category: category_name,
                            total_amount:0,
                            identity:ic_cdk::caller().to_string(),
                            status:item.status.display,
                            barcode:item.id.clone(),
                            unit:Unit::Piece,
                            brand:"".to_string(),
                            image_list:Vec::new(),
                            marketplace_item_id:item.id,
                        };
                        MAIN_PRODUCTS.with(|p| p.borrow_mut().insert(unique_id, product));
                    }
                }
                // return Ok("Product import is successful".to_string());
                return "true".to_string();
            } else {
                // Err(format!(
                //     "HTTP request failed with status code: {}",
                //     response.status
                // ))
                format!(
                    "The http_request resulted in an error. Code: {:?}, Message: {:?}",
                    response.status, str::from_utf8(&response.body)
                ).to_string()
                // return "false".to_string();
            }
        }
        Err((code, message)) => {
            // return false;
            format!(
                    "The http_request resulted in an error. Code: {:?}, Message: {}",
                    code, message
                ).to_string()
            // Err(format!(
            //     "The http_request resulted in an error. Code: {:?}, Message: {}",
            //     code, message
            // ))
        },
    }
}