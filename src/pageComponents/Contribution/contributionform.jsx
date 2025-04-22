import { useContext, useEffect, useState } from "react";
import { useFetchResearchPaperMutation } from "../../services/Contribution";
import Identification from "./formTemplate/identification";
import MaterialProcessing from "./formTemplate/MaterialProcessing";
import Stepper from "./stepper";
import StepperControl from "./stepperControl";
import { StepperContext } from "./StepperContext";
import FinalConfirmation from "./formTemplate/FinalConfirmation";
import Enteries from "./formTemplate/Enteries";

function ContributionForm() {

  const [fetchResearch, { isError, isLoading }] = useFetchResearchPaperMutation();

  const { contributionData, updateContributionData } = useContext(StepperContext);
  
  const searchTitle = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    if (!title) {
      alert("Please enter a title");
      return;
    }
    try {
      const result = await fetchResearch(title).unwrap();
      if (result.message) {
        updateContributionData("identification", {
          ...contributionData.identification,
          title: result.message.title,
          author_list: result.message.authors_list,
          year: result.message.year,
          doi: result.message.doi,
          link: result.message.link,
          journal: result.message.journal,
        });
        setCurrentStep(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Identification", "Enteries", "Confirmation"];
  const displaySteps = (step) => {
    switch (step) {
      case 1:
        return <Identification autofillLoader={isLoading} />;
      case 2:
        return <Enteries />;
      default:
        return <FinalConfirmation />;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;
    if (direction === "next") {
      if (currentStep === 1) {
        const { title, author_list, year, doi, journal, link } = contributionData.identification || {};
  
        if (!title || !author_list || !year || !doi || !journal || !link) {
          alert("Please fill out the identification form completely before proceeding.");
          return;
        }
      }
      newStep++;
    } else if (direction === "back") {
      newStep--;
    } else {
      newStep = 1;
    }
    setCurrentStep(newStep);
  };

  return (
    <>
      <form onSubmit={searchTitle} className="p-2 sm:p-7 mx-auto flex">
        <input type="text" className="w-full border p-2 rounded-l-xl pl-3 text-sm focus:ring-2 ring-offset-2 focus:ring-primary" name="title" id="title" placeholder="Research paper title - Ex: Battery Materials Design Essentials" />
        <button type="submit" className="text-xs bg-primary rounded-r-xl text-white p-2" > Search Details </button>
      </form>

      <div className="border-b m-2 border-black-2/30 sm:mx-auto w-full"></div>

      <div className="flex flex-col sm:flex-row gap-8 sm:gap-2 p-2 sm:p-7 mx-auto">
        <div className="sm:w-1/6">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        <div className="flex-1 overflow-x-auto">
          <div className="max-w-full">{displaySteps(currentStep)}</div>

          <div className="flex justify-end">
            <StepperControl
              handleClick={handleClick}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              steps={steps}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ContributionForm;
