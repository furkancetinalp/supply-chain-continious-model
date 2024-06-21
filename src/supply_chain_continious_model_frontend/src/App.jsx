/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import DataTableDemand from './components/contents/DataTableDemand';
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
const App = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(0);
  const Menus = [
    { title: 'Dashboard', src: 'Chart_fill', item: <Dashboard /> },
    { title: 'Inbox', src: 'Chat', item: <Inbox /> },
    { title: 'Accounts', src: 'User', item: <Accounts />, gap: true },
    { title: 'Demand Analysis ', src: 'Calendar', item: <DataTableDemand /> },
    { title: 'Search', src: 'Search' },
    // { title: "Search", src: "Search" },
    // { title: "Search", src: "Search" },
    // { title: "Search", src: "Search" },
    // { title: "Search", src: "Search" },
    // { title: "Search", src: "Search" },
    // { title: "Search", src: "Search" },
    // { title: "Search", src: "Search" },
    // { title: "Search", src: "Search" },
    { title: 'Analytics', src: 'Chart' },
    { title: 'Files ', src: 'Folder', gap: true },
    { title: 'Setting', src: 'Setting' },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? 'w-72' : 'w-20'
        } bg-dark-purple relative h-[138vh] p-5 pt-8 duration-300`}
      >
        <img
          src="control.png"
          className={`border-dark-purple absolute -right-3 top-9 w-7 cursor-pointer rounded-full border-2 ${!open && 'rotate-180'}`}
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
            Designer
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              onClick={() => setSelected(index)}
              key={index}
              className={`hover:bg-light-white flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm text-gray-300 ${Menu.gap ? 'mt-9' : 'mt-2'} ${
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
