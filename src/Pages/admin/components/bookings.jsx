import { Card, Typography, Button , Dialog, // Import the Dialog component
DialogHeader,
DialogBody,
DialogFooter, } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";

import { SidebarWithSearch } from "./sidebar";
import React, { useState, useEffect } from 'react';
import axiosInstance from "../../../api/apiconfig";

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookingForReview, setSelectedBookingForReview] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState('');



  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (review) => {
    setSelectedBookingForReview(review);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBookingForReview(null); 
    setIsModalOpen(false);
  };

  async function fetchData() {
    try {
      const bookingsData = await fetchBookings();
      setBookings(bookingsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }

  async function fetchBookings() {
    try {
      const response = await axiosInstance.get('/adminapp/testride/');
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }
  }

  console.log("bookings",bookings);
  console.log(selectedBookingForReview,"review selected"); // Set the selected review

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <SidebarWithSearch />
      <div className="mt-4 -ml-20 w-3/4">
        <Card className="w-auto h-auto overflow-scroll ml-48 my-20 card-container">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <Typography
                  variant="small"
                  color="black"
                  className="font-extrabold leading-none opacity-70 content-center mb-10 my-5"
                  style={{ fontSize: '200.5%' }}
                >
                  Bookings
                </Typography>
              </tr>
            </thead>
            <thead>
              <tr>
                {["Reference -Status ", "Brand & Model", "Date & Time", "Dealer" ,"Customer Email","Feedback"].map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70" style={{ fontSize: '120.5%' }}>
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map(({ booking_reference, booking_status, brand, model_name, date, time, dealer, dealer_email, customer_name ,customer_email,customer_phone,review}, index) => {
                const classes = "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={booking_reference}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className={`font-bold ${booking_status === "Completed" ? 'text-green-500' : booking_status === "Cancelled" ? 'text-red-500' : ''}`} style={{ fontSize: '137.5%' }}>
                        {booking_reference} - 
                        {booking_status}
                      </Typography>
                    </td>
                    {/* <td className={classes}>
                    <Typography variant="small" color="blue-gray" className={`font-bold ${booking_status === "Completed" ? 'text-green-500' : booking_status === "Cancelled" ? 'text-red-500' : ''}`} style={{ fontSize: '137.5%' }}>
                        {booking_status}
                      </Typography>
                    </td> */}
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal" style={{ fontSize: '137.5%' }}>
                        {brand} - {model_name}
                      </Typography>
                    </td>
                    {/* <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal" style={{ fontSize: '137.5%' }}>
                        {model_name}
                      </Typography>
                    </td> */}
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal" style={{ fontSize: '137.5%' }}>
                        {date}-{time}
                      </Typography>
                    </td>
                    {/* <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal" style={{ fontSize: '137.5%' }}>
                        {time}
                      </Typography>
                    </td> */}
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal" style={{ fontSize: '137.5%' }}>
                        {dealer}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography as="a" href="#" variant="small" color="blue" className="font-semibold" style={{ fontSize: '137.5%' }}>
                        {customer_email}
                      </Typography>
                    </td>
                    {review ? <>
                      <td className={classes}>
                      <Typography as="a" href="#" variant="small" color="blue" className="font-semibold" style={{ fontSize: '137.5%' }}>
                      <Button
                        className="flex items-center gap-3 font-bold text-black "
                        color="blue"
                        size="lg"
                        onClick={() => openModal(review)}
                      >
                        View Feedback
                      </Button>
                      </Typography>
                    </td>
                    </>:
                    <>
                    </>
                    }
                  </tr>
                );
              })}
            </tbody>
          </table>

        </Card>
      </div>
      {selectedBookingForReview && (
        <Dialog
        open={isModalOpen}
        onClose={closeModal}
        size="sm" // Change this to "xl" for extra-large size
      >
        <DialogHeader>Testride Feedback</DialogHeader>
        <DialogBody divider className="mr-1 text-2xl">
          {/* Display the review content here */}
          {selectedBookingForReview}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={closeModal}
            className="mr-1 text-lg"
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
      
      )}
    </div>
  );
}
