
use crate::{context::CATEGORIES, entities::integration::Letgo::{categories::Categories, get_categories_http_response::GetCategoriesHttpResponse, login_model::LoginModel, token_model::TokenModel}
};
use ic_cdk::api::management_canister::http_request::{
    http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod,
};

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