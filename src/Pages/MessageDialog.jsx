import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import axiosInstance from "../api/apiconfig";

export function MessageDialog({ booking, fetchUserBookings }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  const [review, setReview] = React.useState("");

  const handleSubmit = async () => {
    if (review.trim() !== "") {
      try {
        console.log((booking));
        const response = await axiosInstance.patch(`vehicleapp/testride/${booking.id}/`, { review });
        // Handle the response if needed
        handleOpen();
        fetchUserBookings();
        toast.success("Review submitted successfully");

      } catch (error) {
        // Handle errors if any
        toast.error("An error occurred");
        console.log(console.error);
      }
    } else {
      toast.error("Please enter a valid review.");
    }
  };

  return (
    <>

      <Button onClick={handleOpen} style={{ fontSize: '60.5%', fontWeight: "50%", backgroundColor: "green", color: "white" }}>FeedBack</Button>
      <Dialog open={open} handler={handleOpen} >
        <div className="flex items-center justify-between">
          <DialogHeader>Leave a Feedback</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-8 w-8" // Increase the h-8 and w-8 values for larger size
            onClick={handleOpen}
            style={{ transform: "scale(1.15)" }} // Adjust the scale factor as needed
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>

        </div>
        <DialogBody divider>
          <div className="grid gap-6">
            <Textarea
              label="Message"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              style={{ fontSize: '16px' }}
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen} style={{ fontSize: "110%" }}>
            Close
          </Button>
          <Button variant="outlined" color="" onClick={handleSubmit} style={{ fontSize: "110%" }}>
            Submit
          </Button>
        </DialogFooter>
      </Dialog>

    </>
  );
}
