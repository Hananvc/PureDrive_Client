import React, { useState } from 'react';
import axiosInstance from '../../../api/apiconfig';
import { Button, Input } from '@material-tailwind/react';
import { toast } from 'react-toastify';

function CategoryAddModal({ onClose, fetchData }) {
  const [categoryName, setCategoryName] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Construct FormData and make POST request
      const formData = new FormData();
      formData.append('name', categoryName);

      const response = await axiosInstance.post('/vehicleapp/category/', formData);
      console.log('Category added successfully:', response.data);
      toast.success('Category added successfully');
      onClose();
      fetchData(); // Close the modal after successful addition
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('Error in adding category');
    }
  };
  
  console.log("category name",categoryName);

  return (
    <div
      id="category-add-modal"
      tabIndex="-1"
      aria-hidden="true"
      className=" fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
    >
      {/* Rest of your modal JSX for adding a category */}
      <form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" onSubmit={handleFormSubmit}>
        <div>
          <label
            htmlFor="categoryName"
            className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white "
          >
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Enter category name"
            required
          />
        </div>
        <div className="flex justify-between mt-8">
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 text-center mx-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Category
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-lg px-6 py-3 text-center mx-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryAddModal;
