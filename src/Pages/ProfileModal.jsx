// import React, { useState } from 'react';

// function Test() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleToggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   return (
//     <>
//       <button
//         onClick={handleToggleModal}
//         className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         type="button"
//       >
//         Toggle modal
//       </button>

//       {isModalOpen && (
//         <div
//           id="authentication-modal"
//           tabIndex="-1"
//           aria-hidden="true"
//           className="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
//         >
//           <div className="relative max-w-3xl w-full p-6 overflow-x-hidden overflow-y-auto md:inset-0">
//             {/* Modal content */}
//             <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
//               <button
//                 onClick={handleToggleModal}
//                 type="button"
//                 className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg w-10 h-10 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                 data-modal-hide="authentication-modal"
//               >
//                 <svg
//                   className="w-4 h-4"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 14 14"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                   />
//                 </svg>
//                 <span className="sr-only">Close modal</span>
//               </button>
//               <div className="px-8 py-6 lg:px-10">
//                 <h3 className="mb-6 text-2xl font-medium text-center text-gray-900 dark:text-white">
//                   OTP Verification
//                 </h3>
//                 <form className="space-y-6" action="#">
//                   <div>
//                     <label
//                       htmlFor="otp"
//                       className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
//                     >
//                       Enter your OTP here
//                     </label>
//                     <input
//                       type="text"
//                       name="otp"
//                       id="otp"
//                       className="bg-gray-50 border border-gray-300 text-lg text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
//                       placeholder="Enter OTP"
//                       required
//                     />
//                   </div>
//                   <div className="flex justify-between space-x-4">
//                     <button
//                       type="submit"
//                       className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                     >
//                       Submit
//                     </button>
//                     <button
//                       type="button"
//                       className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-lg px-6 py-3 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
//                     >
//                       Resend OTP
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Test;


import { Avatar, Button, Input } from '@material-tailwind/react';
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import axiosInstance from '../api/apiconfig';
import { ToastContainer, toast } from 'react-toastify';
import "../styles/profileloader.css";

function ProfileUpdateMdl({ isVisible, onClose, profilee, onProfileUpdate }) {
  const [modal, setModal] = useState(false);
  const [profile, setProfile] = useState(null);
  const [userData, setUserData] = useState({});
  const [fullname, setFullname] = useState(profilee?.username ||  '');
  // const [email, setEmail] = useState(profilee?.email || '');
  // const [age, setAge] = useState(profilee?.age  || '');
  const [phoneNumber, setPhoneNumber] = useState(profilee?.phone  || '');
  const [photo, setPhoto] = useState(profilee?.profile_image || null);
  const [newPhoto, setNewPhoto] = useState(null);
  const [loading,isLoading] = useState(false)
  
  const user = JSON.parse(localStorage.getItem('user')).id;
  console.log(user,"--------------user-----------");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/userapp/user/${user}/`);
        setUserData(response.data);
        setFullname(response.data.username  || '');
        setPhoneNumber(response.data.phone  || '');
        // setEmail(response.data.email  || '');
        // setAge(response.data.age  || '');
        setPhoto(response.data.profile_image || '');
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // setError('User not found');
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      isLoading(true);
      const formData = new FormData();
      formData.append('user_id', profilee);
      formData.append('username', fullname);
      // formData.append('email', email);
      formData.append('phone', phoneNumber);
      // formData.append('age', age);

      if (newPhoto) {
        formData.append('profile_image', newPhoto);
      }
      for (var pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
        
      const response = await axiosInstance.patch(`/userapp/user/${user}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      isLoading(false);
      console.log('Profile updated successfully:', response.data);
      onProfileUpdate();
      console.log(response.data);
      onClose();
      toast.success('Profile Updated Successfully');
        // if (response.data.photo) {
        //   localStorage.setItem('userProfileImage', response.data.photo);
        //   console.log(response.data.photo,user);
        // }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setNewPhoto(selectedPhoto);
    setPhoto(URL.createObjectURL(selectedPhoto)); // Generate a temporary URL for the selected image file
  };

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') {
      onClose();
    }
  };

  if (!isVisible || !profilee) return null;

  return (
    <div>
  <div
    id="wrapper"
    className="absolute inset-0 bg-black bg-opacity-25 z-10 backdrop-blur-sm w-full h-full flex justify-center items-center"
    onClick={handleClose}
  >
    <div className="w-[900px] flex flex-col overflow-y-auto h-[650px] opacity-90  ">
      {/* <button className="text-white text-3xl place-self-end" onClick={onClose}>
        x
      </button> */}
      <div className="bg-white p-6 rounded-lg overflow-y-auto my-28">
        <form onSubmit={handleFormSubmit} className="space-y-6 ">
          <Avatar src={photo} alt="Profile Picture" className="w-32 h-32 mb-6  " />
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
          <Input
            type="text"
            placeholder="Fullname"
            className="text-xl px-3 py-2 rounded-lg"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          {/* <Input
            type="text"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          /> */}
          {/* <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> */}
          <Input
            type="text"
            placeholder="Phone Number"
            className="text-xl px-3 py-2 rounded-lg"
            value={phoneNumber}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (/^\d{0,10}$/.test(inputValue)) {
                setPhoneNumber(inputValue);
              }
            }}
          />
          <div className="flex justify-center">
            {loading ? <> 
              <section class="dots-container">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
              </section>
          </> : <>             
            <Button type="submit" className="px-6 py-3">
              Update
            </Button>
            
            <Button type="submit" className="px-6 py-3 bg-gray-500 mx-4 " onClick={onClose}>
              Cancel
            </Button>
            </>}

          </div>
        </form>
      </div>
    </div>
  </div>
</div>

  );
}

export default ProfileUpdateMdl
