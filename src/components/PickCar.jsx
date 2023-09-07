import React, { useState } from "react";
import CarBox from "./CarBox";

function PickCar({ allData }) {
  const carsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allData.length / carsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;

  const visibleCars = allData.slice(startIndex, endIndex);

  const [active, setActive] = useState(0);
  const [colorBtn, setColorBtn] = useState(0);

  const btnID = (id) => {
    setColorBtn(colorBtn === id ? -1 : id);
  };

  const coloringButton = (id) => {
    return colorBtn === id ? "colored-button" : "";
  };

  const handleCarButtonClick = (carIndex) => {
    setActive(carIndex);
    btnID(carIndex);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <>
      <section className="pick-section">
        <div className="container">
          <div className="pick-container">
            <div className="pick-container__title">
              <h3>Vehicle Models</h3>
              <h2>Our Most Searched Fleet</h2>
              <p>
                Choose from a variety of our amazing vehicles to rent for your
                next adventure or business trip
              </p>
            </div>
            <div className="pick-container__car-content">
              <div className="pick-box">
                {visibleCars.map((car, index) => (
                  <button
                    key={index}
                    className={`${coloringButton(index)}`}
                    onClick={() => handleCarButtonClick(index)}
                  >
                    {car.brand.name} {car.model_name}
                  </button>
                ))}
              </div>
              {active !== -1 && <CarBox data={visibleCars[active]} />}
            </div>
            <div className="pagination w-48 flex -my-16" >
              <button onClick={handlePreviousPage} disabled={currentPage === 1}  className="cta-btn font-bold" style={{ textTransform: "capitalize" }} >
                Previous
              </button>
              <button onClick={handleNextPage} disabled={currentPage === totalPages} className="cta-btn ml-5  font-bold" style={{ textTransform: "capitalize" }}>
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PickCar;
 