// Stepper.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Step1 from "./StepOne";
import Step2 from "./StepTwo";
import Step3 from "./StepThree";
import StepProgressWithBar from "./StepProgressWithBar";

const Stepper = ({ vehicleType }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [parkingSlotsStepper, setParkingSlotsStepper] = useState([]); // Estado para los slots

  const navigate = useNavigate();
  const totalSteps = 3;

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    if (currentStep === 0) {
      navigate(0);
    }
  }, [currentStep, navigate]);

  return (
    <div>
      {currentStep !== 0 && (
        <StepProgressWithBar
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      )}
      <div className="d-flex justify-content-center">
        {currentStep === 1 && (
          <Step1
            vehicleType={vehicleType}
            setSelectedFloor={setSelectedFloor}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            setParkingSlotsStepper={setParkingSlotsStepper} // Se pasa la función para actualizar slots
          />
        )}
        {currentStep === 2 && (
          <Step2
            vehicleType={vehicleType}
            selectedFloor={selectedFloor}
            parkingSlotsStepper={parkingSlotsStepper} // Se pasan los slots recibidos
            setSelectedCell={setSelectedCell}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        )}
        {currentStep === 3 && (
          <Step3
            selectedCell={selectedCell}
            handlePreviousStep={handlePreviousStep}
          />
        )}
      </div>
    </div>
  );
};

export default Stepper;
