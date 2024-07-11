/* eslint-disable no-unused-vars */
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import React, { useState, useEffect } from 'react';
import { supply_chain_continious_model_backend } from '../../../declarations/supply_chain_continious_model_backend';

const data = [
  { name: 'Corporate', value: 0 },
  { name: 'Foundation', value: 0 },
  { name: 'Government', value: 0 },
  { name: 'Other', value: 0 },
];
//corporate,foundation,government,hospitality,education,individual
const RADIAN = Math.PI / 180;
const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#a000c4'];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function BuyerProfilePieChart() {
  const [pieData, setPieData] = useState(null);
  useEffect(function () {
    async function get_all_orders() {
      const order_data =
        await supply_chain_continious_model_backend.get_all_orders();
      console.log(order_data);

      let corporate = order_data
        ?.filter((x) => x.customer_profile.toLowerCase() === 'corporate')
        .reduce((accum, item) => accum + item.total_price, 0);

      let foundation = order_data
        ?.filter((x) => x.customer_profile.toLowerCase() === 'foundation')
        .reduce((accum, item) => accum + item.total_price, 0);

      let government = order_data
        ?.filter((x) => x.customer_profile.toLowerCase() === 'government')
        .reduce((accum, item) => accum + item.total_price, 0);

      let other = order_data
        ?.filter(
          (x) =>
            x.customer_profile.toLowerCase() !== 'corporate' &&
            x.customer_profile.toLowerCase() !== 'foundation' &&
            x.customer_profile.toLowerCase() !== 'government',
        )
        .reduce((accum, item) => accum + item.total_price, 0);

      data.at(0).value = corporate;
      data.at(1).value = foundation;
      data.at(2).value = government;
      data.at(3).value = other;

      setPieData(data);
    }
    get_all_orders();
  }, []);

  return (
    <div className="flex h-[22rem] w-[20rem] flex-col rounded-sm border border-gray-200 bg-white p-4">
      <strong className="font-medium text-gray-700">Customer Profile</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={105}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
