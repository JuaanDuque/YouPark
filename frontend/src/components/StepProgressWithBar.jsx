import React from "react";

const StepProgressWithBar = ({ currentStep, totalSteps }) => {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <div className="mb-2 mt-2">
      <div className="d-flex justify-content-center gap-5">
        {steps.map((step) => (
          <span
            key={step}
            className={`badge rounded-pill px-4 py-3 ${
              step === currentStep ? "" : "bg-light text-dark"
            }`}
            style={{
              backgroundColor: step === currentStep ? "#3cb7ea" : "",
              fontSize: "18px",
              fontWeight: step === currentStep ? "bold" : "normal",
            }}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StepProgressWithBar;
