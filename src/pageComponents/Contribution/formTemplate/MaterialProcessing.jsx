import Form from "./MaterialProcessing/form";
import Table from "./MaterialProcessing/table";

const MaterialProcessing = ({ goToNext }) => {
  return (
    <div>
      <header className="text-2xl uppercase">Materials & Processing</header>
      <hr />
      <Table goToNext={goToNext} />
      <Form />
    </div>
  );
};

export default MaterialProcessing;
