import React, { useState, useEffect } from 'react';
import { Button, Input } from '@material-tailwind/react';
import axiosInstance from '../../../api/apiconfig';
import { toast } from 'react-toastify';

function EditVariantModal({ variantData, onClose, fetchData }) {
  const [variantName, setVariantName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [batteryCapacity, setBatteryCapacity] = useState('');
  const [rangeKm, setRangeKm] = useState('');
  const [chargingTime, setChargingTime] = useState('');
  const [motorPower, setMotorPower] = useState('');
  const [fastCharging, setFastCharging] = useState(false);
  const [yearManufactured, setYearManufactured] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const COLOR_CHOICES = [
    ['White', 'White'],
    ['Black', 'Black'],
    ['Green', 'Green'],
    ['Red', 'Red'],
    ['Yellow', 'Yellow'],
    ['Blue', 'Blue'],
    ['Brown', 'Brown'],
    ['Orange', 'Orange'],
  ];

  useEffect(() => {
    if (variantData) {
      setVariantName(variantData.name || '');
      setDescription(variantData.description || '');
      setPrice(variantData.price || '');
      setColor(variantData.color || '');
      setBatteryCapacity(variantData.battery_capacity_kwh || '');
      setRangeKm(variantData.range_km || '');
      setChargingTime(variantData.charging_time_hours || '');
      setMotorPower(variantData.motor_power_kw || '');
      setFastCharging(variantData.fast_charging || false);
      setYearManufactured(variantData.year_manufactured || '');
      setIsFeatured(variantData.is_featured || false);
    }
  }, [variantData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedVariantData = {
        name: variantName,
        description,
        price,
        color,
        battery_capacity_kwh: batteryCapacity,
        range_km: rangeKm,
        charging_time_hours: chargingTime,
        motor_power_kw: motorPower,
        fast_charging: fastCharging,
        year_manufactured: yearManufactured,
        is_featured: isFeatured,
      };

      await axiosInstance.patch(`/adminapp/variants/${variantData.id}/`, updatedVariantData);

      toast.success('Variant updated successfully');
      onClose();
      fetchData();
    } catch (error) {
      console.error('Error updating variant:', error);
      toast.error('Error in updating variant');
    }
  };


  console.log("all data to be sent to backend",);
  return (
    <div
    id="edit-variant-modal"
    tabIndex="-1"
    aria-hidden="true"
    className="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
  >
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" style={{ fontSize: '115.5%' , width: '40vw'}}>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Variant</h2>
      </div>
      <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="variantName" className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Variant Name
            </label>
            <input
              type="text"
              id="variantName"
              name="variantName"
              value={variantName}
              onChange={(e) => setVariantName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter variant name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter description"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter price"
              required
            />
          </div>
          <div className="mb-4">
  <label htmlFor="color" className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">
    Color
  </label>
  <select
    id="color"
    name="color"
    value={color}
    onChange={(e) => setColor(e.target.value)}
    className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
    required
  >
    <option value="">Select a color</option>
    {COLOR_CHOICES.map(([value, label]) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
</div>
          <div className="mb-4">
            <label htmlFor="batteryCapacity" className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Battery Capacity (kWh)
            </label>
            <input
              type="text"
              id="batteryCapacity"
              name="batteryCapacity"
              value={batteryCapacity}
              onChange={(e) => setBatteryCapacity(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter battery capacity"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rangeKm" className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Range (km)
            </label>
            <input
              type="text"
              id="rangeKm"
              name="rangeKm"
              value={rangeKm}
              onChange={(e) => setRangeKm(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter range in kilometers"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="chargingTime" className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Charging Time (hours)
            </label>
            <input
              type="text"
              id="chargingTime"
              name="chargingTime"
              value={chargingTime}
              onChange={(e) => setChargingTime(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter charging time in hours"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="motorPower" className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Motor Power (kW)
            </label>
            <input
              type="text"
              id="motorPower"
              name="motorPower"
              value={motorPower}
              onChange={(e) => setMotorPower(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter motor power in kW"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fastCharging" className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Fast Charging
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="fastCharging"
                name="fastCharging"
                checked={fastCharging}
                onChange={() => setFastCharging(!fastCharging)}
                className="form-checkbox h-6 w-6 text-blue-500 border border-gray-300 rounded-md focus:ring-0"
              />
              <label htmlFor="fastCharging" className="ml-2 text-gray-900 dark:text-white">
                Enabled
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="yearManufactured" className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Year Manufactured
            </label>
            <input
              type="text"
              id="yearManufactured"
              name="yearManufactured"
              value={yearManufactured}
              onChange={(e) => setYearManufactured(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter year of manufacture"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="isFeatured" className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Is Featured
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={isFeatured}
                onChange={() => setIsFeatured(!isFeatured)}
                className="form-checkbox h-6 w-6 text-blue-500 border border-gray-300 rounded-md focus:ring-0"
              />
              <label htmlFor="isFeatured" className="ml-2 text-gray-900 dark:text-white">
                Yes
              </label>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button color="blue" type="submit" >
              Update Variant
            </Button>
            <Button color="red" onClick={onClose} className="ml-4">
              Cancel
            </Button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default EditVariantModal;
