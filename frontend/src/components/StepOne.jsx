// StepOne.jsx
import React, { useState, useEffect } from "react";
import { getParkingslots } from "../services/parkingslot/api";

const StepOne = ({
  vehicleType,
  setSelectedFloor,
  handleNextStep,
  handlePreviousStep,
  setParkingSlotsStepper, // Recibimos la función del padre
}) => {
  const [parkingslot, setParkingslot] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getParkingslots({ vehicle_type_id: vehicleType });
        setParkingslot(data.body);
        // Actualizamos el estado en el componente padre
        setParkingSlotsStepper(data.body);
      } catch (err) {
        alert("Error al obtener datos");
      }
    };

    fetchData();
  }, [vehicleType, setParkingSlotsStepper]);

  // Agrupar slots por piso (suponiendo que cada slot tiene una propiedad "location")
  const groupedSlots = parkingslot.reduce((acc, slot) => {
    const floor = slot.location;
    if (!acc[floor]) {
      acc[floor] = [];
    }
    acc[floor].push(slot);
    return acc;
  }, {});

  const handleFloorSelect = (floor) => {
    setSelectedFloor(floor);
    handleNextStep();
  };

  return (
    <div className="d-flex flex-column">
      <h2>Selecciona el piso</h2>
      <div
        className="d-flex justify-content-center gap-3 mt-1"
        style={{ flexDirection: "row", justifyContent: "space-around" }}
      >
        {Object.entries(groupedSlots).map(([floor, slots]) => (
          <div
            key={floor}
            onClick={() => handleFloorSelect(floor)}
            className="p-4 custom-rounded-bottom floor-card"
          >
            <h4 style={{ color: "white" }}>Piso</h4>
            <h1 style={{ color: "white", fontSize: "100px" }}>{floor}</h1>
            <p className="text-bg-light rounded-pill available">
              {slots.filter((s) => s.status === 1).length}
            </p>
            <p className="text-bg-light rounded-pill">{slots.length}</p>
          </div>
        ))}
      </div>
      <div className="position-fixed bottom-0 start-50 translate-middle-x mb-3 mt-2">
        <button onClick={handlePreviousStep} className="btn btn-secondary me-2">
          Atrás
        </button>
      </div>
    </div>
  );
};

export default StepOne;
