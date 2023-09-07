import React, { useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Modal(props) {
  // State to control the visibility of the modal
  const [otp, setOtp] = useState('');

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Function to handle toggling the modal visibility
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Function to handle registration and OTP verification
  const handleregister = async () => {
    try {
      if (otp === props.data.otp) {
        const response = await axios.post('https://puredrive.onrender.com/userapp/signup/', props.data.user);
        localStorage.setItem('refresh', response.data.refresh);
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setIsModalOpen(false); // Close the OTP verification modal
        toast.success('Welcome to PureDrive.');
        navigate('/');
      } else {
        toast.warn('Wrong OTP');
      }
    } catch (error) {
      // Handle registration error
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Registration unsuccessful');
      }
      console.error(error);
    }
  };

  return (
    <>
      {/* Modal Container */}
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ${
          isModalOpen ? 'block' : 'hidden'
        }`}
      >
        {/* Modal Content */}
        <div className="relative max-w-3xl w-full p-6 overflow-x-hidden overflow-y-auto md:inset-0">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={handleToggleModal}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg w-10 h-10 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-8 py-6 lg:px-10">
              <h3 className="mb-6 text-2xl font-medium text-center text-gray-900 dark:text-white">
                OTP Verification
              </h3>
              <form className="space-y-6" action="#">
                <div>
                  <label
                    htmlFor="otp"
                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Enter your OTP here
                  </label>
                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter OTP"
                    required
                  />
                </div>
                <div className="flex justify-between space-x-4">
                  <button
                    type="button"
                    className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-lg px-6 py-3 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    Resend OTP
                  </button>
                  <button
                    type="button"
                    onClick={handleregister}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
