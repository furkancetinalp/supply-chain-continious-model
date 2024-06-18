use std::cell::RefCell;
use std::collections::HashMap;

use crate::entities::demand_planning::Demand;
use crate::entities::manufacturing::main_product::MainProduct;
use crate::entities::manufacturing::product::{self, Product};
use crate::entities::orders::order::Order;
use crate::entities::orders::order_detail::OrderDetail;
use crate::entities::procurement_warehouse::raw_material_warehouse::RawMaterialWarehouse;
use crate::entities::raw_material_planning::RawMaterial;
use crate::entities::sourcing_and_procurement::raw_material_agreements::RawMaterialAggreement;
use crate::entities::sourcing_and_procurement::raw_material_offers::RawMaterialOffer;
thread_local! {
    //PLANNING
    pub static DEMAND_PLAN_MAP: RefCell<HashMap<u32, Demand>> = RefCell::default();
    pub static RAW_MATERIAL_PLANS: RefCell<HashMap<u32, RawMaterial>> = RefCell::default();


    //SOURCING AND PROCUREMENT 
    pub static RAW_MATERIAL_OFFERS: RefCell<HashMap<u32, RawMaterialOffer>> = RefCell::default();
    pub static RAW_MATERIAL_AGREEMENTS: RefCell<HashMap<u32, RawMaterialAggreement>> = RefCell::default();
    
    //PROCUREMENT WAREHOUSE
    pub static RAW_MATERIAL_WAREHOUSES: RefCell<HashMap<u32, RawMaterialWarehouse>> = RefCell::default();
    
    //MANUFACTURING
    pub static PRODUCTS: RefCell<HashMap<u32, Product>> = RefCell::default();
    pub static MAIN_PRODUCTS: RefCell<HashMap<u32, MainProduct>> = RefCell::default();
    
    //ORDER
    pub static ORDERS: RefCell<HashMap<u32, Order>> = RefCell::default();
    pub static ORDER_DETAILS: RefCell<HashMap<u32, OrderDetail>> = RefCell::default();
    

}
