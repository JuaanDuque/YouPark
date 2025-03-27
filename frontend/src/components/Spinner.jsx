import React from "react";

const Spinner = () => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 flex-column">
      <div className="spinner-container position-relative">
        <img
          src="https://e7.pngegg.com/pngimages/490/45/png-clipart-car-computer-icons-hotel-riviera-blu-resumes-angle-vintage-car.png"
          className="spinner-logo fadeOutRight"
          alt="Logo"
        />
      </div>
      <div className="text-center mt-3">
        {" "}
        {/* Añadimos margen superior con mt-3 */}
        <p>Cargando</p>
        <div className="d-flex justify-content-center">
          <div
            className="spinner-grow spinner-grow-sm mx-1"
            role="status"
          ></div>
          <div
            className="spinner-grow spinner-grow-sm mx-1"
            role="status"
          ></div>
          <div
            className="spinner-grow spinner-grow-sm mx-1"
            role="status"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
