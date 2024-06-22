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

export default function RawMaterialAgreements() {
  const [data, setData] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  const [deletedData, setDeletedData] = useState(null);
  const [addedData, setAddedData] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [itemId, setItemId] = React.useState(null);
  const [
    showAddRawMaterialAgreementModal,
    setShowAddRawMaterialAgreementModal,
  ] = React.useState(false);

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
      async function get_all_raw_material_agreements() {
        const data =
          await supply_chain_continious_model_backend.get_all_raw_material_agreements();
        setData(data);
        console.log(data);
      }
      get_all_raw_material_agreements();
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

  function AddRawMaterialAgreement() {
    setShowAddRawMaterialAgreementModal(!showAddRawMaterialAgreementModal);
    setAddedData(null);
  }

  return (
    <>
      <div className="flex-row items-center justify-between space-y-3 p-4 sm:flex sm:space-x-4 sm:space-y-0">
        <div>
          <h5 className="mr-3 font-semibold dark:text-white">
            Raw Material Agreements
          </h5>
          <p className="text-gray-500 dark:text-gray-400">
            Manage all your existing raw material agreements
          </p>
        </div>
        <button
          type="button"
          onClick={() => AddRawMaterialAgreement()}
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
          New Raw Material Agreement
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Agreement Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Product Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Delivery Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Company Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Unit Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Total Price
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
                {item?.agreement_date}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {item.product_name}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {item.delivery_date}
              </td>
              <td className="whitespace-nowrap px-6 py-4">{item.amount}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {item.company_name}
              </td>
              {/* <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                  {item.company_name}
                </span>
              </td> */}
              <td className="whitespace-nowrap px-6 py-4">{item.unit_price}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {item.total_price}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <button
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
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <UpdateRawMaterialAgreementModal
          showModal={showModal}
          setShowModal={setShowModal}
          itemId={itemId}
          data={data}
          setUpdatedData={setUpdatedData}
        />
      )}
      {showAddRawMaterialAgreementModal && (
        <AddRawMaterialAgreementModal
          setShowModal={setShowModal}
          setShowAddRawMaterialAgreementModal={
            setShowAddRawMaterialAgreementModal
          }
          setAddedData={setAddedData}
        />
      )}
    </>
  );
}

function UpdateRawMaterialAgreementModal({
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
      name: item.product_name,
      amount: item.amount,
      unit_price: item.unit_price,
      company_name: item.company_name,
      agreement_date: item.agreement_date,
      warehouse_name: item.warehouse_name,
      delivery_date: item.delivery_date,
    },
    onSubmit: (values, bag) => {
      let model = {
        id: parseInt(item.id),
        product_name: values.name,
        amount: Number(values.amount),
        unit_price: Number(values.unit_price),
        company_name: values.company_name,
        agreement_date: values.agreement_date,
        delivery_date: values.delivery_date,
        warehouse_name: values.warehouse_name,
      };

      try {
        async function update_raw_material_agreement() {
          const data =
            await supply_chain_continious_model_backend.update_raw_material_agreement(
              model,
            );
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
        update_raw_material_agreement();
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
                    <FormLabel>Agreement Date</FormLabel>
                    <Input
                      name="agreement_date"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.agreement_date}
                      isInvalid={
                        formik.touched.agreement_date &&
                        formik.errors.agreement_date
                      }
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

                  <FormControl>
                    <FormLabel>Delivery Date</FormLabel>
                    <Input
                      name="delivery_date"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.delivery_date}
                      isInvalid={
                        formik.touched.delivery_date &&
                        formik.errors.delivery_date
                      }
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
                    <FormLabel>Company Name</FormLabel>
                    <Input
                      name="company_name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.company_name}
                      isInvalid={
                        formik.touched.company_name &&
                        formik.errors.company_name
                      }
                    ></Input>
                  </FormControl>

                  <FormControl mt="2">
                    <FormLabel>Unit Price</FormLabel>
                    <Input
                      name="unit_price"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.unit_price}
                      isInvalid={
                        formik.touched.unit_price && formik.errors.unit_price
                      }
                    ></Input>
                  </FormControl>

                  <FormControl mt="2">
                    <FormLabel>Warehouse Name</FormLabel>
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

function AddRawMaterialAgreementModal({
  setShowModal,
  setShowAddRawMaterialAgreementModal,
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
      name: '',
      amount: 0,
      unit_price: 0,
      company_name: '',
      agreement_date: new Date().toJSON().slice(0, 10),
      warehouse_name: '',
      delivery_date: new Date().toJSON().slice(0, 10),
    },
    onSubmit: (values, bag) => {
      let model = {
        product_name: values.name,
        amount: Number(values.amount),
        unit_price: Number(values.unit_price),
        company_name: values.company_name,
        agreement_date: values.agreement_date,
        delivery_date: values.delivery_date,
        warehouse_name: values.warehouse_name,
      };

      try {
        async function add_raw_material_agreement() {
          const data =
            await supply_chain_continious_model_backend.add_raw_material_agreement(
              model,
            );
          if (data == true) {
            setTimeout(() => {
              setShowAddRawMaterialAgreementModal(false);
            }, '1000');
            addToast('success', 'Item is added');
            setAddedData(data);
          } else {
            setTimeout(() => {
              setShowAddRawMaterialAgreementModal(false);
            }, '3000');
            addToast('error', 'An error during add!');
          }
        }
        add_raw_material_agreement();
      } catch (error) {
        setTimeout(() => {
          setShowAddRawMaterialAgreementModal(false);
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
              <h2 className="text-3xl font-semibold">Add Raw Material Offer</h2>
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
                    <FormLabel>Requested Date</FormLabel>
                    <Input
                      name="requested_date"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.requested_date}
                      isInvalid={
                        formik.touched.requested_date &&
                        formik.errors.requested_date
                      }
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

                  <FormControl>
                    <FormLabel>Delivery Date</FormLabel>
                    <Input
                      name="delivery_date"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.delivery_date}
                      isInvalid={
                        formik.touched.delivery_date &&
                        formik.errors.delivery_date
                      }
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
                    <FormLabel>Company Name</FormLabel>
                    <Input
                      name="company_name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.company_name}
                      isInvalid={
                        formik.touched.company_name &&
                        formik.errors.company_name
                      }
                    ></Input>
                  </FormControl>

                  <FormControl mt="2">
                    <FormLabel>Unit Price</FormLabel>
                    <Input
                      name="unit_price"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.unit_price}
                      isInvalid={
                        formik.touched.unit_price && formik.errors.unit_price
                      }
                    ></Input>
                  </FormControl>

                  <FormControl mt="2">
                    <FormLabel>Warehouse Name</FormLabel>
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
                onClick={() => setShowAddRawMaterialAgreementModal(false)}
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
