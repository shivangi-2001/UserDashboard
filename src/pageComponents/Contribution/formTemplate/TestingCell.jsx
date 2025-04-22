import { useContext } from "react";
import Form from "./TestingCell/form";
import Table from "./TestingCell/table";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { StepperContext } from "../StepperContext";

const TestingCell = ({ goBack, goToNext }) => {
  const { matproIndex } = useContext(StepperContext);

  return (
    <div>
      <div className="flex flex-1 gap-3">
        <button onClick={goBack}>
          <IoChevronBackCircleSharp className="size-7" />
        </button>
        <header className="text-2xl uppercase">Testing & Cell Information</header>
      </div>
      <hr />
      <Table goToNext={goToNext} matproIndex={matproIndex} />
      <Form matproIndex={matproIndex} />
    </div>
  );
};

export default TestingCell;