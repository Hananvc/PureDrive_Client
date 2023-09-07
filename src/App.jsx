import "../src/dist/styles.css";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Models from "./Pages/Models";
import TestimonialsPage from "./Pages/TestimonialsPage";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";
import Login from "./Pages/login";
import UserRegister from "./Pages/User_Register";
import DealerRegister from "./Pages/dealer_register";
import DealerRedirect from "./Pages/dealer_redirect";
import Profile from "./Pages/profile";
import ProfileUpdateMdl from "./Pages/ProfileModal";
import Loader from "./Pages/loader";
import VehicleSingleView from "./Pages/VehicleSingleView";
import EVNewsFeed from "../src/Pages/EVNewsFeed";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toast.css';
import AdminLogin from "./Pages/admin/AdminLogin";
import DealerLogin from "./Pages/DealerLogin";
import AdminDash from "./Pages/admin/AdminDash";
import { Category } from "./Pages/admin/components/category";
import { Brand } from "./Pages/admin/components/Brand";
import { Vehicle } from "./Pages/admin/components/vehicle";
import { Bookings } from "./Pages/admin/components/bookings";
import AdminProfile from "./Pages/admin/components/AdminProfile";

import { BookingCard } from "./Pages/userbookinglist";
import { MessageDialog } from "./Pages/MessageDialog";
import Users from "./Pages/admin/components/users";
import Dealers from "./Pages/admin/components/dealers";
import News from "./Pages/admin/components/News";
import { Images } from "./Pages/admin/components/images";
import { Variants } from "./Pages/admin/components/variants";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { Loginloader } from "./Pages/loginloader";

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/models" element={<Models />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        {/* <Route path="/team" element={<Team />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user_register" element={<UserRegister />} />
        <Route path="/dealer_register" element={<DealerRegister />} />
        <Route path="/dealer_redirect" element={<DealerRedirect />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profilemodal" element={<ProfileUpdateMdl/>} />
        <Route path="/loader" element={<Loader/>} />
        <Route path="/loginloader" element={<Loginloader/>} />
        <Route path="/test" element={<BookingCard/>} />
        <Route path="/vehicle/:id" element={<VehicleSingleView />} />
        <Route path="/news" element={<EVNewsFeed/>} />
        <Route path="/dealerlogin" element={<DealerLogin/>} />
        <Route path="/adminlogin" element={<AdminLogin/>} />


        <Route path="/AdminDash" element={<ProtectedRoute><AdminDash/></ProtectedRoute>} />
        <Route path="/AdminCategory" element={<ProtectedRoute><Category/></ProtectedRoute>} />
        <Route path="/AdminBrand" element={<ProtectedRoute><Brand/></ProtectedRoute>} />
        <Route path="/AdminVehicle" element={<ProtectedRoute><Vehicle/></ProtectedRoute>} />
        <Route path="/AdminBookings" element={<ProtectedRoute><Bookings/></ProtectedRoute>} />
        <Route path="/AdminProfile" element={<ProtectedRoute><AdminProfile/></ProtectedRoute>} />
        <Route path="/Adminusers" element={<ProtectedRoute><Users/></ProtectedRoute>} />
        <Route path="/Admindealers" element={<ProtectedRoute><Dealers/></ProtectedRoute>} />
        <Route path="/Adminnews" element={<ProtectedRoute><News/></ProtectedRoute>} />
        <Route path="/Adminimages" element={<ProtectedRoute><Images/></ProtectedRoute>} />
        <Route path="/Adminvariants" element={<ProtectedRoute><Variants/></ProtectedRoute>} />





        <Route path="/MessageDialog" element={<MessageDialog/>} />




      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
