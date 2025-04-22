import Form from "./Performance/form";
import Table from "./Performance/table";
import { IoChevronBackCircleSharp } from "react-icons/io5";


const Performances = ({goBack}) => {
  return (
    <div>
        <div className="flex flex-1 gap-4">
        <button onClick={goBack}><IoChevronBackCircleSharp className="size-7"/></button>
      <header className="text-2xl uppercase">Performance</header>
      
        </div>
       <hr />
      <Table/>
      <Form/>
    </div>
  );
};

export default Performances;
