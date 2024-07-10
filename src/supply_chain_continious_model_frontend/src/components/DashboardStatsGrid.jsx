import React from 'react';
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5';

export default function DashboardStatsGrid() {
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
    <div className="flex gap-4">
      <BoxWrapper>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light text-gray-500">Total Sales</span>
          <div className="flex items-center">
            <strong className="text-xl font-semibold text-gray-700">
              $54232
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-600">
          <IoPieChart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light text-gray-500">
            Total Expenses
          </span>
          <div className="flex items-center">
            <strong className="text-xl font-semibold text-gray-700">
              $3423
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400">
          <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light text-gray-500">
            Total Customers
          </span>
          <div className="flex items-center">
            <strong className="text-xl font-semibold text-gray-700">
              12313
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600">
          <IoCart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light text-gray-500">Total Orders</span>
          <div className="flex items-center">
            <strong className="text-xl font-semibold text-gray-700">
              16432
            </strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="flex flex-1 items-center rounded-sm border border-gray-200 bg-white p-4">
      {children}
    </div>
  );
}
