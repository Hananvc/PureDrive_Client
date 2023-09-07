import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/apiconfig';
import Navbar from "../components/Navbar";
import HeroPages from "../components/HeroPages";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import BookCar from "../components/BookCar";





function VehicleSingleView() {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [dealers, setDealers] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const handleSlideChange = (index) => {
        setCurrentSlide(index);
    };

    const openPDF = () => {
        window.open(vehicle.brochure, '_blank');
    };
    useEffect(() => {
        fetchVehicle();
    }, []);

    async function fetchVehicle() {
        try {
            const response = await axiosInstance.get(`/vehicleapp/vehicle/${id}/`);
            setVehicle(response.data);
            fetchDealers(); // Call fetchDealers after setting the vehicle state
        } catch (error) {
            console.error('Error fetching vehicle:', error);
        }
    }

    const handleVariantChange = (event) => {
        const selectedVariantId = event.target.value;
        const selectedVariant = vehicle.Variant.find((variant) => variant.id === parseInt(selectedVariantId));
        setSelectedVariant(selectedVariant);
    };
    console.log(vehicle, 'vehicledata');
    console.log(dealers, 'dealers ');
    console.log(dealers.dealer, '8888888888888888888888888888888888888888888');

    useEffect(() => {
        if (vehicle && vehicle.brand) {
            fetchDealers();
        }
    }, [vehicle]);

    async function fetchDealers() {
        if (vehicle && vehicle.brand) { // Ensure vehicle and vehicle.brand are not null
            try {
                console.log(vehicle.brand.id, '---------------vehicle.brand.id------------------------');
                const resp = await axiosInstance.get(`/vehicleapp/brand/${vehicle.brand.id}/`);
                setDealers(resp.data);
                console.log('hhhhhhhhhhhhhhhhhhhh', resp.data);
            } catch (error) {
                console.error('Error fetching dealers:', error);
                setDealers([]);
            }
        }

    }

    return (
        <>
            <Navbar />
            <HeroPages name={vehicle?.model_name} />
            <div className="container mx-auto">
                <h1 className="text-5xl font-bold text-center mb-8 mt-10">Vehicle Details</h1>
                {vehicle && (
                    <div>
                        <div className=" font-bold text-center mb-8 mt-10">
                            <h2 className="text-3xl font-bold mb-4">Model: {vehicle.model_name}</h2>
                            <h3 className="text-2xl mb-4">Brand: {vehicle.brand.name}</h3>
                            <h3 className="text-2xl mb-4">Category: {vehicle.brand.category.name}</h3>
                            {vehicle.Variant.length > 0 && (
                                <>
                                    <p className="text-2xl mb-4">
                                        Variants available: {vehicle.Variant.length}
                                    </p>
                                    <p className="text-2xl mb-4">
                                        Variants : {vehicle.Variant.map((variant) => variant.name).join(', ')}
                                    </p>
                                </>
                            )}


                            <div className="mb-6">
                                {vehicle.brochure && (
                                    <div className="flex justify-center">
                                        {/* <h4 className="text-3xl font-semibold mt-4 mb-2">Brochure:</h4> */}

                                        <button
                                            className="px-4 py-2 bg-red-500 text-white rounded-md mx-5 h-20 w-60 text-xl"
                                            onClick={openPDF}
                                        >
                                            Download PDF Brochure
                                        </button>
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className="mb-10">
                            <h4 className="text-3xl font-semibold mt-4 mb-2">Images:</h4>
                            <div className="flex justify-center">
                                {vehicle.images.length > 0 ? (
                                    <Carousel
                                        showThumbs={false}
                                        width="40vw"
                                        maxWidth="50%"
                                        autoPlay={true}
                                        interval={2000}
                                        selectedItem={currentSlide} // Set the selected item based on the current slide
                                        onChange={handleSlideChange} // Handle slide change to update currentSlide
                                        infiniteLoop={true} // Enable infinite loop
                                    >
                                        {vehicle.images.map((image) => (
                                            <div key={image.id}>
                                                <img
                                                    src={image.images}
                                                    alt={`Vehicle ${vehicle.model_name} Image`}
                                                    className="vehicle-image w-100 h-90 object-cover rounded-md border border-gray-300 cursor-pointer"
                                                    onClick={() => console.log('Image clicked', image)}
                                                />
                                            </div>
                                        ))}
                                    </Carousel>
                                ) : (
                                    <img
                                        src={vehicle.default_image}
                                        alt={`Default Image`}
                                        className="vehicle-image rounded-md border border-gray-300 cursor-pointer"
                                        style={{ width: '40%', height: '50%', objectFit: 'cover' }}
                                        onClick={() => console.log('Default Image clicked')}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="variantSelect" className="text-2xl font-semibold">
                                Select Variant:
                            </label>
                            <select
                                id="variantSelect"
                                className="block w-full mt-1 p-3 border border-gray-300 rounded-md text-xl font-semibold"
                                onChange={handleVariantChange}
                                value={selectedVariant?.id || ''}
                            >
                                <option value="">Select a variant</option>
                                {vehicle.Variant.map((variant) => (
                                    <option key={variant.id} value={variant.id}>
                                        {variant.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedVariant && (
                            <div className="mb-8">
                                <h3 className="text-3xl font-semibold mb-3">Selected Variant: {selectedVariant.name}</h3>
                                <p className="text-2xl mb-2">Price: {selectedVariant.price}</p>
                                <p className="text-2xl mb-2">Description: {selectedVariant.description}</p>
                                <p className="text-2xl mb-2">Color: {selectedVariant.color}</p>
                                <p className="text-2xl mb-2">Battery Capacity: {selectedVariant.battery_capacity_kwh} KWh</p>
                                <p className="text-2xl mb-2">Range: {selectedVariant.range_km} km</p>
                                <p className="text-2xl mb-2">Charging Time: {selectedVariant.charging_time_hours} hrs</p>
                                <p className="text-2xl mb-2">Motor Power: {selectedVariant.motor_power_kw} kW</p>
                                <p className="text-2xl mb-2">Fast Charging: {selectedVariant.fast_charging ? 'Yes' : 'No'}</p>
                                <p className="text-2xl mb-2">Year Manufactured: {selectedVariant.year_manufactured}</p>
                                <p className="text-2xl mb-2">Is Featured: {selectedVariant.is_featured ? 'Yes' : 'No'}</p>
                                <h4 className="text-3xl font-semibold mt-4 mb-2">Images:</h4>
                                <div className="flex space-x-4">
                                    {selectedVariant.images.map((image) => (
                                        <img
                                            key={image.id}
                                            src={image.images}
                                            alt={`Variants ${selectedVariant.name}`}
                                            className="variant-image w-100 h-80 object-cover rounded-md border border-gray-300"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="mb-6">
                            <h4 className="text-3xl font-semibold mt-4 mb-2">Dealers:</h4>
                            {dealers?.dealer?.length > 0 && dealers?.dealer?.[0]?.user_info?.is_dealer ? (
                                <div className="grid grid-cols-3 gap-8 mb-20">
                                    {dealers?.dealer?.map((dealer) => (
                                        <div
                                            key={dealer.id}
                                            className="p-4 border border-red-300 rounded-lg cursor-pointer"
                                        >
                                            <p className="text-xl">Dealername: {dealer.user_info.username}</p>
                                            <p className="text-xl">District: {dealer.dealer_info.district}</p>
                                            <p className="text-xl">State: {dealer.dealer_info.state}</p>
                                            <p className="text-xl">Website: {dealer.dealer_info.website}</p>
                                            <p className="text-xl">Email: {dealer.user_info.email}</p>
                                            <p className="text-xl">Sales Contact: {dealer.dealer_info.sales_contact_no}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-2xl my-5 text-center mb-16">No dealers available.</p>
                            )}
                        </div>
                    </div>
                )}
                <BookCar />
            </div>
        </>
    );
}

export default VehicleSingleView;
