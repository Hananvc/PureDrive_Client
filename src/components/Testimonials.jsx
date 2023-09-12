import axiosInstance from "../api/apiconfig";
import { useState, useEffect } from "react";

function Testimonials() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const reviewsPerPage = 2;
  const isSmallScreen = window.innerWidth <= 768;
  useEffect(() => {
    fetchData();
  }, []);

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

  const handleNextClick = () => {
    const newIndex = startIndex + reviewsPerPage;
    setStartIndex(newIndex >= bookings.length ? 0 : newIndex);
  };

  const handlePrevClick = () => {
    const newIndex = startIndex - reviewsPerPage;
    setStartIndex(newIndex < 0 ? bookings.length - reviewsPerPage : newIndex);
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-content">
          <div className="testimonials-content__title">
            <h4>Reviewed by People</h4>
            <h2>Client's Testimonials</h2>
            <p>
              Discover the positive impact we've made on our clients by
              reading through their testimonials. Our clients have experienced
              our service and results, and they're eager to share their
              positive experiences with you.
            </p>
          </div>

          <div className="all-testimonials">
            {loading ? (
              <p>Loading testimonials...</p>
            ) : (
              bookings
                .slice(startIndex, startIndex + reviewsPerPage)
                .map((booking, index) => (
                  booking.review ? (
                    <div className="all-testimonials__box" key={index}>
                      <span className={`quotes-icon${isSmallScreen ? ' hidden' : ''}`}>
                        <i className="fa-solid fa-quote-right"></i>
                      </span>
                      <p>{booking.review}</p>
                      <div className="all-testimonials__box__name">
                        <div className="all-testimonials__box__name__profile">
                          {/* <img src={booking.user_profile_image} alt="user_img" /> */}
                          <span>
                            <h4 className="font-bold">Customer: {booking.customer_name}</h4>
                            <p>Vehicle: {booking.model_name}</p>
                            <p>Test Ride on: {booking.date}</p>
                            <p>Dealer: {booking.dealer}</p>
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : null
                ))
            )}
          </div>
          <div className="pagination-container flex justify-center items-center">
            <div className="pagination-buttons flex">
              <button onClick={handlePrevClick} className="cta-btn font-bold mr-2">Previous</button>
              <button onClick={handleNextClick} className="cta-btn font-bold">Next</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
