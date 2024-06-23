/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
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
import uploadImg from '../../../../public/cloud-upload-regular-240.png';
import { supply_chain_continious_model_backend } from '../../../../../declarations/supply_chain_continious_model_backend';
import { Int } from '@dfinity/candid/lib/cjs/idl';
import './drop-file-input.css';
import { ImageConfig } from '../../contents/Manufacturing/config/ImageConfig';
import PropTypes from 'prop-types';

export default function MainProducts() {
  const [data, setData] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  const [deletedData, setDeletedData] = useState(null);
  const [addedData, setAddedData] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [itemId, setItemId] = React.useState(null);
  const [showAddMainProductModal, setShowAddMainProductModal] =
    React.useState(false);

  const [showLetgoLoginModal, setShowLetgoLoginModal] = useState(false);
  function LoginLetgo() {
    setShowLetgoLoginModal(!showLetgoLoginModal);
  }

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
      async function get_all_main_products() {
        const data =
          await supply_chain_continious_model_backend.get_all_main_products();
        setData(data);
        console.log(data);
      }
      get_all_main_products();
    },
    [updatedData, deletedData, addedData],
  );

  // console.log(data);

  function updateMainProduct(itemId) {
    setShowModal(!showModal);
    setItemId(itemId);
    setUpdatedData(null);
  }

  function DeleteMainProduct(itemId) {
    async function delete_main_product() {
      const data =
        await supply_chain_continious_model_backend.delete_main_product_by_id(
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
    delete_main_product();
  }

  function AddMainProduct() {
    setShowAddMainProductModal(!showAddMainProductModal);
    setAddedData(null);
  }

  return (
    <>
      <div className="flex-row items-center justify-between space-y-3 p-4 sm:flex sm:space-x-4 sm:space-y-0">
        <div>
          <h5 className="mr-3 font-semibold dark:text-white">Main Products</h5>
          <p className="text-gray-500 dark:text-gray-400">
            Manage all your existing main products
          </p>
        </div>
        <div className="flex-row items-center justify-between space-y-3 p-4 sm:flex sm:space-x-4 sm:space-y-0">
          <button
            type="button"
            onClick={() => LoginLetgo()}
            className="hover:text-primary-700 flex w-full items-center justify-center rounded-lg border border-gray-200 bg-[#38d2fc] px-4 py-2 text-sm font-medium text-gray-900 hover:bg-[#55b6d1] focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 md:w-auto dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
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
            Login Letgo
          </button>

          <button
            type="button"
            onClick={() => AddMainProduct()}
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
            New Main Product
          </button>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Barcode
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Brand
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data?.map((item) => (
            <tr key={item.id}>
              <td className="whitespace-nowrap">
                <th
                  scope="row"
                  className="flex items-center whitespace-nowrap font-medium text-gray-900 dark:text-white"
                >
                  <div className="group flex w-[320px] justify-center gap-2 max-md:flex-col">
                    {item.image_list.map((url) => (
                      <article className="group/article relative w-full overflow-hidden rounded-xl transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)] before:absolute before:inset-x-0 before:bottom-0 before:h-1/3 before:bg-gradient-to-t before:from-black/50 before:transition-opacity after:absolute after:inset-0 after:bg-white/30 after:opacity-0 after:backdrop-blur after:transition-all focus-within:ring focus-within:ring-indigo-300 focus-within:before:opacity-100 md:before:opacity-0 md:hover:before:opacity-100 md:group-focus-within:[&:not(:focus-within):not(:hover)]:w-[20%] md:group-focus-within:[&:not(:focus-within):not(:hover)]:after:opacity-100 md:group-hover:[&:not(:hover)]:w-[20%] md:group-hover:[&:not(:hover)]:after:opacity-100">
                        <img
                          src={'data:image/jpeg;base64,' + url}
                          alt={`${item.id}_image`}
                          className="mr-2 h-[140px] rounded-full object-cover md:h-[140px] md:w-[140px]"
                        />
                      </article>
                    ))}
                  </div>
                </th>
              </td>
              <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{item.barcode}</td>
              <td className="px-6 py-4">{item.category}</td>
              <td className="px-6 py-4">{item.brand}</td>

              <td className="px-6 py-4">{item.price}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {item.total_amount}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <button
                  onClick={() => updateMainProduct(item.id)}
                  className="focus:shadow-outline-blue rounded-md bg-[#67e8f9] px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-cyan-600 focus:outline-none active:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => DeleteMainProduct(item.id)}
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
        <UpdateMainProductModal
          showModal={showModal}
          setShowModal={setShowModal}
          itemId={itemId}
          data={data}
          setUpdatedData={setUpdatedData}
        />
      )}
      {showAddMainProductModal && (
        <AddMainProductModal
          setShowModal={setShowModal}
          setShowAddMainProductModal={setShowAddMainProductModal}
          setAddedData={setAddedData}
        />
      )}
      {showLetgoLoginModal && (
        <LetgoLoginModal
          showLetgoLoginModal={showLetgoLoginModal}
          setShowLetgoLoginModal={setShowLetgoLoginModal}
        />
      )}
    </>
  );
}

function UpdateMainProductModal({
  showModal,
  setShowModal,
  itemId,
  data,
  setUpdatedData,
}) {
  const wrapperRef = useRef(null);
  const [images, setImages] = useState([]);

  const [fileList, setFileList] = useState([]);
  const onDragEnter = () => wrapperRef.current.classList.add('dragover');

  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const onFileDrop = async (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      let newImageBase64 = await convertFileToBase64(newFile);
      setImages([...images, newImageBase64]);
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

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
      name: item.name,
      barcode: item.barcode,
      price: item.price,
      category: item.category,
      brand: item.brand,
    },
    onSubmit: (values, bag) => {
      let model = {
        id: parseInt(item.id),
        name: values.name,
        barcode: values.barcode,
        price: Number(values.price),
        category: values.category,
        brand: values.brand,
        image_list: images,
      };

      try {
        async function update_main_product() {
          const data =
            await supply_chain_continious_model_backend.update_main_product(
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
        update_main_product();
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
              <h2 className="text-3xl font-semibold">Update Main Product</h2>
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
                    <FormLabel>Price</FormLabel>
                    <Input
                      name="price"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.price}
                      isInvalid={formik.touched.price && formik.errors.price}
                    ></Input>
                  </FormControl>

                  <FormControl mt="2">
                    <FormLabel>Category</FormLabel>
                    <Input
                      name="category"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.category}
                      isInvalid={
                        formik.touched.category && formik.errors.category
                      }
                    ></Input>
                  </FormControl>

                  <FormControl mt="2">
                    <FormLabel>Brand</FormLabel>
                    <Input
                      name="brand"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.brand}
                      isInvalid={formik.touched.brand && formik.errors.brand}
                    ></Input>
                  </FormControl>

                  <div
                    ref={wrapperRef}
                    className="drop-file-input"
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                  >
                    <div className="drop-file-input__label">
                      <img src={uploadImg} alt="" />
                      <p>Drag & Drop your files here</p>
                    </div>
                    <input type="file" value="" onChange={onFileDrop} />
                  </div>
                  {fileList.length > 0 ? (
                    <div className="drop-file-preview">
                      <p className="drop-file-preview__title">
                        Ready to upload
                      </p>
                      {fileList.map((item, index) => (
                        <div key={index} className="drop-file-preview__item">
                          <img
                            src={
                              ImageConfig[item.type.split('/')[1]] ||
                              ImageConfig['default']
                            }
                            alt=""
                          />
                          <div className="drop-file-preview__item__info">
                            <p>{item.name}</p>
                            <p>{item.size}B</p>
                          </div>
                          <span
                            className="drop-file-preview__item__del"
                            onClick={() => fileRemove(item)}
                          >
                            x
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null}

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
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
}

function AddMainProductModal({
  setShowModal,
  setShowAddMainProductModal,
  setAddedData,
}) {
  const wrapperRef = useRef(null);
  const [images, setImages] = useState([]);

  const [fileList, setFileList] = useState([]);
  const onDragEnter = () => wrapperRef.current.classList.add('dragover');

  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const onFileDrop = async (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      let newImageBase64 = await convertFileToBase64(newFile);
      setImages([...images, newImageBase64]);
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

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
      barcode: '',
      price: 0,
      category: '',
      brand: '',
    },
    onSubmit: (values, bag) => {
      let model = {
        name: values.name,
        barcode: values.barcode,
        price: Number(values.price),
        category: values.category,
        brand: values.brand,
        image_list: images,
      };

      try {
        async function create_main_product() {
          const data =
            await supply_chain_continious_model_backend.create_main_product(
              model,
            );
          if (data == true) {
            setTimeout(() => {
              setShowAddMainProductModal(false);
            }, '1000');
            addToast('success', 'Item is added');
            setAddedData(data);
          } else {
            setTimeout(() => {
              setShowAddMainProductModal(false);
            }, '3000');
            addToast('error', 'An error during add!');
          }
        }
        create_main_product();
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          setShowAddMainProductModal(false);
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
              <h2 className="text-3xl font-semibold">Add Main Product</h2>
              <button
                className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                onClick={() => setShowAddMainProductModal(false)}
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
                    <FormLabel>Price</FormLabel>
                    <Input
                      name="price"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.price}
                      isInvalid={formik.touched.price && formik.errors.price}
                    ></Input>
                  </FormControl>

                  <FormControl mt="2">
                    <FormLabel>Category</FormLabel>
                    <Input
                      name="category"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.category}
                      isInvalid={
                        formik.touched.category && formik.errors.category
                      }
                    ></Input>
                  </FormControl>

                  <FormControl mt="2">
                    <FormLabel>Brand</FormLabel>
                    <Input
                      name="brand"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.brand}
                      isInvalid={formik.touched.brand && formik.errors.brand}
                    ></Input>
                  </FormControl>

                  <div
                    ref={wrapperRef}
                    className="drop-file-input"
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                  >
                    <div className="drop-file-input__label">
                      <img src={uploadImg} alt="" />
                      <p>Drag & Drop your files here</p>
                    </div>
                    <input type="file" value="" onChange={onFileDrop} />
                  </div>
                  {fileList.length > 0 ? (
                    <div className="drop-file-preview">
                      <p className="drop-file-preview__title">
                        Ready to upload
                      </p>
                      {fileList.map((item, index) => (
                        <div key={index} className="drop-file-preview__item">
                          <img
                            src={
                              ImageConfig[item.type.split('/')[1]] ||
                              ImageConfig['default']
                            }
                            alt=""
                          />
                          <div className="drop-file-preview__item__info">
                            <p>{item.name}</p>
                            <p>{item.size}B</p>
                          </div>
                          <span
                            className="drop-file-preview__item__del"
                            onClick={() => fileRemove(item)}
                          >
                            x
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null}

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
                onClick={() => setShowAddMainProductModal(false)}
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

MainProducts.propTypes = {
  onFileChange: PropTypes.func,
};

function LetgoLoginModal({ showLetgoLoginModal, setShowLetgoLoginModal }) {
  // const toast = useToast();
  // const toastIdRef = React.useRef();

  // function addToast() {
  //   toastIdRef.current = toast({
  //     description: 'Success',
  //     colorScheme: 'teal',
  //     status: 'success',
  //   });
  // }
  // const formik = useFormik({
  //   initialValues: {
  //     email: '',
  //     password: '',
  //   },

  //   onSubmit: async (values, bag) => {
  //     try {
  //       const imp = await ecommerce_backend
  //         .login_letgo(values.email, values.password)
  //         .then((data) => {
  //           const id = data['Ok']['id'];
  //           const token = data['Ok']['token'];

  //           console.log('id', id);
  //           if (id != undefined) {
  //             // localStorage.setItem("token", token);
  //             // localStorage.setItem("userid", id);
  //             login(data['Ok']);
  //             addToast();
  //             var timer = setTimeout(function () {}, 3000);
  //             navigate('/');

  //             return (
  //               <div>
  //                 <Success200 />
  //               </div>
  //             );
  //           } else {
  //             localStorage.removeItem('token');
  //             localStorage.removeItem('userid');
  //             return <Error401 />;
  //           }
  //         });
  //       return <Success200 />;
  //     } catch (error) {
  //       localStorage.removeItem('token');
  //       localStorage.removeItem('userid');
  //       bag.setErrors({ general: 'Login Failed!!' });

  //       return <div>error!!!!!!!!!</div>;
  //     }
  //   },
  // });
  // return (
  //   <div>
  //     <Flex align="center" width="full" justifyContent="center">
  //       <Box pt="10">
  //         <Box textAlign="center">
  //           <Heading>Login</Heading>
  //         </Box>
  //         <Box my="5">
  //           {formik.errors.general && (
  //             <Alert status="error">{formik.errors.general}</Alert>
  //           )}
  //         </Box>
  //         <Box my={5} textAlign="left">
  //           <form onSubmit={formik.handleSubmit}>
  //             <FormControl>
  //               <FormLabel>Email</FormLabel>
  //               <Input
  //                 name="email"
  //                 onChange={formik.handleChange}
  //                 onBlur={formik.handleBlur}
  //                 value={formik.values.email}
  //                 isInvalid={formik.touched.email && formik.errors.email}
  //               ></Input>
  //             </FormControl>

  //             <FormControl mt="4">
  //               <FormLabel>Password</FormLabel>
  //               <Input
  //                 name="password"
  //                 onChange={formik.handleChange}
  //                 onBlur={formik.handleBlur}
  //                 value={formik.values.password}
  //                 type="password"
  //                 isInvalid={formik.touched.password && formik.errors.password}
  //               ></Input>
  //             </FormControl>
  //             <Button type="submit" mt="4" width="full">
  //               Login
  //             </Button>
  //           </form>
  //         </Box>
  //       </Box>
  //     </Flex>
  //   </div>
  // );
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
      email: '',
      password: '',
    },

    onSubmit: (values, bag) => {
      let model = {
        id: parseInt(item.id),
        name: values.name,
        district: values.district,
        province: values.province,
        country: values.country,
        location_detail: values.location_detail,
      };

      try {
        async function update_raw_material_warehouse() {
          const data =
            await supply_chain_continious_model_backend.update_raw_material_warehouse(
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
        update_raw_material_warehouse();
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
              <h2 className="text-3xl font-semibold">Login to Letgo</h2>
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
                  <FormControl mt="2">
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      isInvalid={formik.touched.email && formik.errors.email}
                    ></Input>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      isInvalid={
                        formik.touched.password && formik.errors.password
                      }
                    ></Input>
                  </FormControl>

                  <Button type="submit" mt="4" width="full" colorScheme="cyan">
                    Login
                  </Button>
                </form>
              </Box>
            </div>
            {/*footer*/}
            <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
              <button
                className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                type="button"
                onClick={() => setShowLetgoLoginModal(false)}
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
