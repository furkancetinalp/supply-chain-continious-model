/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, createRef } from 'react';
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
import Popper from 'popper.js';
import { Int } from '@dfinity/candid/lib/cjs/idl';

export default function Orders() {
  const [data, setData] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  const [deletedData, setDeletedData] = useState(null);
  const [addedData, setAddedData] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [itemId, setItemId] = React.useState(null);
  const [showAddOrderModal, setShowAddOrderModal] = React.useState(false);

  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start',
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  let bgColor = '';
  let color = 'bg-gray-800';
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
      async function get_all_orders() {
        const data =
          await supply_chain_continious_model_backend.get_all_orders();
        setData(data);
        console.log(data);
      }
      get_all_orders();
    },
    [updatedData, deletedData, addedData],
  );

  // console.log(data);

  function updateRawMaterialAgreement(itemId) {
    setShowModal(!showModal);
    setItemId(itemId);
    setUpdatedData(null);
  }

  function DeleteRawMaterialAgreement(itemId) {
    async function delete_raw_material_agreement_by_id() {
      const data =
        await supply_chain_continious_model_backend.delete_raw_material_agreement_by_id(
          itemId,
        );
      if (data == true) {
        setTimeout(() => {}, '1000');
        addToast('success', 'Item is deleted!');
        setDeletedData(itemId);
      } else {
        setTimeout(() => {}, '3000');
        addToast('error', 'An error during delete!');
      }
    }
    delete_raw_material_agreement_by_id();
  }

  function AddOrder() {
    setShowAddOrderModal(!showAddOrderModal);
    setAddedData(null);
  }

  function UpdateOrderStatus(itemId, status, delivery_date) {
    const model = { status: null };
    async function update_order() {
      const data = await supply_chain_continious_model_backend.update_order(
        itemId,
        status,
        delivery_date,
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
    update_order();
  }

  return (
    <>
      <div className="flex-row items-center justify-between space-y-3 p-4 sm:flex sm:space-x-4 sm:space-y-0">
        <div>
          <h5 className="mr-3 font-semibold dark:text-white">Orders</h5>
          <p className="text-gray-500 dark:text-gray-400">
            Manage all your existing orders
          </p>
        </div>
        <button
          type="button"
          onClick={() => AddOrder()}
          className="hover:text-primary-700 flex w-full items-center justify-center rounded-lg border border-gray-200 bg-[#86efac] px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 md:w-auto dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="-ml-1 mr-2 h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
          </svg>
          New Order
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Order Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Total Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Delivery Date
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
              <td className="whitespace-nowrap px-6 py-4">
                {item?.product_name}
              </td>
              <td className="whitespace-nowrap px-6 py-4">{item.quantity}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.order_date}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {item.customer_title}
              </td>
              <td className="whitespace-nowrap px-6 py-4">{item.address}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {item.total_price}
              </td>
              {/* <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                  {item.company_name}
                </span>
              </td> */}
              <td className="whitespace-nowrap px-6 py-4">
                {item.delivery_date}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {Object.keys(item.order_status)[0]}
              </td>
              <td className="px-2 py-4">
                {/* <button
                  onClick={() => updateRawMaterialAgreement(item.id)}
                  className="focus:shadow-outline-blue rounded-md bg-[#67e8f9] px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-cyan-600 focus:outline-none active:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => DeleteRawMaterialAgreement(item.id)}
                  className="focus:shadow-outline-red ml-2 rounded-md bg-[#db2777] px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-pink-700 focus:outline-none active:bg-red-600"
                >
                  Delete
                </button> */}
                <div className="flex flex-wrap">
                  <div className="w-full px-4 sm:w-6/12 md:w-4/12">
                    <div className="relative inline-flex w-full align-middle">
                      <button
                        className={
                          'mb-1 mr-1 rounded px-6 py-3 text-sm font-bold uppercase text-black shadow outline-none hover:shadow-lg focus:outline-none ' +
                          bgColor
                        }
                        style={{ transition: 'all .15s ease' }}
                        type="button"
                        ref={btnDropdownRef}
                        onClick={() => {
                          dropdownPopoverShow
                            ? closeDropdownPopover()
                            : openDropdownPopover();
                        }}
                      >
                        Update Status
                      </button>
                      <div
                        ref={popoverDropdownRef}
                        className={
                          (dropdownPopoverShow ? 'block ' : 'hidden ') +
                          (color === 'white' ? 'bg-white' : bgColor + ' ') +
                          'z-50 float-left mt-1 list-none rounded py-2 text-left text-base shadow-lg'
                        }
                        style={{ minWidth: '12rem' }}
                      >
                        <button
                          className={
                            'whitespace-no-wrap block w-full bg-transparent px-4 py-2 text-sm font-normal hover:bg-green-300 ' +
                            (color === 'black')
                          }
                          onClick={() =>
                            UpdateOrderStatus(item.id, { Processing: null }, '')
                          }
                        >
                          Processing
                        </button>
                        <button
                          className={
                            'whitespace-no-wrap block w-full bg-transparent px-4 py-2 text-sm font-normal hover:bg-green-300 ' +
                            (color === 'black')
                          }
                          onClick={() =>
                            UpdateOrderStatus(item.id, { Shipped: null }, '')
                          }
                        >
                          Shipped
                        </button>
                        <button
                          className={
                            'whitespace-no-wrap block w-full bg-transparent px-4 py-2 text-sm font-normal hover:bg-green-300 ' +
                            (color === 'black')
                          }
                          onClick={() =>
                            UpdateOrderStatus(
                              item.id,
                              { Delivered: null },
                              new Date().toString(),
                            )
                          }
                        >
                          Delivered
                        </button>
                        <button
                          className={
                            'whitespace-no-wrap block w-full bg-transparent px-4 py-2 text-sm font-normal hover:bg-green-300 ' +
                            (color === 'black')
                          }
                          onClick={() =>
                            UpdateOrderStatus(
                              item.id,
                              { Completed: null },
                              new Date().toString(),
                            )
                          }
                        >
                          Completed
                        </button>
                        <button
                          className={
                            'whitespace-no-wrap block w-full bg-transparent px-4 py-2 text-sm font-normal hover:bg-red-300 ' +
                            (color === 'black')
                          }
                          onClick={() =>
                            UpdateOrderStatus(item.id, { Rejected: null }, '')
                          }
                        >
                          Rejected
                        </button>
                        <button
                          className={
                            'whitespace-no-wrap block w-full bg-transparent px-4 py-2 text-sm font-normal hover:bg-red-300 ' +
                            (color === 'black')
                          }
                          onClick={() =>
                            UpdateOrderStatus(item.id, { Cancelled: null }, '')
                          }
                        >
                          Cancelled
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddOrderModal && (
        <AddOrderModal
          setShowModal={setShowModal}
          setShowAddOrderModal={setShowAddOrderModal}
          setAddedData={setAddedData}
        />
      )}
    </>
  );
}

function AddOrderModal({ setShowModal, setShowAddOrderModal, setAddedData }) {
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

  const formik = useFormik({
    initialValues: {
      barcode: '',
      customer_title: '',
      address: '',
      quantity: '',
      order_date: new Date().toJSON().slice(0, 10),
    },
    onSubmit: (values, bag) => {
      let model = {
        barcode: values.barcode,
        customer_title: values.customer_title,
        address: values.address,
        quantity: Number(values.quantity),
        order_date: values.order_date,
      };

      try {
        async function add_order() {
          const data =
            await supply_chain_continious_model_backend.create_order(model);
          if (data == true) {
            setTimeout(() => {
              setShowAddOrderModal(false);
            }, '1000');
            addToast('success', 'Order is added');
            setAddedData(data);
          } else {
            setTimeout(() => {
              setShowAddOrderModal(false);
            }, '3000');
            addToast('error', 'An error during add!');
          }
        }
        add_order();
      } catch (error) {
        setTimeout(() => {
          setShowAddOrderModal(false);
        }, '3000');
        addToast('error', 'Error!');
      }
    },
  });
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-auto my-6 w-auto max-w-3xl">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
              <h2 className="text-3xl font-semibold">Create Order</h2>
              <button
                className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative flex-auto p-6">
              <Box my={5} textAlign="left">
                <form onSubmit={formik.handleSubmit}>
                  <FormControl>
                    <FormLabel>Barcode</FormLabel>
                    <Input
                      name="barcode"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.barcode}
                      isInvalid={
                        formik.touched.barcode && formik.errors.barcode
                      }
                    ></Input>
                  </FormControl>

                  <FormControl mt="2">
                    <FormLabel>Customer Title</FormLabel>
                    <Input
                      name="customer_title"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.customer_title}
                      isInvalid={
                        formik.touched.customer_title &&
                        formik.errors.customer_title
                      }
                    ></Input>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input
                      name="address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.address}
                      isInvalid={
                        formik.touched.address && formik.errors.address
                      }
                    ></Input>
                  </FormControl>

                  <FormControl mt="2">
                    <FormLabel>Quantity</FormLabel>
                    <Input
                      name="quantity"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.quantity}
                      isInvalid={
                        formik.touched.quantity && formik.errors.quantity
                      }
                    ></Input>
                  </FormControl>

                  <Button type="submit" mt="4" width="full" colorScheme="green">
                    Add
                  </Button>
                </form>
              </Box>
            </div>
            {/*footer*/}
            <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
              <button
                className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                type="button"
                onClick={() => setShowAddOrderModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
}
