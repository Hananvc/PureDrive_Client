import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';



const DealerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [role, setRole] = useState('');

  const navigate = useNavigate();
  const isAccess = localStorage.getItem('access');

  useEffect(() => {
    // If the user is already logged in, redirect to the homepage
    if (isAccess) {
      navigate('/');
    }
  }, [isAccess, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const role="dealer";
    try {
      // console.log("roles----",email,password,role,"************");
      const response = await axios.post('http://127.0.0.1:8000/userapp/login/', { email, password,  role });
      console.log(response.data.refresh, '-------token-------------------');
      localStorage.setItem('refresh', response.data.refresh);
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('id', response.data.user.id);

      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log('Successfully authenticated!');
      toast.success("Successfully authenticated")
      navigate('/');
    } catch (error) {
      console.error('Authentication failed:', error.response.data.message);
      toast.warn("Authentication failed")
    }
  };

  return (
    <>
      {isAccess ? (
        navigate('/')
      ) : (
        <>
          <Navbar/>
          <div className="h-screen flex items-center justify-center bg-image ">
            <div className="container mx-auto px-4 ">
              <div className="max-w-2xl mx-auto rounded-lg overflow-hidden">
                <div className="py-8 px-6 mt-20">
                  <h1 className="text-4xl font-bold mb-8 text-center">Dealer Login</h1>

                  <div className="">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-8 ">
                        <label htmlFor="typeEmailX" className="block mb-4 text-xl font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          id="typeEmailX"
                          className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none text-xl"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-8">
                        <label htmlFor="typePasswordX" className="block mb-4 text-xl font-medium text-gray-700">
                          Password
                        </label>
                        <input
                          type="password"
                          id="typePasswordX"
                          className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none text-xl"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        {/* <input
                          type="hidden"
                          id="typeEmailX"
                          className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none text-xl"
                          value="user"
                          onChange={(e) => setRole(e.target.value)}
                          required
                        /> */}
                      </div>
                      <p className="text-lg mb-6">
                        <a href="#!" className="text-gray-500 hover:underline">
                          Forgot password?
                        </a>
                      </p>
                      <div className="flex justify-center">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-blue-600 focus:outline-none"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="text-center mt-8">
                    <p className="text-lg text-gray-500 mb-6">
                      Don't have an account?{' '}
                      <a href="/user_register" className="text-blue-500 font-medium hover:underline">
                        Sign Up
                      </a>
                    </p>

                    <p className="text-lg text-gray-500 mb-6">
                      Are you a dealer?{' '}
                      <a href="/dealer_register" className="text-blue-500  font-bold hover:underline">
                        Register Here.
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer/>
        </>
      )}
    </>
  );
};

export default DealerLogin;
