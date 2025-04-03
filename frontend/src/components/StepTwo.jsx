// StepTwo.jsx
import React from "react";

const StepTwo = ({
  vehicleType,
  selectedFloor,
  parkingSlotsStepper,
  setSelectedCell,
  handleNextStep,
  handlePreviousStep,
}) => {
  const filteredSlots = parkingSlotsStepper.filter(
    (slot) =>
      slot.location === selectedFloor && slot.vehicle_type_id === vehicleType
  );

  const handleCellSelect = (cell) => {
    if (cell.status === 1) {
      setSelectedCell(cell);
      handleNextStep();
    }
  };

  return (
    <div className="text-center mt-2">
      <h2>Selecciona una celda en el piso {selectedFloor}</h2>
      <div
        className="d-flex justify-content-center flex-wrap gap-3 overflow-auto mt-2 parkingslot"
        style={{ marginRight: "5px", marginLeft: "5px" }}
      >
        {filteredSlots.map((cell) => (
          <div
            key={cell.slot_number}
            onClick={() => handleCellSelect(cell)}
            className={`border-5 p-4 active-slot ${
              cell.status === 0 ? "text-muted" : ""
            } col-12 col-md-6 col-lg-3`}
            style={{
              cursor: cell.status === 1 ? "pointer" : "not-allowed",
              width: "calc(25% - 20px)",
              height: "120px",
              textAlign: "center",
              borderLeft: "2px solid black",
              borderRight: "2px solid black",
              backgroundColor: cell.status === 1 ? "springgreen" : "indianred",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={cell.vehicle_type_id === 1 ? "/carro.png" : "/moto.png"}
              style={{
                width: "30px",
                marginBottom: "10px",
              }}
              alt={cell.vehicle_type}
            />
            <p>{cell.slot_number}</p>
          </div>
        ))}
      </div>
      <div className="position-fixed bottom-0 start-50 translate-middle-x mb-3">
        <button onClick={handlePreviousStep} className="btn btn-secondary me-2">
          Atrás
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
