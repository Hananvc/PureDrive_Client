import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/apiconfig';
import { Button, Input } from '@material-tailwind/react';
import { toast } from 'react-toastify';

function CategoryEditModal({ categoryId, onClose , fetchData}) {
  // State to store category data and form field values
  const [categoryData, setCategoryData] = useState({});
  const [categoryName, setCategoryName] = useState('');

  // UseEffect to fetch category data when categoryId changes
  useEffect(() => {
    // Fetch category data based on categoryId
    async function fetchCategoryData() {
      try {
        const response = await axiosInstance.get(`/vehicleapp/category/${categoryId}/`);
        setCategoryData(response.data);
        setCategoryName(response.data.name);
        // ... update other state for form fields if needed
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    }

    if (categoryId) {
      fetchCategoryData();
    }
  }, [categoryId]);

  console.log(categoryName,"categoryname",categoryId);

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Construct FormData and make PATCH request
      const formData = new FormData();
      formData.append('name', categoryName);
      // ... add other fields to formData if needed

      const response = await axiosInstance.patch(`/vehicleapp/category/${categoryId}/`, formData);
      console.log('Category updated successfully:', response.data);
      toast.success("Category updated successfully")
      onClose();
      fetchData();

       // Close the modal after successful update
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error("Error in Updation")
    }
  };

  // JSX for the modal
  return (
    <div
      id="category-edit-modal"
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
            data-modal-hide="category-edit-modal"
          >
            {/* Close button icon */}
          </button>
          <div className="px-8 py-6 lg:px-10">
            <h3 className="mb-6 text-2xl font-medium text-center text-gray-900 dark:text-white">
              Edit Category
            </h3>
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              {/* Input fields for editing category data */}
              <div>
                <label
                  htmlFor="categoryName"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
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
              {/* Add more input fields if needed */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update Category
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

export default CategoryEditModal;
