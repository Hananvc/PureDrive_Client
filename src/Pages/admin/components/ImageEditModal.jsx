import React, { useState } from 'react';
import axiosInstance from '../../../api/apiconfig';
import { toast } from 'react-toastify';
import Loader from '../../loader';
import "./testing.css";

function ImageEditModal({ images, onClose, onImageEdit, fetchData, selectedVehicleId }) {
    const [editedImages, setEditedImages] = useState([...images]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [Image, setImage] = useState(null);
    const [loading,isLoading] =useState(false);


    const handleImageDelete = async (id) => {
        const userConfirmed = window.confirm('Are you sure you want to delete this image?');

        if (userConfirmed) {
            try {
                // Make an HTTP DELETE request using your axios instance
                await axiosInstance.delete(`/adminapp/images/${id}/`);
                toast.success('Deleted Successfully');
                // If the delete request is successful, update the state
                const updatedImages = editedImages.filter((image) => image.id !== id);
                setEditedImages(updatedImages);
                fetchData();
                // onClose();
            } catch (error) {
                // Handle any errors that occur during the delete request
                console.error('Error deleting image:', error);
            }
        }
    };



    const handleSaveImages = async () => {
        try {
            if (!Image || Image.length === 0) {
                toast.info('Please select at least one image to upload.');
                return; // Exit the function if no images are selected
            }
            // Create a FormData object to append each selected image
            const formData = new FormData();
    
            // Iterate through selected images and append each to the FormData object
            for (let i = 0; i < Image.length; i++) {
                formData.append('images', Image[i]);
            }
            isLoading(true);
            // Send the FormData object to the backend
            await axiosInstance.post(`/adminapp/images/?vehicle_id=${selectedVehicleId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            isLoading(false);

            toast.success('Images saved successfully');
            // onImageEdit(editedImages);
            fetchData();
            onClose();
        } catch (error) {
        
            console.error('Error uploading images:', error);
            toast.error('Error uploading images');
        }
    };
    
    console.log(selectedVehicleId, 'vehicle id is ');
    console.log(selectedImages, "images selected is ");
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Edit Images</h2>
                <ul>
                    {editedImages.map((image, index) => (
                        <li key={index} className="flex items-center justify-between py-2">
                            <img
                                src={image.images}
                                alt={`Image ${index}`}
                                className="w-30 h-28 object-cover"
                            />
                            <button
                                onClick={() => handleImageDelete(image.id)}
                                className="text-red-500 hover:text-red-600 font-bold text-xl"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                <div className='mt-4'>
                    <label
                        htmlFor="defaultImage"
                        className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                    >
                        Image
                    </label>
                    <input
                    type="file"
                    id="defaultImage"
                    name="defaultImage"
                    multiple  // Allow multiple files
                    onChange={(e) => setImage(e.target.files)}  // Use e.target.files to capture an array of selected files
                    className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />

                </div>
                <div className="flex justify-between mt-4">
                {loading ? (
                    <div className="flex items-center mx-44">
                    <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div>
                    </div>
                ) : (
                    <>
                    <button
                        type="submit"
                        onClick={handleSaveImages}
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Upload Images
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

            </div>
        </div>
    );
}

export default ImageEditModal;
