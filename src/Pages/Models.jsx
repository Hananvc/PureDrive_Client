import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import CarImg1 from "../images/cars-big/audi-box.png";
import Navbar from "../components/Navbar";
import axiosInstance from "../api/apiconfig";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";


function Models() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [variants, setVariants] = useState([]);
  const [images, setImages] = useState([]);
  const [allData, setallData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchData();
  }, []);


  async function fetchData() {
    try {
      const [categoriesData, brandsData, vehiclesData, variantsData, imagesData, allData] = await Promise.all([
        fetchCategories(),
        fetchBrands(),
        fetchVehicles(),
        fetchVariants(),
        fetchImages(),
        fetchalldata(),
      ]);
      
  
      setCategories(categoriesData);
      setBrands(brandsData);
      setVehicles(vehiclesData);
      setVariants(variantsData);
      setImages(imagesData);
      setallData(allData);


      // console.log('categoriesData:', categoriesData);
      // console.log('brandsData:', brandsData);
      // console.log('vehiclesData:', vehiclesData);
      // console.log('variantsData:', variantsData);
      // console.log('imagesData:', imagesData);
      console.log('alldata:', allData);


  

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }
  

  async function fetchCategories() {
    try {
      const response = await axiosInstance.get('/vehicleapp/category/');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  async function fetchBrands() {
    try {
      const response = await axiosInstance.get('/vehicleapp/brand/');
      // console.log('Brands data from API:', response.data); 
      return response.data;
    } catch (error) {
      console.error('Error fetching brands:', error);
      return [];
    }
  }

  async function fetchVehicles() {
    try {
      const response = await axiosInstance.get('/vehicleapp/vehicle/');
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      return [];
    }
  }

  async function fetchVariants() {
    try {
      const response = await axiosInstance.get('/vehicleapp/variant/');
      return response.data;
    } catch (error) {
      console.error('Error fetching variants:', error);
      return [];
    }
  }

  async function fetchImages() {
    try {
      const response = await axiosInstance.get('/vehicleapp/image/');
      return response.data;
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  }

  async function fetchalldata() {
    try {
      const response = await axiosInstance.get('/vehicleapp/vehicle/');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar />
      <section className="models-section">
        <HeroPages name="Vehicle Models" />


        <div className="mt-5 mx-10">
        <Typography variant="h5" color="blue-gray" className="font-bold text-5xl text-red-500">
          Vehicles
        </Typography>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 overflow-hidden">
        {allData.map((data) => (
        <Card className="w-full max-w-[26rem] shadow-2xl card-container mx-16 my-20 ">
        <CardHeader floated={false} color="blue-gray">
        {data.images && data.images.length > 0 ? (
                <div className="relative">
                    <img
                        src={data.images[0].images}
                        alt="img"
                        style={{ height: '160px', minWidth: '100%' }}
                    />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                </div>
            ) : (
                <div className="relative">
                    <img
                        src={data.default_image ? data.default_image : '/path_to_default_image.jpg'}
                        alt="Default Image"
                        style={{ height: '160px', minWidth: '100%' }}
                    />
                </div>
            )}
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
          {/* <IconButton
            size="sm"
            color="red"
            variant="text"
            className="!absolute top-4 right-4 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </IconButton> */}
        </CardHeader>
        <CardBody>
          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="font-bold">
            {data.model_name} 
            </Typography>
            <Typography
              color="blue-gray"
              className="flex items-center gap-1.5 font-normal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-0.5 h-5 w-5 text-yellow-700"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              5.0
            </Typography>
          </div>
          <Typography color="gray" className="">
          {data.Variant.description} 

          </Typography>
          <div className="group mt-8 inline-flex flex-wrap items-center gap-3 ">
            
            <Tooltip content={`${data.Variant.length} Variants`} className="text-lg antialiased font-light">
              <span className="cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70">
              <i class="fa-sharp fa-solid fa-list-ol"></i>
              </span>
            </Tooltip>
            
            <Tooltip content={`${data?.Variant[0]?.battery_capacity_kwh} KWH`} className="text-lg antialiased font-light">
              <span className="cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70">
                <i
                  className="fa-solid fa-battery-full fa-beat-fade"
                  style={{ color: '#ff5900' }}
                ></i>
              </span>
            </Tooltip>
            <Tooltip content="" className="text-lg antialiased font-light">
              <span className="cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 icon_styling"
                >
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
              </span>
            </Tooltip>
            <Tooltip content="{data.variant.battery_capacity_kwh}" className="text-lg antialiased font-light">
              <span className="cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M19.5 6h-15v9h15V6z" />
                  <path
                    fillRule="evenodd"
                    d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 006 21h12a.75.75 0 000-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375zm0 13.5h17.25a.375.375 0 00.375-.375V4.875a.375.375 0 00-.375-.375H3.375A.375.375 0 003 4.875v11.25c0 .207.168.375.375.375z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Tooltip>
            <Tooltip content="Trending" className="text-lg antialiased font-light">
              <span className="cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Tooltip>
            <Tooltip content="And +20 more" className="text-lg antialiased font-light">
              <span className="cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70">
                +20
              </span>
            </Tooltip>
          </div>
        </CardBody>
        <CardFooter className="pt-3">
          <Link to={`/vehicle/${data.id}`}>
          <Button size="lg" fullWidth={true} >
            Reserve
          </Button>
          </Link>
        </CardFooter>
      </Card>
       ))}


        </div>








        {/* <div className="container">
          <div className="models-div">
          
            {variants.map((variant) => (
              <div key={variant.id} className="models-div__box p-4 rounded-lg shadow-md bg-white">
                <div className="models-div__box__img">
                {images.map((img) => {
                    if (img.Variant === variant.id) {
                      return (
                        <img
                          key={img.id}
                          src={img.images}
                          alt="car_img"
                          className="w-full h-32 object-cover rounded-md"
                        />
                      );
                    }
                  })}
                  <div className="models-div__box__descr mt-4">
                    <div className="models-div__box__descr__name-price">
                      <div className="models-div__box__descr__name-price__name">
                      {vehicles.map((vehicle) => {
                              if (variant.vehicle === variant.id) {
                                return (
                                  <p className="text-xl font-semibold">{vehicle.model_name}</p>
                                );
                              }
                            })}
                        
                        <span>
                          <i className="fa-solid fa-star text-yellow-500"></i>
                          <i className="fa-solid fa-star text-yellow-500"></i>
                          <i className="fa-solid fa-star text-yellow-500"></i>
                          <i className="fa-solid fa-star text-yellow-500"></i>
                          <i className="fa-solid fa-star text-yellow-500"></i>
                        </span>
                      </div>
                      <div className="models-div__box__descr__name-price__price">
                        <h4 className="text-lg font-semibold">Rs. {variant?.price}</h4>
                        <p className="text-sm">onwards</p>
                      </div>
                    </div>
                    <div className="models-div__box__descr__name-price__details">
                      <span>
                        <i className="fa-solid fa-car-side"></i> &nbsp; {variant?.description}
                      </span>
                      <span className="text-right">
                         &nbsp; <i className="fa-solid fa-car-side"></i>{variant?.battery_capacity_kwh} KwH
                      </span>
                      <span>
                        <i className="fa-solid fa-car-side"></i> &nbsp;Charging Time {variant?.charging_time_hours} hrs
                      </span>
                      <span className="text-right">
                        &nbsp; <i className="fa-solid fa-car-side"></i>
                      </span>
                    </div>
                    <div className="models-div__box__descr__name-price__btn mt-4">
                      <Link onClick={() => window.scrollTo(0, 0)} to="/" className=" hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                        More Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
                                        <div className="mx-10">
                                                    <h1 className="text-6xl">List of Brands</h1>
                                                    <ul className="text-4xl">
                                                      {brands.map((brand) => (
                                                        <li key={brand.id}>{brand.name}</li>
                                                      ))}
                                                    </ul>
                                        </div>

                                        <div className="mx-10 my-10">
                                                    <h1 className="text-6xl">List of Vehicles</h1>
                                                    <ul className="text-4xl">
                                                      {vehicles.map((brand) => (
                                                        <li key={brand.id}>{brand.model_name}</li>
                                                      ))}
                                                    </ul>
                                        </div>
    </div>
        <div className="book-banner mt-4">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2 className="text-2xl font-semibold">Book a car by getting in touch with us</h2>
              <span className="text-white">
                <i className="fa-solid fa-phone"></i>
                <h3 className="ml-2">(123) 456-7869</h3>
              </span>
            </div>
          </div>
        </div> */}
      </section>
      
    </>
  );
}

export default Models;


