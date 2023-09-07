


import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import Navbar from "../components/Navbar";
import axios from 'axios';
import axiosInstance from "../api/apiconfig";
import ProfileUpdateMdl from './ProfileModal';
import { BookingCard } from './userbookinglist';
import { DealerBookingCard } from './dealerbookinglist';


export function Profile() {

  const [modal, setModal] = useState(false);
  const [profile, setProfile] = useState(null);
  
  
  const closeModal = () => {
    setModal(false);
  };


  const openModal = (profile) => {
    setProfile(profile);
    setModal(true);
  };

  const user_id = localStorage.getItem('id');
  const [userData, setUserdata] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);
  

  const handleProfileUpdate = async () => {
    
    try {
      const response = await axiosInstance.get(`/userapp/user/${user_id}/`);

      setUserdata(response.data);
    } catch (error) {
      console.error('Error fetching updated user data:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get(`/userapp/user/${user_id}/`);
      setUserdata(response.data);
      console.log(response.data, "ppppppppppppppppppppppppppppppppppppp");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
    
  
  return (
    <>
    <Navbar/>
    <ProfileUpdateMdl isVisible={modal} onClose={closeModal} profilee={user_id}  onProfileUpdate={handleProfileUpdate}  />
    {/* Profile Picture Section */}
    <section className="relative block h-[60vh]">
      <div className="bg-profile-background absolute top-0 h-full w-full  bg-[url('https://images.unsplash.com/photo-1625062516295-5169c87de09d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80')]  bg-center" />
      <div className="absolute top-0 h-full w-full bg-black/25 bg-cover bg-center" />
    </section>
  
    {/* User Profile Section */}
    <section className="relative bg-blue-gray-50/50 py-20 px-8">
      <div className="container mx-auto">
        <div className="relative mb-10 -mt-64 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
          <div className="px-12">
            <div className="flex flex-wrap justify-center">
              {/* User Profile Picture */}
              <div className="flex w-full justify-center px-8 lg:order-2 lg:w-4/12">
                <div className="relative">
                  <div className="-mt-32 w-48">
                    <Avatar
                      src={userData.profile_image}  
                      alt="Profile picture"
                      variant="circular"
                      className="h-full w-full shadow-xl"
                    />
                  </div>
                </div>
              </div>
  
              {/* Connect Button */}
              <div className="mt-16 flex w-full justify-center px-8 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                <Button className="bg-blue-400 text-lg" onClick={() => openModal(userData)}>Edit profile</Button>
              </div>
  
              {/* User Profile Information */}
              <div className="w-full px-12 lg:order-1 lg:w-4/12">
                <div className="flex justify-center py-6 pt-12 lg:pt-6">
                  
                  <div className="mr-6 p-4 text-center">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold text-xl uppercase"
                    >
                      {/* 22 */}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500 text-lg"
                    >
                      {/* Friends */}
                    </Typography>
                  </div>
  
               
                  <div className="mr-6 p-4 text-center">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold text-xl uppercase"
                    >
                      {/* 10 */}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500 text-lg"
                    >
                      {/* Photos */}
                    </Typography>
                  </div>
  
                  <div className="p-4 text-center lg:mr-6">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold text-xl uppercase"
                    >
                      {/* 89 */}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500 text-lg"
                    >
                      {/* Comments */}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
  
            {/* User Profile Details */}
            <div className="my-12 text-center">
              <Typography variant="h2" color="blue-gray" className="mb-4 text-4xl">
                {userData.username}
              </Typography>
              <div className="mb-4 flex items-center justify-center gap-2">
                <i class="fa fa-lg fa-envelope" aria-hidden="true"></i>
                <Typography className="font-medium text-blue-gray-700 text-xl">
                {userData.email}
                </Typography>
              </div>
              <div className="mb-16 flex items-center justify-center gap-2">
                <i class="fa-lg fa fa-phone" aria-hidden="true"></i>
                <Typography className="font-medium text-blue-gray-700 text-xl">
                {userData.phone}
                </Typography>
              </div>
              {/* <div className="mb-4 flex items-center justify-center gap-2">
                <BriefcaseIcon className="-mt-px h-6 w-6 text-blue-gray-700" />
                <Typography className="font-medium text-blue-gray-700 text-xl">
                </Typography>
              </div>
              <div className="mb-4 flex items-center justify-center gap-2">
                <BuildingLibraryIcon className="-mt-px h-6 w-6 text-blue-gray-700" />
                <Typography className="font-medium text-blue-gray-700 text-xl">
                </Typography>
              </div> */}
            </div>
  
            {/* Profile Description */}
            {/* <div className="mb-16 border-t border-blue-gray-50 py-8 text-center">
              <div className="mt-4 flex flex-wrap justify-center">
                <div className="flex w-full flex-col items-center px-12 lg:w-10/12">
                  <Typography className="mb-8 font-normal text-blue-gray-500 text-lg">
                    An artist of considerable range, Jenna the name taken by
                    Melbourne-raised, Brooklyn-based Nick Murphy writes,
                    performs and records all of his own music, giving it a
                    warm, intimate feel with a solid groove structure. An
                    artist of considerable range.
                  </Typography>
                  <Button variant="text" className="text-xl">
                    Show more
                  </Button>
                </div>
              </div>
            </div> */}
          </div>
          {userData.is_dealer ? <DealerBookingCard/> :  <BookingCard/>}  

          
        </div>
       
      </div>
     
    </section>
    
    <div className="bg-blue-gray-50/50"></div>
    
  </>
  
  );
}

export default Profile;