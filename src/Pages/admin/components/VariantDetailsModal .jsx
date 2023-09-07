import React from 'react';
import { Button } from '@material-tailwind/react';

function VariantDetailsModal({ variantData, onClose }) {
  const {
    id,
    vehicle: {
      model_name,
      brochure,
      default_image,
      images,
    },
    name,
    price,
    description,
    color,
    battery_capacity_kwh,
    range_km,
    charging_time_hours,
    motor_power_kw,
    fast_charging,
    year_manufactured,
    is_featured,
    created_at,
    updated_at,
  } = variantData;

  return (
    <div
      id="variant-details-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ width: '50vw', maxWidth: '400px' }} // Adjust the width here
      >
        <div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          style={{ fontSize: '125.5%', maxHeight: '80vh', overflowY: 'auto' }}
        >
        <div className="mb-4 ">
          <h2 className="text-2xl font-semibold text-red-500 dark:text-white ">Variant Details</h2>
        </div>
        <div className="mb-4" >
          <strong>ID:</strong> {id}
        </div>
        <div className="mb-4">
          <strong>Variant Name:</strong> {name}
        </div>
        <div className="mb-4">
          <strong>Description:</strong> {description}
        </div>
        <div className="mb-4">
          <strong>Price:</strong> {price}
        </div>
        <div className="mb-4">
          <strong>Color:</strong> {color}
        </div>
        <div className="mb-4">
          <strong>Battery Capacity (kWh):</strong> {battery_capacity_kwh}
        </div>
        <div className="mb-4">
          <strong>Range (km):</strong> {range_km}
        </div>
        <div className="mb-4">
          <strong>Charging Time (hours):</strong> {charging_time_hours}
        </div>
        <div className="mb-4">
          <strong>Motor Power (kW):</strong> {motor_power_kw}
        </div>
        <div className="mb-4">
          <strong>Fast Charging:</strong> {fast_charging ? 'Yes' : 'No'}
        </div>
        <div className="mb-4">
          <strong>Year Manufactured:</strong> {year_manufactured}
        </div>
        <div className="mb-4">
          <strong>Is Featured:</strong> {is_featured ? 'Yes' : 'No'}
        </div>
        <div className="mb-4">
          <strong>Created At:</strong> {created_at}
        </div>
        <div className="mb-4">
          <strong>Updated At:</strong> {updated_at}
        </div>
        <div className="mb-4">
          <strong>Vehicle Model:</strong> {model_name}
        </div>
        <div className="mb-4 ">
          <strong>Brochure:</strong> <a href={brochure} target="_blank" rel="noopener noreferrer" className='font-bold text-red-500'>Download Brochure</a>
        </div>
        <div className="mb-4">
        <strong>Default Image:</strong>
        <img
            src={default_image}
            alt="Default Image"
            className="h-28 w-30"
        />
        </div>
        <div className="mb-4">
          <strong>Images:</strong>
          <div className="grid grid-cols-4 gap-4 mt-2">
            {images.map((image, index) => (
                <>
              <img key={index} src={image.images} alt={`Image ${index + 1}`} className="w-36 h-24 mr-2 mt-4" />
              
              </>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            color="blue"
            onClick={onClose}
            className="mr-4"
          >
            Close
          </Button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default VariantDetailsModal;
