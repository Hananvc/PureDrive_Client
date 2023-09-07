import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import '../styles/dealer_register.css';
import { useNavigate } from 'react-router-dom';
import Modalglobal from '../components/modalglobal';
import Loader from './loader';




const DealerRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    confirmPassword: '',
    email: '',
    password: '',
    username: '',
    brand: '',
    address: '',
    website: '',
    district: '',
    state: '',
    pin_code: '',
    country: '',
    field_experience: '',
    num_staff: '',
    sales_contact_no: '',
    service_contact_no: '',
    is_verified: false,
    is_superuser: false,
    is_active: false, 
  });

  const [brands, setBrands] = useState([]);
  const [districtChoices, setDistrictChoices] = useState([]);
  const [stateChoices, setStateChoices] = useState([]);
  const [countryChoices, setCountryChoices] = useState([]);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const isAccess = localStorage.getItem('access');

  useEffect(() => {
    // If the user is already logged in, redirect to the homepage
    if (isAccess) {
      navigate('/');
    }
  }, [isAccess, navigate]);


  useEffect(() => {
        axios
          .get('https://puredrive.onrender.com/vehicleapp/brands/')
          .then((response) => {
            // Modify the data received from the backend to have primary key as "value"
            const modifiedBrands = response.data.map((brand) => ({
              value: brand.id,
              label: brand.name,
            }));
            setBrands(modifiedBrands);
          })
          .catch((error) => {
            console.error(error);
          });

      setDistrictChoices([
        'Ernakulam',
        'Kannur',
        'Kollam',
        'Kozhikode',
        'Palakkad',
        'Thiruvananthapuram',
        'Wayanad',
        'Alappuzha',
        'Idukki',
        'Kasaragod',
        'Kottayam',
        'Malappuram',
        'Pathanamthitta',
        'Thrissur',
      ]);
  
      setStateChoices([
        'Kerala', // Add more state options if needed
      ]);

      setCountryChoices([
        'India',
      ]);


  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'brand') {
      // Use the primary key (pk) of the selected brand instead of the name
      setFormData({ ...formData, [id]: value });
    } else if (id === 'district' || id === 'state' || id === 'country') {
      setFormData({ ...formData, [id]: value.toLowerCase() });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };


   

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  

    setIsLoading(true);

    try {
      // Attempt to make the asynchronous API call
      const response = await axios.post("https://puredrive.onrender.com/userapp/otp/", formData);
      // If the API call succeeds, the following code will be executed
      console.log(response.data, '----------------------dlrrrrrrr=======');
      setData(response.data);
      setIsLoading(false);

    
    } catch (error) {
      // If there's an error during the API call, this code block will be executed
      // Handle registration error
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration unsuccessful");
      }
      console.error(error);
    }
  };
  


  // const handleOtp = (e) => {
  //   e.preventDefault();
  //         axios.post('https://puredrive.onrender.com/userapp/dealer/', formData)
  //         .then((response) => {
  //         toast.success('Registration successful');
  //         navigate('/dealer_redirect')
  //       })
  //       .catch((error) => {
  //         // Handle registration error
  //         if (error.response && error.response.data) {
  //           toast.error(error.response.data.message);
  //         } else {
  //           toast.error('Registration unsuccessful');
  //         }
  //         console.error(error);
  //       });
  //   };

  return (
    <>
      <Navbar />
      {data && <Modalglobal data={data}/>}
      <div className="bg-dealer">
        <form className="min-h-screen " onSubmit={handleSubmit}>
          <div className="container mx-auto h-full flex justify-center items-center">
            {isLoading ? <Loader/> :(  
            <div className="w-full max-w-md rounded-lg shadow-2xl p-8 my-32 ">
              <h3 className="text-3xl font-bold text-indigo-900 mb-6 text-center">Dealer Information</h3>

              <div className="mb-4">
                <label className="block text-black text-lg font-bold mb-2" htmlFor="username">
                  Dealer Name (Username)
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-lg"
                  placeholder="Dealer Name"
                  onChange={handleChange}
                required/>
              </div>

              <div className="mb-4">
                <label className="block text-black text-lg font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-lg"
                  placeholder="Email"
                  onChange={handleChange}
                required/>
              </div>

              <div className="mb-4">
                <label className="block text-black text-lg font-bold mb-2" htmlFor="brand">
                  Brand
                </label>
                <select
                  id="brand"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-lg"
                  onChange={handleChange}
                required>
                  <option value="">Select a brand</option>
                  {brands.map((brand) => (
                    <option key={brand.value} value={brand.value}>
                      {brand.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-black text-lg font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-lg"
                  placeholder="Password"
                  onChange={handleChange}
                required/>
              </div>

              <div className="mb-4">
                <label className="block text-black text-lg font-bold mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-lg"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                required/>
              </div>

              <h3 className="text-4xl font-bold text-black mb-6 mt-12 text-center">Contact Details</h3>
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="website">
                  Company Website
                </label>
                <input
                  type="text"
                  id="website"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-lg"
                  placeholder="Company Website"
                  onChange={handleChange}
                required/>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-lg"
                  placeholder="Address"
                  onChange={handleChange}
                required/>
              </div>

              <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-black text-lg font-bold mb-2" htmlFor="district">
                  District
                </label>
                <select
                  id="district"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-lg"
                  onChange={handleChange}
                required>
                  <option value="">Select a district</option>
                  {districtChoices.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-black text-lg font-bold mb-2" htmlFor="state">
                  State
                </label>
                <select
                  id="state"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-lg"
                  onChange={handleChange}
                required>
                  <option value="">Select a state</option>
                  {stateChoices.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="pin_code">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="pin_code"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-lg"
                    placeholder="Zip Code"
                    onChange={handleChange}
                  required/>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-black text-lg font-bold mb-2" htmlFor="state">
                  Country
                </label>
                <select
                  id="country"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-lg"
                  onChange={handleChange}
                required>
                  <option value="">Select a Country</option>
                  {countryChoices.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>        
              

              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="field_experience">
                  How long have you been in Business?
                </label>
                <input
                  type="text"
                  id="field_experience"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-lg"
                  placeholder="No. of years in the field"
                  onChange={handleChange}
                required/>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="num_staff">
                  Sales and service representatives count
                </label>
                <input
                  type="text"
                  id="num_staff"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-lg"
                  placeholder="Count"
                  onChange={handleChange}
                required/>
              </div>

              
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="sales_contact_no">
                    Contact to Sales Head
                  </label>
                  <input
                    type="number"
                    id="sales_contact_no"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-lg"
                    placeholder="Phone Number"
                    onChange={handleChange}
                  required/>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="service_contact_no">
                    Contact to Service Head
                  </label>
                  <input
                    type="number"
                    id="service_contact_no"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-lg"
                    placeholder="Phone Number"
                    onChange={handleChange}
                  required/>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-indigo-500 text-white py-3 px-6 rounded-lg hover:bg-indigo-600 text-xl font-bold"
                >
                  Register
                </button>
              </div>

              <p className="text-xl text-center mt-4 text-gray-700">
                Have an account? <a href="/" className="text-blue-500 font-medium hover:underline">Login here</a>
              </p>
            </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default DealerRegister;
  