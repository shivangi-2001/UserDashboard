import { useContext, useState } from "react";
import { useFinalSubmissionMutation } from "../../services/Contribution";
import { StepperContext } from "./StepperContext";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { BiHappyBeaming } from "react-icons/bi";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const StepperControl = ({handleClick, currentStep, setCurrentStep, steps}) => {
  const { contributionData } = useContext(StepperContext);
  const [FinalSubmission, {isLoading, isError}] = useFinalSubmissionMutation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  
  const Submission = async () => {
    try {
      const result = await FinalSubmission({...contributionData});
      if(result?.data?.message){
          setMessage(result?.data?.message);
          setOpen(true);
          setCurrentStep(1);
      }else{
        setErrorMsg(result.error?.data.error_message)
        setCurrentStep(1);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mx-auto flex justify-around mt-4 mb-8">
      <button
        onClick={() => handleClick("back")}
        className={`bg-slate text-slate-600 text-[15px] py-2 px-4 rounded-md font=semibold cursor-pointer 
        border-2 border-slate-300 hover:bg-slate=700 hover:text-white transition diration-200 
        ease-in-out ${currentStep === 1 ? "hidden" : ""}`}
      >
        Back
      </button>
      
      {currentStep === steps.length ? (
        <button
          onClick={() => {
            Submission();
          }}
          className="bg-primary/80 text-white text-[15px] py-2 px-4 rounded-md font=semibold cursor-pointer 
        hover:bg-slate=700 hover:text-white transition diration-200 ease-in-out"
        >
          Submit
        </button>
      ) : (
        <button
          onClick={() => handleClick("next")}
          className="bg-primary/80 text-white text-[15px] py-2 px-4 rounded-md font=semibold cursor-pointer 
        hover:bg-slate=700 hover:text-white transition diration-200 ease-in-out"
        >
          Next
        </button>
      )}

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:size-10">
                    <BiHappyBeaming aria-hidden="true" className="size-6 text-yellow-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                      Happy Contribution 😄
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
            </DialogPanel>
          </div>
        </div>
      </Dialog>


      {/* craete the dialog box for the errormsg happen */}
      <Dialog open={!!errorMsg} onClose={() => setErrorMsg(null)} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-red-600">
                      Error Occurred
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {errorMsg}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default StepperControl;
