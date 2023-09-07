import React, { useEffect, useState } from "react";
import axiosInstance from "../api/apiconfig";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Pages/loader";
import "../styles/bookingloader.css";

function BookCar() {
  const [brands, setBrands] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [selectedDealerships, setSelectedDealerships] = useState([]);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState({});
  const [modalCarImg, setModalCarImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const Access = localStorage.getItem('access');
  const userData = JSON.parse(localStorage.getItem('user'));




  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const brandsData = await fetchBrands();
      setBrands(brandsData);

    } catch (error) {
      console.error('Error fetching data:', error);

    }
  }

  async function fetchBrands() {
    try {
      const response = await axiosInstance.get('/vehicleapp/brand/');
      return response.data;
    } catch (error) {
      console.error('Error fetching brands:', error);
      return [];
    }
  }
  // console.log("Brands",brands);

  const handleCar = (e) => {
    const selectedBrandName = e.target.value;
    setCarType(selectedBrandName);
    setCarImg(selectedBrandName);

    const selectedBrand = brands.find((brand) => brand.name === selectedBrandName);
    console.log('Selected Brand:', selectedBrand);

    const dealerships = selectedBrand?.dealer.map((dealer) => ({
      dealer_info: dealer.dealer_info,
      user_info: dealer.user_info
    })) || [];
    console.log('Selected Dealerships:', dealerships);



    setSelectedVehicles(selectedBrand?.vehicles || []);
    setSelectedDealerships(dealerships);

  };


  const timeSlots = [];
  for (let hour = 9; hour <= 18; hour++) {
    const formattedHour = hour < 10 ? `0${hour}` : hour;
    timeSlots.push(`${formattedHour}:00`);
  }




  const [modal, setModal] = useState(false);

  const [brand, setCarType] = useState("");
  const [model_name, setPickUp] = useState("");
  const [dealer, setDropOff] = useState("");
  const [date, setPickTime] = useState("");
  const [time, setDropTime] = useState("");
  const [carImg, setCarImg] = useState("");

  const [customer_name, setName] = useState("");
  const [customer_phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [customer_email, setEmail] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [address, setAddress] = useState("");
  // const [city, setCity] = useState("");
  // const [zipcode, setZipCode] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };



  const handlePhone = (e) => {
    setPhone(e.target.value);
  };


  const handleEmail = (e) => {
    setEmail(e.target.value);
  };


  const openModal = (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector(".error-message");
    if (
      model_name === "" ||
      dealer === "" ||
      date === "" ||
      time === "" ||
      brand === "" 
    ) {
      errorMsg.style.display = "flex";
    } else {
      setSelectedBookingDetails({
        brand: brand,
        model_name: model_name,
        dealer: dealer,
        date: date,
        time: time,
        customer_phone: userData.phone,
        customer_email: userData.email,
        customer_name: userData.username
      });
    console.log(selectedBookingDetails,'pppppppppppppppppppppppppp');

      setModal(!modal);
      const modalDiv = document.querySelector(".booking-modal");
      modalDiv.scroll(0, 0);
      errorMsg.style.display = "none";
    }
  };


  useEffect(() => {
    if (modal === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  const confirmBooking = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('vehicleapp/book-testride/', selectedBookingDetails);
      if (response.status === 201) {
        
        setSelectedBookingDetails({});
        setModal(!modal);
        setIsLoading(false);
        toast.success("Booking successful,Check your Email for Confirmation")
        const doneMsg = document.querySelector(".booking-done");
        doneMsg.style.display = "flex";
      }
    } catch (error) {
      // Handle error here, display an error message or take appropriate action
      toast.error("An Error Occured ")
      console.error('Error confirming booking:', error);
    }
  };




  const handlePick = (e) => {
    setPickUp(e.target.value);

    // Find the selected vehicle
    const selectedVehicle = selectedVehicles.find(
      (vehicle) => vehicle.model_name === e.target.value
    );

    // Set the default image URL of the selected vehicle for the modal
    if (selectedVehicle) {
      const absoluteImageUrl = `http://localhost:8000${selectedVehicle.default_image}`;
      setModalCarImg(absoluteImageUrl);
    }
  };






  const handleDrop = (e) => {
    setDropOff(e.target.value);
  };

  const handlePickTime = (e) => {
    setPickTime(e.target.value);
  };

  const handleDropTime = (e) => {
    setDropTime(e.target.value);
  };



  const hideMessage = () => {
    const doneMsg = document.querySelector(".booking-done");
    const test=document.querySelector(".error-message")
    test.style.display= "none"; 
    doneMsg.style.display = "none";
  };

  return (
    <>
    {Access && userData.is_dealer ? <>
      <section id="booking-section" className="book-section">
        <div
          onClick={openModal}
          className={`modal-overlay ${modal ? "active-modal" : ""}`}
        ></div>

        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Booking a Test Ride is only possible through our User Login interface</h2>

              
            </div>
          </div>
        </div>
      </section>
    </>:(
      <>
      <section id="booking-section" className="book-section">
        <div
          onClick={openModal}
          className={`modal-overlay ${modal ? "active-modal" : ""}`}
        ></div>

        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Book a Test Ride</h2>

              <p className="error-message">
                All fields required! <i onClick={hideMessage} className="fa-solid fa-xmark"></i>
              </p>

              <p className="booking-done">
                Check your email to confirm an order.{" "}
                <i onClick={hideMessage} className="fa-solid fa-xmark"></i>
              </p>

              <form className="box-form">
                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-car"></i> &nbsp; Select Your Car
                    Brand <b>*</b>
                  </label>
                  <select value={brand} onChange={handleCar}>
                    <option value="">Select your brand</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.name}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Select the Vehicle{" "}
                    <b>*</b>
                  </label>
                  <select value={model_name} onChange={handlePick}>
                    <option>Select your car</option>
                    {selectedVehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.model_name}>
                        {vehicle.model_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Dealer <b>*</b>
                  </label>
                  <select value={dealer} onChange={handleDrop}>
                    <option value="">Select dealership</option>
                    {selectedDealerships.length === 0 ? (
                      <option value="" disabled>No Dealers Available</option>
                    ) : (
                      selectedDealerships.map((dealer) => (
                        <option key={dealer?.dealer_info?.id} value={dealer?.user_info?.username}>
                          {dealer?.user_info?.username || 'No Dealers Available'} - {dealer?.dealer_info?.district || "No Dealers Available"}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className="box-form__car-time">
                  <label htmlFor="picktime">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Pick-up <b>*</b>
                  </label>
                  <input
                    id="picktime"
                    value={date}
                    onChange={handlePickTime}
                    type="date"
                  ></input>
                </div>
                <div className="box-form__car-type">
                  <label>
                    <i className="fa-regular fa-clock"></i> &nbsp; Select Your Time Slot <b>*</b>
                  </label>
                  <select value={time} onChange={handleDropTime}>
                    <option value="">Select Your Time Slot
                    </option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                {Access ? (
                  <>
                    <button onClick={openModal} type="submit">
                      check availability
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <button className="my-12 mx-8" >
                        Login to check availability
                      </button>
                    </Link>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
      </>
    )}


      <div className={`booking-modal ${modal ? "active-modal" : ""}`}>
        {/* title */}
        <div className="booking-modal__title">
          <h2>Complete Test Ride Booking</h2>
          <i onClick={openModal} className="fa-solid fa-xmark"></i>
        </div>
        {/* message */}
        <div className="booking-modal__message">
          <h4>
            <i className="fa-solid fa-circle-info"></i> Upon completing this
            reservation enquiry, you will receive:
          </h4>
          <p>
            An email to produce on arrival to take a Test ride with toll-free customer support number of the dealer you've selected.
          </p>
        </div>
        {/* car info */}
        <div className="booking-modal__car-info">
          <div className="dates-div">
            <div className="booking-modal__car-info__dates">
              <h5>Location & Date</h5>
              <span>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h6>Pick-Up Date</h6>
                  <p>
                    {date}
                    {/* <input type="time" className="input-time"></input> */}
                  </p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h6>Pick-Up Time</h6>
                  <p>
                    {time} /{" "} hrs
                    {/* <input type="time" className="input-time"></input> */}
                  </p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-calendar-days"></i>
                <div>
                  <h6>Vehicle Model</h6>
                  <p>{model_name}</p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-calendar-days"></i>
                <div>
                  <h6>Dealership Opted</h6>
                  <p>{dealer}</p>
                </div>
              </span>
            </div>
          </div>
          <div className="booking-modal__car-info__model">
            <h5>
              <span>Brand -</span> {brand}
            </h5>
            {modalCarImg && <img src={modalCarImg} alt="car_img" />}
          </div>

        </div>
        {/* personal info */}
        <div className="booking-modal__person-info">
          <h4>Personal Information</h4>
          <form className="info-form">
            <div className="info-form__2col">
              <span>
                <label>
                  User Name <b>*</b>
                </label>
                <input
                  value={userData?.username}
                  onChange={handleName}
                  type="text"
                  placeholder="Enter your first name"
                  readOnly // Set the input as read-only
                />
                {/* <p className="error-modal">This field is required.</p> */}
              </span>
              <span>
                <label>
                  Phone Number <b>*</b>
                </label>
                <input
                  value={userData?.phone}
                  onChange={handlePhone}
                  type="tel"
                  placeholder="Enter your phone number"
                  readOnly // Set the input as read-only
                />
                {/* <p className="error-modal">This field is required.</p> */}
              </span>
            </div>

            <div className="info-form__1col">
              <span>
                <label>
                  Email <b>*</b>
                </label>
                <input
                  value={userData?.email}
                  onChange={handleEmail}
                  type="email"
                  placeholder="Enter your email address"
                  readOnly // Set the input as read-only
                />
                {/* <p className="error-modal">This field is required.</p> */}
              </span>
            </div>

            <span className="info-form__checkbox">
              <input type="checkbox" />
              <p>Agree Terms & Conditions</p>
            </span>

            <div className="reserve-button">
              {/* Show loader when isLoading is true */}
              {isLoading ? (
                <>
                <h1 className='text-3xl mx-10' style={{ color: '#ff7f71' }}>Please wait while we process your Booking.</h1>
                <br />
              <div class="ui-loader loader-blk">
                  <svg viewBox="22 22 44 44" class="multiColor-loader">
                      <circle cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6" class="loader-circle loader-circle-animation"></circle>
                  </svg>
              </div>
                </>
              ) : (
                <button onClick={confirmBooking}>Reserve Now</button>
              )}
            </div>
          </form>
        </div>

      </div>
    </>
  );
}

export default BookCar;
