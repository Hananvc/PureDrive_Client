import React, { useState, useEffect } from 'react';
import { Card, Typography, Button ,Dialog, // Import the Dialog component
DialogHeader,
DialogBody,
DialogFooter} from "@material-tailwind/react";
import axiosInstance from "../api/apiconfig";
import '../styles/test.css';
import { toast } from 'react-toastify';

export function DealerBookingCard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedDropdownIndex, setSelectedDropdownIndex] = useState(null);
  const [selectedBookingForReview, setSelectedBookingForReview] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState('');




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

  const handleStatusChange = (index, value) => {
    setSelectedStatuses((prevStatuses) => {
      const newStatuses = [...prevStatuses];
      newStatuses[index] = value;
      return newStatuses;
    });

    if (value === 'Quit') {
      setSelectedDropdownIndex(null); // Reset selected index on 'Quit'
    } else {
      setSelectedDropdownIndex(index); // Update selected index
    }
  };

  const handleQuit = () => {
    setSelectedDropdownIndex(null);
    setSelectedStatuses(new Array(bookings.length).fill(''));
  }

  useEffect(() => {
    fetchDealerBookings();
  }, []);

  console.log("bookingdata", bookings);
  async function fetchDealerBookings() {
    try {
      const response = await axiosInstance.get("vehicleapp/dealer-bookings/"); // Replace with your dealer bookings API endpoint
      setBookings(response.data);
      setLoading(false);
      console.log(bookings, "these are booking detailsss+");
    } catch (error) {
      console.error("Error fetching dealer bookings:", error);
      setLoading(false);
    }
  }
  const ChangeStatus = async (bookingId, newStatus) => {
    try {
      const response = await axiosInstance.put(`vehicleapp/change-booking-status/${bookingId}/`, {
        status: newStatus
      });
      // Assuming you want to update the UI after successfully changing the status
      // You can fetch the updated bookings here
      fetchDealerBookings();
      handleQuit();
      toast.success("Status Changed Successfully");
    } catch (error) {
      console.error("Error changing booking status:", error);
      // Handle error
    }
  };

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
                  {["Booking Reference", "Customer Name", "E-mail", "Phone No.", "Vehicle Model", "Date & Time", "Action","", "Review"].map((head) => (
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
              {bookings.map((booking, index) => (
                <tr key={booking.booking_reference}>
                  <td className="p-4 border-b border-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className={`font-bold ${booking.booking_status === "Completed" ? 'text-green-500' : booking.booking_status === "Cancelled" ? 'text-red-500' : ''}`} style={{ fontSize: '125.5%' }}>
                    {booking.booking_reference} - {booking.booking_status} 
                  </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal ml-10" style={{ fontSize: '125.5%' }}>
                      {booking.customer_name}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal -ml-12" style={{ fontSize: '125.5%' }}>
                      {booking.customer_email}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal" style={{ fontSize: '125.5%' }}>
                      {booking.customer_phone}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal ml-12" style={{ fontSize: '125.5%' }}>
                      {booking.model_name}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal -ml-12" style={{ fontSize: '125.5%' }}>
                      {booking.date} {booking.time}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {booking.booking_status !== "Cancelled" && booking.booking_status !== "Completed" && (
                      <select
                        value={selectedStatuses[index]}
                        onChange={(e) => handleStatusChange(index, e.target.value)}
                        className="mt-2 p-2 border rounded"
                        disabled={selectedDropdownIndex !== null && selectedDropdownIndex !== index}
                      >
                        <option value="Pending" className='mt-4 text-lg'>Pending</option>
                        <option value="Completed" className='mt-4 text-lg'>Completed</option>
                        <option value="Cancelled" className='mt-4 text-lg'>Cancel</option>
                      </select>
                    )}
                    {booking.booking_status === "Completed" && (<>
                      <span className="mt-12 text-lg text-green-900 font-bold">Completed </span>
                      <i class="fa fa-check fa-lg" aria-hidden="true"></i>
                      </>
                    )}
                    {booking.booking_status === "Cancelled" && (
                      <span className="mt-12 text-lg text-red-500 font-extrabold">CANCELLED</span> 
                    )}
                    {selectedDropdownIndex !== null && selectedDropdownIndex === index ? 
                      <>
                        <button onClick={handleQuit} className='ml-4 text-lg font-bold text-orange-900'>Quit Dropdown</button>
                      </> :
                      <>
                      </>}
                  </td>

                  <td className="p-4 border-b border-blue-gray-50">
                    {selectedDropdownIndex === index ? (
                      <Typography variant="small" color="blue-gray" className="font-normal" style={{ fontSize: '125.5%' }}>
                        <Button className="flex items-center gap-3 font-bold text-black" color="red" size="lg" onClick={() => ChangeStatus(booking.id, selectedStatuses[index])}>
                          Submit
                        </Button>
                      </Typography>
                    ) : null}
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
