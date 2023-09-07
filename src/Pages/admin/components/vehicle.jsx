import { Card, Typography, Button } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { SidebarWithSearch } from "./sidebar";
import React, { useState, useEffect } from 'react';
import axiosInstance from "../../../api/apiconfig";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { Carousel } from "react-responsive-carousel";
import VehicleEditModal from "./VehicleEditModal ";
import VehicleAddModal from "./VehicleAddModal ";
import { toast } from "react-toastify";


export function Vehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);


  async function handleDelete(vehicleId) {
    try {
      const userConfirmed = window.confirm('Are you sure you want to delete this vehicle?');

      if (userConfirmed) {
        await axiosInstance.delete(`/adminapp/vehicle/${vehicleId}/`);
        toast.success('Vehicle deleted successfully');
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      toast.error('Error in vehicle deletion');
    }
  }

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };
  
  const handleEdit = (vehicleId) => {
    setSelectedVehicleId(vehicleId); // Store the selected vehicle ID
    setIsEditModalOpen(true); // Open the edit modal
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const vehiclesData = await fetchVehicles();
      setVehicles(vehiclesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }

  async function fetchVehicles() {
    try {
      const response = await axiosInstance.get('/vehicleapp/vehicle/');
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      return [];
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }
console.log("vehicle data is ",vehicles);
  return (
    <div className="flex overflow-hidden">
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
                  Vehicles
                </Typography>
              </tr>
            </thead>
            <thead>
              <tr>
                {["Name", "Image", "Brand", "Brochure", "No. of Variants", "",""].map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70" style={{ fontSize: '115.5%' }}>
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-bold" style={{ fontSize: '115.5%' }}>
                      {vehicle.model_name}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
  {vehicle.images.length > 0 ? (
    <img
      src={vehicle.images[0].images}
      alt={vehicle.model_name}
      className="w-25 h-20 rounded-full cursor-pointer"
      onClick={() => {
        setSelectedImage(vehicle.images);
        setIsCarouselOpen(true);
      }}
    />
  ) : (
    <img
      src={vehicle.default_image} // Use the default_image property from the vehicle object
      alt={vehicle.model_name}
      className="w-25 h-20 rounded-full cursor-pointer"
      onClick={() => {
        // setSelectedImage([]); // No images to show in the carousel
        // setIsCarouselOpen(true);
      }}
    />
  )}
</td>

                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal" style={{ fontSize: '115.5%' }}>
                      {vehicle.brand.name}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {vehicle.brochure ? (
                      <a href={vehicle.brochure} target="_blank" rel="noopener noreferrer" className="text-blue-600" style={{ fontSize: '115.5%' }}>
                        Brochure
                      </a>
                    ) : (
                      <span className="text-blue-gray-400">No Brochure</span>
                    )}
                  </td>
                  <td className="p-12 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal content-center" style={{ fontSize: '108.5%' }}>
                      {vehicle.Variant.length}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <button
                      onClick={() => handleEdit(vehicle.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                <button
                  onClick={() => handleDelete(vehicle.id)}
                  className="text-red-600 hover:underline font-bold"
                >
                  Delete
                </button>
              </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row my-5">
          <Button
            onClick={handleAddModalOpen}
            className="flex items-center gap-3 font-bold text-black"
            color="blue"
            size="lg"
          >
            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Vehicle
          </Button>
          </div>
        </Card>
      </div>
      {isEditModalOpen && (
        <VehicleEditModal vehicleId={selectedVehicleId} onClose={() => setIsEditModalOpen(false)} fetchData={fetchData} />
      )}
      {isAddModalOpen && (
      <VehicleAddModal onClose={() => setIsAddModalOpen(false)} fetchData={fetchData} />
    )}
      {isCarouselOpen && selectedImage && (
        <ImageCarousel images={selectedImage} onClose={() => setIsCarouselOpen(false)} />
      )}
    </div>
  );
}

function ImageCarousel({ images, onClose }) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="w-full h-full max-w-screen-lg">
        <button
          className="absolute top-4 right-4 text-white text-5xl"
          onClick={onClose}
        >
          &times;
        </button>
        <Carousel showThumbs={false} infiniteLoop>
          {images.map((image) => (
            <div key={image.id}>
              <img src={image.images} alt={image.id} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
