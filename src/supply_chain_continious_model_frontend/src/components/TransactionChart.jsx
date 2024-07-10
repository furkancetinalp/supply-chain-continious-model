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
  const [agreements, setAgreements] = useState(null);
  const [income, setIncome] = useState([]);
  useEffect(function () {
    async function get_all_orders() {
      const orders =
        await supply_chain_continious_model_backend.get_all_orders();
      setOrders(orders);

      const agreements =
        await supply_chain_continious_model_backend.get_all_raw_material_agreements();
      setAgreements(agreements);

      console.log(orders);
      console.log(new Date(orders.at(0).order_date).getMonth());

      let outcome_jan = agreements
        ?.filter((x) => new Date(x.agreement_date).getMonth() == 0)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(0).Expense = outcome_jan;

      let outcome_feb = agreements
        ?.filter((x) => new Date(x.agreement_date).getMonth() == 1)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(1).Expense = outcome_feb;

      let outcome_mar = agreements
        ?.filter((x) => new Date(x.agreement_date).getMonth() == 2)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(2).Expense = outcome_mar;

      let outcome_apr = agreements
        ?.filter((x) => new Date(x.agreement_date).getMonth() == 3)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(3).Expense = outcome_apr;

      let outcome_may = agreements
        ?.filter((x) => new Date(x.agreement_date).getMonth() == 4)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(4).Expense = outcome_may;

      let outcome_jun = agreements
        ?.filter((x) => new Date(x.agreement_date).getMonth() == 5)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(5).Expense = outcome_jun;

      let outcome_jul = agreements
        ?.filter((x) => new Date(x.agreement_date).getMonth() == 6)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(6).Expense = outcome_jul;

      let outcome_aug = agreements
        ?.filter((x) => new Date(x.agreement_date).getMonth() == 7)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(7).Expense = outcome_aug;

      let outcome_sep = agreements
        ?.filter((x) => new Date(x.agreement_date).getMonth() == 8)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(8).Expense = outcome_sep;

      let outcome_oct = agreements
        ?.filter((x) => new Date(x.agreement_date).getMonth() == 9)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(9).Expense = outcome_oct;

      let outcome_nov = agreements
        ?.filter((x) => new Date(x.agreement_date).getMonth() == 10)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(10).Expense = outcome_nov;

      let outcome_dec = agreements
        ?.filter((x) => new Date(x.agreement_date).getMonth() == 11)
        .reduce((accum, item) => accum + item.total_price, 0);
      data.at(11).Expense = outcome_dec;

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

      setIncome(data);
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
            data={income}
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
