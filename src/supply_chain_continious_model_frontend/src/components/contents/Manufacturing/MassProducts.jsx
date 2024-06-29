/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
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
import { supply_chain_continious_model_backend } from '../../../../../declarations/supply_chain_continious_model_backend';

export default function MassProducts() {
  const [data, setData] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  const [deletedData, setDeletedData] = useState(null);
  const [addedData, setAddedData] = useState(null);
  const [approvedData, setApprovedData] = useState(null);
  const [rejectedData, setRejectedData] = useState(null);
  const [itemId, setItemId] = React.useState(null);

  const toast = useToast();
  const toastIdRef = React.useRef();
  function addToast(result, message) {
    toastIdRef.current = toast({
      description: result,
      colorScheme: result == 'success' ? 'green' : 'red',
      status: result,
      title: message,
    });
  }

  useEffect(
    function () {
      async function get_all_created_products() {
        const data =
          await supply_chain_continious_model_backend.get_all_created_products();
        setData(data);
        console.log(data);
      }
      get_all_created_products();
    },
    [approvedData, deletedData, addedData],
  );

  function UpdateProductStatus(itemId, status) {
    const model = { status: null };
    async function approve_product() {
      const data = await supply_chain_continious_model_backend.approve_product(
        itemId,
        status,
      );
      if (data == true) {
        setTimeout(() => {}, '1000');
        addToast('success', `Success!`);
        setApprovedData(itemId);
      } else {
        setTimeout(() => {}, '3000');
        addToast('error', 'An error during action!');
      }
    }
    approve_product();
  }

  function DeleteProduct(itemId) {
    async function delete_product() {
      const data =
        await supply_chain_continious_model_backend.delete_product(itemId);
      if (data == true) {
        setTimeout(() => {}, '1000');
        addToast('success', `Success!`);
        setApprovedData(itemId);
        setDeletedData(null);
      } else {
        setTimeout(() => {}, '3000');
        addToast('error', 'An error during action!');
      }
    }
    delete_product();
  }

  return (
    <>
      <div className="flex-row items-center justify-between space-y-3 p-4 sm:flex sm:space-x-4 sm:space-y-0">
        <div>
          <h5 className="mr-3 font-semibold dark:text-white">Mass Products</h5>
          <p className="text-gray-500 dark:text-gray-400">
            Manage all your existing products
          </p>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Id
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Main Product Id
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Barcode
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data?.map((item) => (
            <tr key={item.id}>
              <td className="whitespace-nowrap px-6 py-4">{item.id}</td>

              <td className="whitespace-nowrap px-6 py-4">
                {item.main_product_id}
              </td>
              <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.barcode}</td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                  {Object.keys(item.status)[0]}
                </span>
              </td>

              <td className="whitespace-nowrap px-6 py-4">
                <button
                  onClick={() =>
                    UpdateProductStatus(item.id, { Approved: null })
                  }
                  className="focus:shadow-outline-blue rounded-md bg-[#67e8f9] px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-cyan-600 focus:outline-none active:bg-blue-600"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    UpdateProductStatus(item.id, { Rejected: null })
                  }
                  className="focus:shadow-outline-red ml-2 rounded-md bg-[#710536] px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-pink-700 focus:outline-none active:bg-red-600"
                >
                  Reject
                </button>
                <button
                  onClick={() => DeleteProduct(item.id)}
                  className="focus:shadow-outline-red ml-2 rounded-md bg-[#db2777] px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-pink-700 focus:outline-none active:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
