import React, { useState, useEffect } from 'react';
import { Button, Input } from '@material-tailwind/react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../api/apiconfig';
import Loader from '../../loader';

function VehicleAddModal({ onClose, fetchData }) {
  const [model_name, setModelName] = useState('');
  const [brandId, setBrandId] = useState('');
  const [brochure, setBrochure] = useState(null);
  const [defaultImage, setDefaultImage] = useState(null);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


// Fetch brands when the modal is opened
useEffect(() => {
  fetchBrands();
}, []);

async function fetchBrands() {
  try {
    const response = await axiosInstance.get('/adminapp/brand/');
    setBrands(response.data);
  } catch (error) {
    console.error('Error fetching brands:', error);
  }
}

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('model_name', model_name);
      formData.append('brand', brandId);
      if (brochure) {
        formData.append('brochure', brochure);
      }
      if (defaultImage) {
        formData.append('default_image', defaultImage);
      }

      // Make an API call to create the new vehicle
      const response = await axiosInstance.post('/adminapp/vehicle/', formData);
      setIsLoading(false);
      toast.success('Vehicle added successfully');
      onClose();
      fetchData();
    } catch (error) {
      console.error('Error adding vehicle:', error);
      toast.error('Error in adding vehicle');
    }
  };
  console.log("formdata is ",model_name,brandId,brochure,defaultImage);

  return (
    <div
      id="vehicle-add-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="relative max-w-3xl w-full p-6 overflow-x-hidden overflow-y-auto md:inset-0">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg w-10 h-10 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="vehicle-add-modal"
          >
            &times;
          </button>
          <div className="px-8 py-6 lg:px-10">
            <h3 className="mb-6 text-2xl font-medium text-center text-gray-900 dark:text-white">
              Add Vehicle
            </h3>
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div>
                <label
                  htmlFor="model_name"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Model Name
                </label>
                <input
                  type="text"
                  id="model_name"
                  name="model_name"
                  value={model_name}
                  onChange={(e) => setModelName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter model name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="brand"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Select Brand
                </label>
                <select
                  id="brand"
                  name="brand"
                  value={brandId}
                  onChange={(e) => setBrandId(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                >
                  <option value="" disabled>
                    Select a brand
                  </option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="brochure"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Brochure
                </label>
                <input
                  type="file"
                  id="brochure"
                  name="brochure"
                  onChange={(e) => setBrochure(e.target.files[0])}
                  className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="defaultImage"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Default Image
                </label>
                <input
                  type="file"
                  id="defaultImage"
                  name="defaultImage"
                  onChange={(e) => setDefaultImage(e.target.files[0])}
                  className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div className="flex justify-between">
                {isLoading ? (<>
                <Loader/>
                    </>
                    ):(
                    <>
                       <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add Vehicle
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-lg px-6 py-3 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Cancel
                </button>
                </>
                )}
             
 
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleAddModal;
