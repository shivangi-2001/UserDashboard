import { useContext, useEffect, useState } from "react";
import { StepperContext } from "../../StepperContext";

const initialMatpro = {
  shuttling_ion: "",
  active_cathode: "",
  element_cathode: "",
  active_anode: "",
  element_anode: "",
  electrolyte: "",
  separator: "",
  processing: "",
  testingCell: [],
};


const Form = () => {
  const { contributionData, updateContributionData } = useContext(StepperContext);

  const [matpro, setMatpro] = useState(initialMatpro);

  useEffect(() => {
    // adjustoing the last entry of the materialProcessing 
    // but reseting the testing cell into empty list
    // to be the one that is being edited

    const data = contributionData?.enteries;
    if (Array.isArray(data) && data.length > 0) {
      const lastEntry = { ...data[data.length - 1], testingCell: [] };
      setMatpro(lastEntry);
    }
  }, [contributionData?.enteries?.materialProcessing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = {
      ...matpro,
      [name]: value,
    };

    setMatpro(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedMatpro = {
      ...matpro,
      element_cathode: typeof matpro.element_cathode === "string"
        ? matpro.element_cathode.split(',').map(s => s.trim()) : matpro.element_cathode,
      element_anode: typeof matpro.element_anode === "string"
        ? matpro.element_anode.split(',').map(s => s.trim()) : matpro.element_anode,
      testingCell: [], // initialize empty testingCell array
    };
  
    const updatedEntries = [
      ...(contributionData?.enteries || []),
      parsedMatpro,
    ];
  
    updateContributionData("enteries", updatedEntries);
  };

  // handle reset
  const handleReset = () => {
    setMatpro(initialMatpro);
  };

  useEffect(() => {
    console.log(contributionData);
  }, [contributionData]);

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 min-h-[500px] rounded-lg">
      <hr className="mb-5" />

      {/* Shuttling Ion */}
      <div className="w-full">
        <label htmlFor="shuttling_ion" className="font-semibold block text-sm text-gray-900">
          Shuttling Ion
        </label>
        <input
          type="text"
          name="shuttling_ion"
          id="shuttling_ion"
          value={matpro.shuttling_ion}
          onChange={handleChange}
          className="rounded-md text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
          placeholder="Li"
          required
        />
      </div>

      {/* Active Cathode and Element Cathode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full">
          <label htmlFor="active_cathode" className="font-semibold block text-sm text-gray-900">
            Active Cathode
          </label>
          <input
            type="text"
            name="active_cathode"
            id="active_cathode"
            value={matpro.active_cathode}
            onChange={handleChange}
            className="rounded-md text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
            placeholder="Na2V3(PO4)3"
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="element_cathode" className="font-semibold block text-sm text-gray-900">
            Elements In Cathode
          </label>
          <input
            type="text"
            name="element_cathode"
            id="element_cathode"
            value={matpro.element_cathode}
            onChange={handleChange}
            className="rounded-md text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
            placeholder="Na, V, P, O"
            required
          />
        </div>
      </div>

      {/* Active Anode and Element Anode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full">
          <label htmlFor="active_anode" className="font-semibold block text-sm text-gray-900">
            Active Anode
          </label>
          <input
            type="text"
            name="active_anode"
            id="active_anode"
            value={matpro.active_anode}
            onChange={handleChange}
            className="rounded-md text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
            placeholder="Na2V3(PO4)3"
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="element_anode" className="font-semibold block text-sm text-gray-900">
            Elements in Anode
          </label>
          <input
            type="text"
            name="element_anode"
            id="element_anode"
            value={matpro.element_anode}
            onChange={handleChange}
            className="rounded-md text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
            placeholder="Na, V, P, O, C"
            required
          />
        </div>
      </div>

      {/* Electrolyte */}
      <div className="w-full">
        <label htmlFor="electrolyte" className="font-semibold block text-sm text-gray-900">
          Electrolyte
        </label>
        <textarea
          name="electrolyte"
          id="electrolyte"
          value={matpro.electrolyte}
          onChange={handleChange}
          className="rounded-md text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
          placeholder="1M NaClO4 in EC:PC (1:1)"
          required
        />
      </div>

      {/* Separator */}
      <div className="w-full">
        <label htmlFor="separator" className="font-semibold block text-sm text-gray-900">
          Separator
        </label>
        <textarea
          name="separator"
          id="separator"
          value={matpro.separator}
          onChange={handleChange}
          className="rounded-md text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
          placeholder="Glass microfiber filters (Whatmann GF/D)"
          required
        />
      </div>

      {/* Processing */}
      <div className="w-full">
        <label htmlFor="processing" className="font-semibold block text-sm text-gray-900">
          Processing
        </label>
        <textarea
          name="processing"
          id="processing"
          value={matpro.processing}
          onChange={handleChange}
          rows={10}
          className="rounded-md text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
          placeholder="Microwave assisted sol–gel synthesis route"
          required
        />
      </div>

      <div className="flex justify-end gap-5">
      <button type="button" onClick={handleReset} className="self-end border px-3 py-2 rounded-md bg-blue-400 text-white hover:bg-primary" > Reset </button>

      <button type="submit" className="self-end border px-3 py-2 rounded-md bg-red-400 text-white hover:bg-red-600" > Add </button>
      </div>
    </form>
  );
};

export default Form;
