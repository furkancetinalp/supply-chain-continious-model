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

export default function RawMaterialPlanning() {
  const [data, setData] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  const [deletedData, setDeletedData] = useState(null);
  const [addedData, setAddedData] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [itemId, setItemId] = React.useState(null);
  const [showAddRawMaterialPlanModal, setShowAddRawMaterialPlanModal] =
    React.useState(false);

  // useEffect(() => {
  //   supply_chain_continious_model_backend
  //     .get_all_demand_plans()
  //     // .then((data) => ReservedHours(data))
  //     .then((data) => setData(data))
  //     .then((data) => console.log(data))
  //     .catch((err) => console.error('Custom err: ', err));
  // }, []);
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
      async function get_all_raw_material_plans() {
        const data =
          await supply_chain_continious_model_backend.get_all_raw_material_plans();
        setData(data);
        console.log(data);
      }
      get_all_raw_material_plans();
    },
    [updatedData, deletedData, addedData],
  );

  // console.log(data);

  function updateRawMaterialPlan(itemId) {
    setShowModal(!showModal);
    setItemId(itemId);
    setUpdatedData(null);
  }

  function DeleteRawMaterialPlan(itemId) {
    async function delete_raw_material_plan() {
      const data =
        await supply_chain_continious_model_backend.delete_raw_material_plan_by_id(
          itemId,
        );
      //   console.log('silme sonucu', data);
      if (data == true) {
        setTimeout(() => {}, '1000');
        addToast('success', 'Item is deleted!');
        setDeletedData(itemId);
      } else {
        setTimeout(() => {}, '3000');
        addToast('error', 'An error during delete!');
      }
    }
    delete_raw_material_plan();
  }

  function AddRawMaterial() {
    setShowAddRawMaterialPlanModal(!showAddRawMaterialPlanModal);
    setAddedData(null);
  }

  return (
    <>
      <div className="flex-row items-center justify-between space-y-3 p-4 sm:flex sm:space-x-4 sm:space-y-0">
        <div>
          <h5 className="mr-3 font-semibold dark:text-white">
            Raw Material Planning
          </h5>
          <p className="text-gray-500 dark:text-gray-400">
            Manage all your existing raw material plans
          </p>
        </div>
        <button
          type="button"
          onClick={() => AddRawMaterial()}
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
          New Raw Material Plan
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Requested Delivery Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Urgency
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Warehouse
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data?.map((item) => (
            <tr key={item.id}>
              <td className="whitespace-nowrap px-6 py-4">{item?.date}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {item.requested_delivery_time} days
              </td>
              <td className="whitespace-nowrap px-6 py-4">{item.amount}</td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                  {item.urgency}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {item.warehouse_name}
              </td>

              <td className="whitespace-nowrap px-6 py-4">
                <button
                  onClick={() => updateRawMaterialPlan(item.id)}
                  className="focus:shadow-outline-blue rounded-md bg-[#67e8f9] px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-cyan-600 focus:outline-none active:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => DeleteRawMaterialPlan(item.id)}
                  className="focus:shadow-outline-red ml-2 rounded-md bg-[#db2777] px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-pink-700 focus:outline-none active:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <UpdateRawMaterialPlanModal
          showModal={showModal}
          setShowModal={setShowModal}
          itemId={itemId}
          data={data}
          setUpdatedData={setUpdatedData}
        />
      )}
      {showAddRawMaterialPlanModal && (
        <AddRawMaterialPlanModal
          setShowAddRawMaterialPlanModal={setShowAddRawMaterialPlanModal}
          setAddedData={setAddedData}
        />
      )}
    </>
  );
}

function UpdateRawMaterialPlanModal({
  showModal,
  setShowModal,
  itemId,
  data,
  setUpdatedData,
}) {
  const item = data.find((x) => x.id == itemId);
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
      date: item?.date,
      name: item.name,
      amount: item.amount,
      requested_delivery_time: item.requested_delivery_time,
      urgency: item.urgency,
      warehouse_name: item.warehouse_name,
    },
    onSubmit: (values, bag) => {
      let model = {
        id: parseInt(item.id),
        name: values.name,
        amount: Number(values.amount),
        requested_delivery_time: parseInt(item.requested_delivery_time),
        urgency: values.urgency,
        warehouse_name: values.warehouse_name,
        date: values.date,
      };

      try {
        async function update_raw_material_plan() {
          const data =
            await supply_chain_continious_model_backend.update_raw_material_plan(
              model,
            );
          // console.log('update result', data);
          if (data == true) {
            setTimeout(() => {
              setShowModal(false);
            }, '1000');
            addToast('success', 'Item is updated');
            setUpdatedData(data);
          } else {
            setTimeout(() => {
              setShowModal(false);
            }, '3000');
            addToast('error', 'An error during update!');
          }
        }
        update_raw_material_plan();
      } catch (error) {
        setTimeout(() => {
          setShowModal(false);
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
              <h2 className="text-3xl font-semibold">
                Update Raw Material Plan
              </h2>
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
                    <FormLabel>Date</FormLabel>
                    <Input
                      name="date"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.date}
                      isInvalid={formik.touched.date && formik.errors.date}
                    ></Input>
                  </FormControl>

                  <FormControl mt="2">
                    <FormLabel>Name</FormLabel>
                    <Input
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      isInvalid={formik.touched.name && formik.errors.name}
                    ></Input>
                  </FormControl>

                  <FormControl mt="2">
                    <FormLabel>Amount</FormLabel>
                    <Input
                      name="amount"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.amount}
                      isInvalid={formik.touched.amount && formik.errors.amount}
                    ></Input>
                  </FormControl>

                  <FormControl mt="2">
                    <FormLabel>Requested Delivery Time</FormLabel>
                    <Input
                      name="requested_delivery_time"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.requested_delivery_time}
                      isInvalid={
                        formik.touched.requested_delivery_time &&
                        formik.errors.requested_delivery_time
                      }
                    ></Input>
                  </FormControl>

                  <FormControl mt="2">
                    <FormLabel>Urgency</FormLabel>
                    <Input
                      name="urgency"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.urgency}
                      isInvalid={
                        formik.touched.urgency && formik.errors.urgency
                      }
                    ></Input>
                  </FormControl>

                  <FormControl mt="2">
                    <FormLabel>Warehouse</FormLabel>
                    <Input
                      name="warehouse_name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.warehouse_name}
                      isInvalid={
                        formik.touched.warehouse_name &&
                        formik.errors.warehouse_name
                      }
                    ></Input>
                  </FormControl>

                  <Button type="submit" mt="4" width="full" colorScheme="blue">
                    Update
                  </Button>
                </form>
              </Box>
            </div>
            {/*footer*/}
            <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
              <button
                className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              {/* <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Save Changes
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
}

function AddRawMaterialPlanModal({
  setShowAddRawMaterialPlanModal,
  setAddedData,
}) {
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
      date: new Date().toJSON().slice(0, 10),
      name: '',
      amount: 0,
      requested_delivery_time: 30,
      urgency: 'medium',
      warehouse_name: '',
    },
    onSubmit: (values, bag) => {
      let model = {
        name: values.name,
        amount: Number(values.amount),
        requested_delivery_time: parseInt(values.requested_delivery_time),
        urgency: values.urgency,
        warehouse_name: values.warehouse_name,
        date: values.date,
      };

      try {
        async function add_demand_plan() {
          const data =
            await supply_chain_continious_model_backend.add_raw_material_plan(
              model,
            );
          if (data == true) {
            setTimeout(() => {
              setShowAddRawMaterialPlanModal(false);
            }, '1000');
            addToast('success', 'Item is added');
            setAddedData(data);
          } else {
            setTimeout(() => {
              setShowAddRawMaterialPlanModal(false);
            }, '3000');
            addToast('error', 'An error during add!');
          }
        }
        add_demand_plan();
      } catch (error) {
        setTimeout(() => {
          setShowAddRawMaterialPlanModal(false);
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
              <h2 className="text-3xl font-semibold">Add Raw Material Plan</h2>
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
                    <FormLabel>Date</FormLabel>
                    <Input
                      name="date"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.date}
                      isInvalid={formik.touched.date && formik.errors.date}
                    ></Input>
                  </FormControl>

                  <FormControl mt="2">
                    <FormLabel>Name</FormLabel>
                    <Input
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      isInvalid={formik.touched.name && formik.errors.name}
                    ></Input>
                  </FormControl>

                  <FormControl mt="2">
                    <FormLabel>Amount</FormLabel>
                    <Input
                      name="amount"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.amount}
                      isInvalid={formik.touched.amount && formik.errors.amount}
                    ></Input>
                  </FormControl>

                  <FormControl mt="2">
                    <FormLabel>Requested Delivery Time</FormLabel>
                    <Input
                      name="requested_delivery_time"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.requested_delivery_time}
                      isInvalid={
                        formik.touched.requested_delivery_time &&
                        formik.errors.requested_delivery_time
                      }
                    ></Input>
                  </FormControl>

                  <FormControl mt="2">
                    <FormLabel>Urgency</FormLabel>
                    <Input
                      name="urgency"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.urgency}
                      isInvalid={
                        formik.touched.urgency && formik.errors.urgency
                      }
                    ></Input>
                  </FormControl>

                  <FormControl mt="2">
                    <FormLabel>Warehouse</FormLabel>
                    <Input
                      name="warehouse_name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.warehouse_name}
                      isInvalid={
                        formik.touched.warehouse_name &&
                        formik.errors.warehouse_name
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
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              {/* <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Save Changes
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
}
