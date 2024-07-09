import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { getOrderStatus } from '../lib/helpers';
import { supply_chain_continious_model_backend } from '../../../declarations/supply_chain_continious_model_backend';

export default function RecentOrders() {
  const [orders, setOrders] = useState(null);
  useEffect(function () {
    async function get_all_orders() {
      const data = await supply_chain_continious_model_backend.get_all_orders();
      setOrders(data);
      console.log(data);
    }
    get_all_orders();
  }, []);
  return (
    <div className="flex-1 rounded-sm border border-gray-200 bg-white px-4 pb-4 pt-3">
      <strong className="font-medium text-gray-700">Recent Orders</strong>
      <div className="mt-3 rounded-sm border-x border-gray-200">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Customer Title</th>
              <th>Order Date</th>
              <th>Total Price</th>
              <th>Shipping Address</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orders?.slice(0, 5).map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.product_name}</td>
                <td>{order.customer_title}</td>
                <td>{format(new Date(order.order_date), 'dd MMM yyyy')}</td>
                <td>{order.total_price}</td>
                <td>{order.address}</td>
                <td>{Object.keys(order?.order_status)[0]}</td>
                {/* <td>{getOrderStatus(order.current_order_status)}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//npm install date-fns --save
