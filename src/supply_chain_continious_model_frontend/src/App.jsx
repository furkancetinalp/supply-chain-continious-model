/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import DemandPlanning from './components/contents/Planning/DemandPlanning';
import RawMaterialPlanning from './components/contents/Planning/RawMaterialPlanning';
import { Formik, useFormik } from 'formik';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  useToast,
} from '@chakra-ui/react';
import RawMaterialOffers from './components/contents/SourcingAndProcurement/RawMaterialOffers';
import RawMaterialAgreements from './components/contents/SourcingAndProcurement/RawMaterialAgreements';
import RawMaterialWarehouse from './components/contents/ProcurementWarehouse/RawMaterialWarehouse';
import MainProducts from './components/contents/Manufacturing/MainProducts';
import MassProducts from './components/contents/Manufacturing/MassProducts';
import Orders from './components/contents/Order/Orders';
const App = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(0);
  const Menus = [
    { title: 'Dashboard', src: 'Chart_fill', item: <Dashboard /> },
    // { title: 'Inbox', src: 'Chat', item: <Inbox /> },
    // { title: 'Accounts', src: 'User', item: <Accounts />, gap: true },
    {
      title: 'Main Products',
      src: 'Search',
      item: <MainProducts />,
    },
    {
      title: 'Mass Products',
      src: 'Search',
      item: <MassProducts />,
    },
    {
      title: 'Orders ',
      src: 'Chart',
      item: <Orders />,
      gap: true,
    },
    {
      title: 'Demand Planning ',
      src: 'Chart',
      item: <DemandPlanning />,
      gap: true,
    },
    {
      title: 'Raw Material Planning ',
      src: 'Chart',
      item: <RawMaterialPlanning />,
    },
    {
      title: 'Raw Material Offers ',
      src: 'Folder',
      item: <RawMaterialOffers />,
      gap: true,
    },
    {
      title: 'Raw Material Agreement ',
      src: 'Calendar',
      item: <RawMaterialAgreements />,
    },
    {
      title: 'Raw Material Warehouse ',
      src: 'Setting',
      item: <RawMaterialWarehouse />,
    },

    // { title: 'Mass Products ', src: 'Folder', gap: true },
    // { title: 'Orders', src: 'Chart' },
    // { title: 'Setting', src: 'Setting' },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? 'w-72' : 'w-20'
        } relative h-[138vh] bg-dark-purple p-5 pt-8 duration-300`}
      >
        <img
          src="control.png"
          className={`absolute -right-3 top-9 w-7 cursor-pointer rounded-full border-2 border-dark-purple ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex items-center gap-x-4">
          <img
            src="logo.png"
            className={`cursor-pointer duration-500 ${
              open && 'rotate-[360deg]'
            }`}
          />
          <h1
            className={`origin-left text-xl font-medium text-white duration-200 ${
              !open && 'scale-0'
            }`}
          >
            Supply Chain
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              onClick={() => setSelected(index)}
              key={index}
              className={`flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm text-gray-300 hover:bg-light-white ${Menu.gap ? 'mt-9' : 'mt-2'} ${
                selected === index && 'bg-light-white'
              } `}
            >
              <img src={`${Menu.src}.png`} />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        {Menus.at(selected)?.item ? (
          Menus.at(selected)?.item
        ) : (
          <div>Undefined</div>
        )}
        {/* <h1 className="text-2xl font-semibold ">Home Page</h1> */}
      </div>
    </div>
  );
};
export default App;

function Inbox() {
  return <div>Inbox</div>;
}

function Accounts() {
  return <div>Accounts</div>;
}
