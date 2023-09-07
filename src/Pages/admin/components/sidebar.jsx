import React from "react";
import { Table } from "./table";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../../api/apiconfig";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";

 
export function SidebarWithSearch() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const navigate=useNavigate();
  const userData = JSON.parse(localStorage.getItem('user'));
  // console.log("userdata is",userData)



  const handleCategoryClick = () => {
    navigate('/AdminCategory');
  };
  
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const handleLogout = () => {
    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
    localStorage.removeItem('id');
    localStorage.removeItem('user')
    toast.success('Logout Successful');
    navigate('/adminlogin');
   
  };
 
  return (
    <div className="flex ">
    <Card className=" p-4 shadow-xl shadow-blue-gray-900/5 my-20 bg-blue-gray-200">
      <div className="mb-2 flex items-center gap-4 p-4">
        <img src={`https://puredrive.onrender.com${userData?.profile_image}`} alt="brand" className="h-28 w-25" />
        <Typography variant="h5" color="blue-gray" style={{ fontSize: '137.5%' }}>
         Admin
        </Typography>
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal" style={{ fontSize: '115.5%' }}>
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1" >
            <List className="p-0" style={{ fontSize: '137.5%' }}>
            <Link to="/AdminDash">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Home
              </ListItem>
            </Link>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Reporting
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Projects
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal" style={{ fontSize: '115.5%' }}>
                Operations
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0" style={{ fontSize: '137.5%' }}>
            <Link to="/AdminDealers">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Dealers
              </ListItem>
              </Link>
              <Link to="/Adminusers">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Users
              </ListItem>
              </Link>
            <ListItem onClick={handleCategoryClick}>
              <ListItemPrefix>
                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
              </ListItemPrefix>
              Category
            </ListItem>
            <Link to="/AdminBrand">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Brand
              </ListItem>
            </Link>
            <Link to="/AdminVehicle">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Vehicles
              </ListItem>
            </Link>
            <Link to="/AdminBookings">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Bookings
              </ListItem>
              </Link>
              <Link to="/Adminnews">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                News
              </ListItem>
              </Link>
              <Link to="/Adminimages">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Images
              </ListItem>
              </Link>
              <Link to="/Adminvariants">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Variants
              </ListItem>
              </Link>
            </List>
           
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem style={{ fontSize: '115.5%' }}>
          <ListItemPrefix >
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <Link to="/AdminProfile">
              <ListItem style={{ fontSize: '120.5%' }}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Profile
              </ListItem>
            </Link>
        <ListItem style={{ fontSize: '115.5%' }}>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem style={{ fontSize: '115.5%' }} onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
          {/* <div className="mt-4 -ml-20 w-8/12" >
          <Table/>
      </div> */}
    <ToastContainer/>
  </div>
  );
}