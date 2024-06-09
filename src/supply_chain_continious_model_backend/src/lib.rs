mod planning;
mod entities;
mod idgenerator;
mod context;
mod sourcing_and_procurement;
mod procurement_warehouse;
#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}
