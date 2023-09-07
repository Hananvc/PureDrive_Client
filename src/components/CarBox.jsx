import React, { useState } from "react";

function CarBox({ data }) {
  const [carLoad, setCarLoad] = useState(true);
  console.log("-carboxdata-",data);
  return (
    <>
    <div className="box-cars">
      <div className="pick-car">
        {carLoad && <span className="loader"></span>}
        <img
          style={{ display: carLoad ? "none" : "block" }}
          src={data?.default_image}
          alt="car_img"
          onLoad={() => setCarLoad(false)}
        />
      </div>
      <div className="pick-description">
            <div className="pick-description__price ">
              <span>{data?.model_name}</span>
            </div>
            <div className="pick-description__table">
              <div className="pick-description__table__col ">
                <span className="font-bold">Category</span>
                <span>{data?.brand?.category?.name} </span>
              </div>

              <div className="pick-description__table__col">
                <span className="font-bold">Brand</span>
                <span>{data?.brand.name} </span>

              </div>

              <div className="pick-description__table__col">
                <span className="font-bold">No.of Variants</span>
                <span>{data?.Variant?.length} </span>
                
              </div>

              <div className="pick-description__table__col">
              <span className="font-bold">Brochure</span>
                  <a
                    href={data?.brochure}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pdf-link"
                  >
                   <i class="fas fa-file-pdf"></i>
                  </a>
              </div>
{/* 
              <div className="pick-description__table__col">
                <span>AC</span>
              </div>

              <div className="pick-description__table__col">
                <span>Transmission</span>
              </div>

              <div className="pick-description__table__col">
                <span>Fuel</span>
              </div> */}
            </div>
            {/* btn cta */}
            <a className="cta-btn" href="#booking-section">
              Reserve Now
            </a>
          </div>


      </div>
      
    </>
  );
}

export default CarBox;
