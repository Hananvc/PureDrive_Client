import { Card, Typography, Button } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { SidebarWithSearch } from "./sidebar";
import React, { useState, useEffect } from 'react';
import axiosInstance from "../../../api/apiconfig";
import BrandEditModal from './BrandEditModal';
import BrandAddModal from './BrandAddModal';
import { toast } from "react-toastify";

export function Brand() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingBrandId, setEditingBrandId] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const handleAddButtonClick = () => {
    setAddModalVisible(true);
  };
  
  const handleEditButtonClick = (brandId) => {
    setEditModalVisible(true);
    setEditingBrandId(brandId);
  };

  const handleDeleteButtonClick = (brandId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this brand?');
    if (confirmDelete) {
      deleteBrand(brandId);
    }
  };

  async function deleteBrand(brandId) {
    try {
      const response = await axiosInstance.delete(`/vehicleapp/brand/${brandId}/`);
      if (response.status === 204) {
        toast.success('Brand deleted successfully');
        fetchData(); // Refresh the data after deletion
      }
    } catch (error) {
      console.error('Error deleting brand:', error);
      toast.error('Error deleting brand');
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const brandsData = await fetchBrands();
      setBrands(brandsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }

  async function fetchBrands() {
    try {
      const response = await axiosInstance.get('/vehicleapp/brand/');
      return response.data;
    } catch (error) {
      console.error('Error fetching brands:', error);
      return [];
    }
  }

  console.log(brands,"brands is");
  if (loading) {
    return <div>Loading...</div>;
  }

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
                  className="font-extrabold leading-none opacity-70 content-center mb-10 my-5"
                  style={{ fontSize: '200.5%' }}
                >
                  Brands
                </Typography>
              </tr>
            </thead>
            <thead>
              <tr>
                {["Name", "Category", "No. of Dealers", "" , ""].map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70" style={{ fontSize: '120.5%' }}>
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {brands.map(({id, name, category, dealer }, index) => {
                const isLast = index === brands.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-bold" style={{ fontSize: '137.5%' }}>
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal" style={{ fontSize: '137.5%' }}>
                        {category.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal" style={{ fontSize: '137.5%' }}>
                        {dealer.length}
                      </Typography>
                    </td>
                    <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue"
                      className="font-semibold"
                      style={{ fontSize: '137.5%', cursor: 'pointer' }}
                      onClick={() => handleEditButtonClick(id)} // Pass the brand name as parameter
                    >
                      Edit
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="red"
                      className="font-semibold"
                      style={{ fontSize: '137.5%', cursor: 'pointer' }}
                      onClick={() => handleDeleteButtonClick(id)} // Pass the brand ID as parameter
                    >
                      Delete
                    </Typography>
                  </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row my-5">
          <Button
            className="flex items-center gap-3 font-bold text-black"
            color="blue"
            size="lg"
            onClick={handleAddButtonClick}
          >
            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Brand
          </Button>
          </div>
        </Card>
        {addModalVisible && (
          <BrandAddModal
            onClose={() => setAddModalVisible(false)}
            fetchData={fetchData}
          />
        )}

        {editModalVisible && (
        <BrandEditModal
          brandId={editingBrandId}
          onClose={() => setEditModalVisible(false)}
          fetchData={fetchData}
        />
      )}      
      </div>
    </div>

  );
}
