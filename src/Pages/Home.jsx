import Hero from "../components/Hero";
import React, { useState, useEffect } from 'react';

import BookCar from "../components/BookCar";
import PlanTrip from "../components/PlanTrip";
import PickCar from "../components/PickCar";
import Banner from "../components/Banner";
import ChooseUs from "../components/ChooseUs";
import Testimonials from "../components/Testimonials";
import Faq from "../components/Faq";
import Download from "../components/Download";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/sizing.css";
import axiosInstance from "../api/apiconfig";
import axiosInstanceWithoutAuth from "../api/apiconfig";


function Home() {
  const [allData, setallData] = useState([]);
  const Access = localStorage.getItem('access');
  const userData = JSON.parse(localStorage.getItem('user'));
  const [news, setNews] = useState([]);


  useEffect(() => {
    fetchData();
    axiosInstance.get('vehicleapp/cached-news/')
            .then(response => {
                setNews(response.data);
            })
            .catch(error => {
                console.error('Error fetching cached news data:', error);
            });
  }, []);

  async function fetchData() {
    try {
      const vehiclesData = await fetchalldata();
      setallData(vehiclesData);
    
    } catch (error) {
      console.error('Error fetching data:', error);
      
    }
  }
  async function fetchalldata() {
    try {
      const response = await axiosInstance.get('/vehicleapp/vehicle/');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }
  console.log("vehicle data is ", allData);
  console.log("news data loaded as ", news);
  return (
    

    <>
  
      <Navbar/>
      <Hero />

      <BookCar />
      <PlanTrip />
      <PickCar allData={allData} />
      {/* <Banner /> */}
      <ChooseUs />
      <Testimonials />
      <Faq />
      <Download />
      <Footer />
      <ToastContainer/>
   
    </>
  );
}

export default Home;
