import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/apiconfig';
import { Button, Input } from '@material-tailwind/react';
import { toast } from 'react-toastify';

function BrandEditModal({ brandId, onClose, fetchData }) {
  const [brandData, setBrandData] = useState({});
  const [brandName, setBrandName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);     // Initialize with an empty category ID
  const [selectedCategoryId, setSelectedCategoryId] = useState("");


  useEffect(() => {
    fetchBrandData();
    fetchCategories();
  }, [brandId]);

  async function fetchBrandData() {
    try {
      const response = await axiosInstance.get(`/vehicleapp/brand/${brandId}/`);
      setBrandData(response.data);
      setBrandName(response.data.name);
    } catch (error) {
      console.error('Error fetching brand data:', error);
    }
  }

  async function fetchCategories() {
    try {
      const response = await axiosInstance.get('/vehicleapp/category/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', brandName);
      formData.append('category', selectedCategoryId);
  
      const response = await axiosInstance.patch(`/adminapp/brand/${brandId}/`, formData); // Update the URL
      toast.success('Brand updated successfully');
      onClose();
      fetchData();
    } catch (error) {
      console.error('Error updating brand:', error);
      toast.error('Error in brand updation');
    }
  };
  console.log("brands id",brandId,"name is ",brandName);
  console.log("categories are ",categories);
  console.log("selected category id", selectedCategoryId);
  return (
    <div
      id="brand-edit-modal"
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
            data-modal-hide="brand-edit-modal"
          >
            {/* Close button icon */}
          </button>
          <div className="px-8 py-6 lg:px-10">
            <h3 className="mb-6 text-2xl font-medium text-center text-gray-900 dark:text-white">
              Edit Brand
            </h3>
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div>
                <label
                  htmlFor="brandName"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Brand Name
                </label>
                <input
                  type="text"
                  id="brandName"
                  name="brandName"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter brand name"
                  required
                />
              </div>
              <div>
                <label
                    htmlFor="selectedCategory"
                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                    Select Category
                </label>
                <select
                    id="selectedCategory"
                    name="selectedCategory"
                    value={selectedCategoryId} // Set the selected category ID
                    onChange={(e) => setSelectedCategoryId(e.target.value)} 
                    className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                >
                    <option value="" disabled>
                    Select a category
                    </option>
                    {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                    ))}
                </select>
                </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update Brand
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-lg px-6 py-3 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandEditModal;
