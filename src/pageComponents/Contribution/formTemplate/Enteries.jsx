import { useState } from "react";
import MaterialProcessing from "./MaterialProcessing";
import TestingCell from "./TestingCell";
import Performances from "./Performance";

const Enteries = () => {
  const [currentStep, setCurrentStep] = useState("materialProcessing");


  return (
    <div className="min-h-[500px] bg-white/50 rounded-lg border">
      <h1 className="bg-primary/80 rounded-t-lg p-1 px-3 text-white text-[16px]">
        enteries
      </h1>
      <div className="flex flex-col gap-8 p-1 sm:p-6 mx-auto">
        {currentStep === "materialProcessing" && (
          <MaterialProcessing
            goToNext={() => setCurrentStep("testingCell")}
          />
        )}
        {currentStep === "testingCell" && (
          <TestingCell
            goBack={() => setCurrentStep("materialProcessing")}
            goToNext={() => setCurrentStep("performance")}
          />
        )}
        {currentStep === "performance" && (
          <Performances
            goBack={() => setCurrentStep("testingCell")}
          />
        )}
      </div>
    </div>
  );
};

export default Enteries;
