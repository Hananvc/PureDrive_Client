import React, { useState , useEffect } from 'react';
import axiosInstance from '../../../api/apiconfig';
import { Button } from '@material-tailwind/react';
import { toast } from 'react-toastify';

function AddVariantModal({ onClose, fetchData }) {
  const [variantName, setVariantName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [batteryCapacity, setBatteryCapacity] = useState('');
  const [rangeKm, setRangeKm] = useState('');
  const [chargingTimeHours, setChargingTimeHours] = useState('');
  const [motorPowerKw, setMotorPowerKw] = useState('');
  const [fastCharging, setFastCharging] = useState(false);
  const [yearManufactured, setYearManufactured] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [vehicle, setVehicle] = useState(''); // For selected vehicle
  const [vehicles, setVehicles] = useState([]);

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
    // Fetch the list of vehicles from your backend when the component mounts
    axiosInstance.get('/adminapp/vehicle/')
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.error('Error fetching vehicles:', error);
      });
  }, []); 




  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const newVariantData = {
        name: variantName,
        description,
        price,
        color: selectedColor,
        battery_capacity_kwh: batteryCapacity,
        range_km: rangeKm,
        charging_time_hours: chargingTimeHours,
        motor_power_kw: motorPowerKw,
        fast_charging: fastCharging,
        year_manufactured: yearManufactured,
        is_featured: isFeatured,
        vehicle: vehicle,
      };

      console.log(newVariantData,"data");
      // Send a POST request to create a new variant
      await axiosInstance.post('/adminapp/createvariant/', newVariantData);

      toast.success('Variant added successfully');
      fetchData(); // Refresh the variant list after adding
      onClose();
    } catch (error) {
      console.error('Error adding variant:', error);
      toast.error('Error in adding variant');
    }
  };

  console.log("vehicle id is ",vehicle);
  return (
    <div
      id="add-variant-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" style={{ fontSize: '115.5%', width: '40vw' }}>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Add Variant</h2>
        </div>
        <div style={{ maxHeight: '80vh', overflowY: 'auto' }}> {/* Add this div for scrollbar */}
        <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
              <label htmlFor="vehicle" className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Select Vehicle
              </label>
              <select
                id="vehicle"
                name="vehicle"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              >
                <option value="">Select a vehicle</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.model_name}
                  </option>
                ))}
              </select>
            </div>
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
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
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
              type="number"
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
            <label htmlFor="chargingTimeHours" className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Charging Time (hours)
            </label>
            <input
              type="number"
              id="chargingTimeHours"
              name="chargingTimeHours"
              value={chargingTimeHours}
              onChange={(e) => setChargingTimeHours(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter charging time in hours"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="motorPowerKw" className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Motor Power (kW)
            </label>
            <input
              type="number"
              id="motorPowerKw"
              name="motorPowerKw"
              value={motorPowerKw}
              onChange={(e) => setMotorPowerKw(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter motor power in kW"
              required
            />
          </div>
          <div className="mb-4">
  <label htmlFor="fastCharging" className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">
    Fast Charging
  </label>
  <input
    type="checkbox"
    id="fastCharging"
    name="fastCharging"
    checked={fastCharging}
    onChange={() => setFastCharging(!fastCharging)}
    className="form-checkbox h-6 w-6 text-blue-600  rounded-md border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 dark:bg-gray-600 dark:text-white"
  />
</div>
<div className="mb-4">
  <label htmlFor="yearManufactured" className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">
    Year Manufactured
  </label>
  <input
    type="number"
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
  <label className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">Is Featured</label>
  <input
    type="checkbox"
    id="isFeatured"
    name="isFeatured"
    checked={isFeatured}
    onChange={() => setIsFeatured(!isFeatured)}
    className="form-checkbox h-6 w-6 text-blue-600 rounded-md border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 dark:bg-gray-600 dark:text-white"
  />
</div>

          <div className="mt-6 flex justify-end">
            <Button color="blue" type="submit">
              Add Variant
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

export default AddVariantModal;
