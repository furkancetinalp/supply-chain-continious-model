import React, { useState, useEffect } from 'react';
import { format, setDate } from 'date-fns';
import { Link } from 'react-router-dom';
import { getOrderStatus } from '../lib/helpers';
import { supply_chain_continious_model_backend } from '../../../declarations/supply_chain_continious_model_backend';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
const data = [
  {
    name: 'Jan',
    Expense: 0,
    Income: 0,
  },
  {
    name: 'Feb',
    Expense: 0,
    Income: 0,
  },
  {
    name: 'Mar',
    Expense: 0,
    Income: 0,
  },
  {
    name: 'Apr',
    Expense: 0,
    Income: 0,
  },
  {
    name: 'May',
    Expense: 0,
    Income: 0,
  },
  {
    name: 'Jun',
    Expense: 0,
    Income: 0,
  },
  {
    name: 'July',
    Expense: 0,
    Income: 0,
  },
  {
    name: 'Aug',
    Expense: 0,
    Income: 0,
  },
  {
    name: 'Sep',
    Expense: 0,
    Income: 0,
  },
  {
    name: 'Oct',
    Expense: 0,
    Income: 0,
  },
  {
    name: 'Nov',
    Expense: 0,
    Income: 0,
  },
  {
    name: 'Dec',
    Expense: 0,
    Income: 0,
  },
];
export default function TransactionChart() {
  const [orders, setOrders] = useState(null);
  useEffect(function () {
    async function get_all_orders() {
      let tempData = data;
      const orders =
        await supply_chain_continious_model_backend.get_all_orders();
      setOrders(orders);

      console.log(orders);
      console.log(new Date(orders.at(0).order_date).getMonth());

      //MONTHLY SALES
      let jan = orders
        ?.filter((x) => new Date(x.order_date).getMonth() == 0)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(0).Income = jan;

      let feb = orders
        ?.filter((x) => new Date(x.order_date).getMonth() == 1)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(1).Income = feb;

      let mar = orders
        ?.filter((x) => new Date(x.order_date).getMonth() == 2)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(2).Income = mar;

      let apr = orders
        ?.filter((x) => new Date(x.order_date).getMonth() == 3)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(3).Income = apr;

      let may = orders
        ?.filter((x) => new Date(x.order_date).getMonth() == 4)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(4).Income = may;

      let jun = orders
        ?.filter((x) => new Date(x.order_date).getMonth() == 5)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(5).Income = jun;

      let july = orders
        ?.filter((x) => new Date(x.order_date).getMonth() == 6)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(6).Income = july;

      let aug = orders
        ?.filter((x) => new Date(x.order_date).getMonth() == 7)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(7).Income = aug;

      let sep = orders
        ?.filter((x) => new Date(x.order_date).getMonth() == 8)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(8).Income = sep;

      let oct = orders
        ?.filter((x) => new Date(x.order_date).getMonth() == 9)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(9).Income = oct;

      let nov = orders
        ?.filter((x) => new Date(x.order_date).getMonth() == 10)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(10).Income = nov;

      let dec = orders
        ?.filter((x) => new Date(x.order_date).getMonth() == 11)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(11).Income = dec;
    }
    get_all_orders();
  }, []);
  return (
    <div className="flex h-[22rem] flex-1 flex-col rounded-sm border border-gray-200 bg-white p-4">
      <strong className="font-medium text-gray-700">Transactions</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill="#0ea5e9" />
            <Bar dataKey="Expense" fill="#ea580c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
