
use crate::{entities::integration::Letgo::login_model::LoginModel, entities::integration::Letgo::token_model::TokenModel};
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
