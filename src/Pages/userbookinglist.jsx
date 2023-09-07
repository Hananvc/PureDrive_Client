import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Button,
  Dialog, // Import the Dialog component
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axiosInstance from "../api/apiconfig";
import '../styles/test.css';
import { toast } from 'react-toastify';
import { MessageDialog } from './MessageDialog';


export function BookingCard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookingForReview, setSelectedBookingForReview] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState('');
  

  useEffect(() => {
    fetchUserBookings();
  }, []);

  async function fetchUserBookings() {
    try {
      const response = await axiosInstance.get("vehicleapp/user-bookings/");
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      setLoading(false);
    }
  }
  const handleCancel = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to cancel the test ride Booking?");
    
    if (isConfirmed) {
      try {
        const response = await axiosInstance.put(`vehicleapp/testride-cancel/${id}/`);
        // Handle the response if needed
        console.log("entered axios call");
        toast.success("Request sent successfully ,Booking Cancelled");
        fetchUserBookings();
      } catch (error) {
        // Handle errors if any
        toast.error("An error occurred");
      }
    }
  };

  const openModal = (booking) => {
    setSelectedBookingForReview(booking);
    setSelectedReview(booking.review); // Set the selected review
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBookingForReview(null);
    setSelectedReview(''); // Clear the selected review
    setIsModalOpen(false);
  };
  
  console.log(bookings);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <div className="-ml-24 w-full">
        <Card className="w-auto h-auto overflow-scroll ml-48 my-20 card-container">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <Typography
                  variant="small"
                  color="black"
                  className="font-extrabold leading-none opacity-70 content-center mb-10 my-5 ml-16"
                  style={{ fontSize: '200.5%' }}
                >
                  Test Ride Bookings
                </Typography>
              </tr>
              {bookings.length === 0 ? (
                <Typography variant="small" color="red" className="font-bold ml-16" style={{ fontSize: '137.5%' }}>
                You have no Test Rides Booked.
              </Typography>
              ) : (
              <tr>
                {["Booking Reference", "Brand", "Model Name", "Date", "Time", "Dealer", "Booking Status" , "action","Feedback"].map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70" style={{ fontSize: '120.5%' }}>
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
              )}
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.booking_reference}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-bold" style={{ fontSize: '137.5%' }}>
                      {booking.booking_reference}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal" style={{ fontSize: '137.5%' }}>
                      {booking.brand}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal" style={{ fontSize: '137.5%' }}>
                      {booking.model_name}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal" style={{ fontSize: '137.5%' }}>
                      {booking.date}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal" style={{ fontSize: '137.5%' }}>
                      {booking.time}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal" style={{ fontSize: '137.5%' }}>
                      {booking.dealer}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className={`font-bold ${booking.booking_status === "Completed" ? 'text-green-500' : booking.booking_status === "Cancelled" ? 'text-red-500' : ''}`} style={{ fontSize: '137.5%' }}>
                      {booking.booking_status}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className="font-normal" style={{ fontSize: '137.5%' }}>
                  {booking.booking_status === "Cancelled" ? (
                    <span className="text-red-500">Cancelled</span>
                  ) : (
                    <>
                      {booking.booking_status === "Completed" ? (
                          <>
                          { !booking.review  ? (
                              <MessageDialog
                              open={selectedBookingForReview === booking}
                              fetchUserBookings={fetchUserBookings}
                              booking={booking}
                            />
                          ):(
                            <>
                            <i class="fa fa-check ml-12" aria-hidden="true"></i>
                            </>
                          )
                          
                          }
                          </>

                      ) : (
                        <>
                          <Button
                            className="flex items-center gap-3 font-bold text-black"
                            color="red"
                            size="lg"
                            onClick={() => handleCancel(booking.id)}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </Typography>
                </td>
                      {booking.review ? <>
                        <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className={`font-bold ${booking.booking_status === "Completed" ? 'text-green-500' : booking.booking_status === "Cancelled" ? 'text-red-500' : ''}`} style={{ fontSize: '137.5%' }}>
                      <Button
                        className="flex items-center gap-3 font-bold text-black "
                        color="blue"
                        size="lg"
                        onClick={() => openModal(booking)}
                      >
                        View Feedback
                      </Button>
                    </Typography>
                  </td>
                      </>:<>
                          
                      </>}
                </tr>
              ))}
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
          {selectedBookingForReview.review}
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
