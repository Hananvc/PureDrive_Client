import { Card, Typography,Button } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";

import { SidebarWithSearch } from "./sidebar";
import React, { useState, useEffect } from 'react';
import axiosInstance from "../../../api/apiconfig";
import CategoryEditModal from "./CategoryUpdateModal";
import CategoryAddModal from './CategoryAddModal';
import { toast } from "react-toastify";
import VariantDetailsModal from "./VariantDetailsModal ";
import EditVariantModal from "./EditVariantModal ";
import AddVariantModal from "./AddVariantModal";


export function Variants() {
    const [Variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);

    const [editingVariant, setEditingVariant] = useState(null);
    const [variantDetailsVisible, setVariantDetailsVisible] = useState(false); // State for variant details modal
    const [selectedVariant, setSelectedVariant] = useState(null); // Store the selected variant

    const handleAddButtonClick = () => {
        setAddModalVisible(true);
      };

    const handleAddModalClose = () => {
        setAddModalVisible(false); // Close the "Add Variant" modal by setting the state to false
      };
      

    const handleEditButtonClick = (variantId) => {
        // Find the selected variant by its ID
        const selectedVariant = Variants.find((variant) => variant.id === variantId);
        if (selectedVariant) {
            // Set the editingVariant state to the selected variant data
            setEditingVariant(selectedVariant);
            // Open the EditVariantModal
            setEditModalVisible(true);
        }
    };

    const handleDeleteButtonClick = (variantId) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this category?");
        if (shouldDelete) {
            deleteVariant(variantId);
        }
      };
      
    const deleteVariant = async (variantId) => {
        try {
            await axiosInstance.delete(`/adminapp/variants/${variantId}/`);
            toast.success("Variant deleted successfully");
            fetchData(); // Refresh the variant list after deletion
        } catch (error) {
            console.error('Error deleting variant:', error);
            toast.error("Error in variant deletion");
        }
    };

    const handleDetailButtonClick = async (variantId) => {
        try {
            const response = await axiosInstance.get(`/adminapp/variants/${variantId}/`);
            const variantData = response.data;
            setSelectedVariant(variantData);
            setVariantDetailsVisible(true); // Open the variant details modal
        } catch (error) {
            console.error('Error Fetching data:', error);
            toast.error("Error Fetching data");
        }
    }
      

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const VariantsData = await fetchVariants();
            setVariants(VariantsData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }

    async function fetchVariants() {
        try {
            const response = await axiosInstance.get('/adminapp/variants/');
            return response.data;
        } catch (error) {
            console.error('Error fetching Variants:', error);
            return [];
        }
    }



    if (loading) {
        return <div>Loading...</div>;
    }
console.log("Variants data is ",Variants);
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
                                    Variants
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
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Vehicle Model Name</th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Variant Name</th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>


        
                            </tr>
                        </thead>
                        <tbody>
                            {Variants.map((variants) => (
                                <tr key={variants.id}>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-bold" style={{ fontSize: '115.5%' }}>
                                            {variants.id}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                    <Typography variant="small" color="blue-gray" className="font-bold" style={{ fontSize: '115.5%' }}>
                                            {variants.vehicle.model_name}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                    <Typography variant="small" color="blue-gray" className="font-bold" style={{ fontSize: '115.5%' }}>
                                            {variants.name}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                    <Typography as="a" href="#" variant="small" color="blue" className="font-bold" style={{ fontSize: '115.5%' }}  onClick={() => handleDetailButtonClick(variants.id)}>
                                            Details
                                        </Typography>
                                    </td>
                                    
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography as="a" href="#" variant="small" color="blue" className="font-semibold" style={{ fontSize: '115.5%' }} onClick={() => handleEditButtonClick(variants.id)}>
                                        Edit
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                    <Button
                                            color="red"
                                            onClick={() => handleDeleteButtonClick(variants.id)}
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
                    className="flex items-center gap-2 font-bold text-black"
                    color="blue"
                    size="lg"
                    onClick={handleAddButtonClick} // Open the modal
                    >
                    <UserPlusIcon strokeWidth={2} className="h-5 w-5" />
                    Add Variant
                    </Button>

                </div>
                </Card>
            {variantDetailsVisible && selectedVariant && (
                    <VariantDetailsModal
                        variantData={selectedVariant}
                        onClose={() => setVariantDetailsVisible(false)}
                    />
            )}
            {editModalVisible && (
                    <EditVariantModal
                        variantData={editingVariant}
                        onClose={() => setEditModalVisible(false)}
                        fetchData={fetchData}
                    />
                )}

            {addModalVisible && (
                    <AddVariantModal onClose={handleAddModalClose} fetchData={fetchData} />
                )}
            </div>
        </div>
    );
}
