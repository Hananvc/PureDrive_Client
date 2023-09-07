import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from '../components/modal';
import Navbar from '../components/Navbar';
import '../styles/login.css';
import Loader from './loader';

const UserRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [data, setData] = useState();
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setRegistrationStatus('Passwords do not match');
      return;
    }

    setIsLoading(true);
    // Send POST request to register user
    console.log(formData, '-------------------------data-----------------------');
    axios
      .post('https://puredrive.onrender.com/userapp/otp/', formData)
      .then((response) => {
        // Handle successful registration
        // setRegistrationStatus('Registration successful');
        // toast.success("Registration successful")
        setData(response.data);
        console.log(data,'---------------------=================data========');
        setIsLoading(false);
        // navigate('/'); // Navigate to login page
      })
      .catch((error) => {
        // Handle registration error
        if (error.response && error.response.data) {
          setRegistrationStatus(error.response.data.message);
        } else {
          setRegistrationStatus('Registration unsuccessful');
        }
        console.error(error);
      });
  };
  console.log('data=', data);
  return (
    <>
    <Navbar/>
    {data && <Modal data={data}/>}
<section className="h-screen flex items-center justify-center bg-image ">
  {isLoading ? <Loader/> :(
  <div className="container mx-auto px-4">
    <div className="max-w-xl mx-auto rounded-lg overflow-hidden w-full"> {/* Adjust max-w-xl and add w-full class */}
      <div className="py-12 px-6 mt-28 "> {/* Increase py value to move the heading down */}
        <h2 className="text-4xl font-bold mb-8 text-center">Create an account</h2>

        {registrationStatus && (
          <div className={registrationStatus.includes('already exists') ? 'text-red-500' : 'text-green-500'}>{registrationStatus}</div>
        )}


        
          <>
          <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label htmlFor="name" className="block mb-2 text-xl font-medium text-gray-700">
              Your Name
            </label>
            <input type="text" id="username" className="text-xl w-screen px-6 py-4 border border-gray-300 rounded-lg focus:outline-none" onChange={handleChange} required /> {/* Use w-screen class */}
          </div>

          <div className="mb-8">
            <label htmlFor="email" className="block mb-2 text-xl font-medium text-gray-700">
              Your Email
            </label>
            <input type="email" id="email" className="text-xl w-screen px-6 py-4 border border-gray-300 rounded-lg focus:outline-none" onChange={handleChange} required /> {/* Use w-screen class */}
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="block mb-2 text-xl font-medium text-gray-700">
              Password
            </label>
            <input type="password" id="password" className="text-xl w-screen px-6 py-4 border border-gray-300 rounded-lg focus:outline-none" onChange={handleChange} required /> {/* Use w-screen class */}
          </div>

          <div className="mb-8">
            <label htmlFor="confirmPassword" className="block mb-2 text-xl font-medium text-gray-700">
              Repeat your password
            </label>
            <input type="password" id="confirmPassword" className="text-xl w-screen px-6 py-4 border border-gray-300 rounded-lg focus:outline-none" onChange={handleChange} required /> {/* Use w-screen class */}
          </div>

          <div className="flex items-center justify-center">
            <button type="submit" className="px-6 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:outline-none text-xl"> {/* Increase text-xl */}
              Register
            </button>
          </div>
        </form>
        </>
        <p className="text-xl text-center mt-6"> {/* Increase text-xl */}
          Delear Registration? <Link type="button" to="/dealer_register" className="text-white font-bold" style={{ color: '#fff', textDecoration: 'none' }} onMouseOver={(e) => (e.target.style.color = '#ff7f71')} onMouseOut={(e) => (e.target.style.color = '#fff')}>Click Here.</Link>
        </p>
        <p className="text-xl text-center mt-2"> {/* Increase text-xl */}
          Have an account? <a
                             href="/login"
                             className="text-white font-bold"
                             style={{ color: '#fff', textDecoration: 'none' }}
                             onMouseOver={(e) => (e.target.style.color = '#ff7f71')}
                             onMouseOut={(e) => (e.target.style.color = '#fff')}
                           >
                             Login here
                           </a>
        </p>
        
      </div>
    </div>
  </div>
  )}
</section>


    </>
  );
};

export default UserRegister;