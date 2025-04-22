import { useEffect, useState } from "react";

const Stepper = ({ steps, currentStep }) => {
  const [newSteps, setNewSteps] = useState([]);

  const updateStep = (stepNumber, stepsArray) => {
    return stepsArray.map((step, index) => ({
      ...step,
      highlighted: index === stepNumber,
      selected: index <= stepNumber,
      completed: index < stepNumber,
    }));
  };

  useEffect(() => {
    const stepsState = steps.map((step, index) => ({
      description: step, // ✅ FIXED: Ensure description is assigned correctly
      completed: false,
      highlighted: index === 0,
      selected: index === 0,
      number: index + 1,
    }));

    const updatedSteps = updateStep(currentStep - 1, stepsState);
    setNewSteps(updatedSteps);
  }, [steps, currentStep]);

  return (
    <div className="h-[30%] mx-4 p-4 flex sm:flex-col justify-between items-center">
      {newSteps.map((step, index) => (
        <div
          key={index}
          className={`flex sm:flex-col sm:gap-0 items-center ${
            index !== newSteps.length - 1 ? "w-full" : ""
          }`}
        >
          <div className="relative flex flex-col items-center text-teal-600">
            <div
              className={`rounded-full transition duration-500 ease-in-out
                border-2 ${
                  step.completed
                    ? "border-green-600 bg-green-600 text-white"
                    : "border-gray-300"
                } 
                h-12 w-12 flex items-center justify-center py-3 sm:p-0`}
            >
              {step.completed ? (
                <span className="text-white font-bold text-xl">&#10003;</span>
              ) : (
                step.number
              )}
            </div>
            <div
              className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase 
              ${step.highlighted ? "text-gray-900" : "text-gray-400"}`}
            >
              {step.description}{" "}
              {/* ✅ FIXED: Ensure description is rendered */}
            </div>
          </div>
          {index !== newSteps.length - 1 && (
            <div
              className={`flex-auto transition duration-500 ease-in-out 
      border-t-2 sm:border-l-2 sm:border-t-0 
      ${step.completed ? "border-green-600" : "border-gray-300"} 
      sm:h-24 sm:w-0.5 w-full`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
