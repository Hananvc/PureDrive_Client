import { Card, Typography,Button } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";

import { SidebarWithSearch } from "./sidebar";
import React, { useState, useEffect } from 'react';
import axiosInstance from "../../../api/apiconfig";
import CategoryEditModal from "./CategoryUpdateModal";
import CategoryAddModal from './CategoryAddModal';
import { toast } from "react-toastify";

export function Category() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
  
    const handleEditButtonClick = (categoryId) => {
      setEditModalVisible(true);
      setEditingCategoryId(categoryId);
    };
    
    const handleDeleteButtonClick = (categoryId) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this category?");
        if (shouldDelete) {
          deleteCategory(categoryId);
        }
      };
      
      const deleteCategory = async (categoryId) => {
        try {
          await axiosInstance.delete(`/vehicleapp/category/${categoryId}/`);
          toast.success("Category deleted successfully");
          fetchData(); // Refresh the category list after deletion
        } catch (error) {
          console.error('Error deleting category:', error);
          toast.error("Error in category deletion");
        }
      };
      

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const categoriesData = await fetchCategories();
            setCategories(categoriesData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }

    async function fetchCategories() {
        try {
            const response = await axiosInstance.get('/vehicleapp/category/');
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    }



    if (loading) {
        return <div>Loading...</div>;
    }
console.log("category data is ",categories);
    return (
        <div className="flex">
            <SidebarWithSearch />
            <div className="mt-4 -ml-20 w-8/12">
                <Card className="w-auto h-auto overflow-scroll ml-48 my-20 card-container">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                <Typography
                                    variant="small"
                                    color="black"
                                    className="font-extrabold leading-none opacity-70 content-center mb-10 my-5 "
                                    style={{ fontSize: '200.5%' }}
                                >
                                    Categories
                                </Typography>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        ID
                                    </Typography>
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Name</th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
        
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(({ id, name }) => (
                                <tr key={id}>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-bold" style={{ fontSize: '115.5%' }}>
                                            {id}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                    <Typography variant="small" color="blue-gray" className="font-bold" style={{ fontSize: '115.5%' }}>
                                            {name}
                                        </Typography>
                                    </td>
                                    
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography as="a" href="#" variant="small" color="blue" className="font-semibold" onClick={() => handleEditButtonClick(id)}>
                                        Edit
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                    <Button
                                        color="red"
                                        onClick={() => handleDeleteButtonClick(id)}
                                    >
                                        Delete
                                    </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row my-5">
                    <Button
                    className="flex items-center gap-3 font-bold text-black"
                    color="blue"
                    size="lg"
                    onClick={() => setIsAddModalOpen(true)} // Open the modal
                    >
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Category
                    </Button>
                </div>
                </Card>

                {editModalVisible && <CategoryEditModal categoryId={editingCategoryId} onClose={() => setEditModalVisible(false)} fetchData={fetchData} />}
                {isAddModalOpen && <CategoryAddModal onClose={() => setIsAddModalOpen(false)} fetchData={fetchData} />}
            </div>
        </div>
    );
}
