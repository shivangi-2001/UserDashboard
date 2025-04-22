import { useState, useEffect, useContext } from "react";
import { StepperContext } from "../../StepperContext";


const initailtesting = {
  current_density_mag: null,
  current_density_c: null,
  temperature: null,
  testing_env: null,
  min_voltage: null,
  max_voltage: null,
  full_half: "Half",
  measurement_method: "Experimental",
  cellComponentWeight: "Active Cathode alone",
  tw_active_anode: null,
  tw_active_cathode: null,
  tw_anode: null,
  tw_cathode: null,
  tw_cell_without_casing: null,
  tw_cell: null,
  tv_active_anode: null,
  tv_active_cathode: null,
  tv_anode: null,
  tv_cathode: null,
  tv_cell_without_casing: null,
  tv_cell: null,
  ta_cathode: null,
  ta_anode: null,
  performance: [],
}

const Form = () => {
  const { contributionData, updateContributionData, matproIndex} = useContext(StepperContext);

  const [testingCell, setTestingCell] = useState(initailtesting);

  const handleChange = (e) => {
    let { name, value } = e.target;
    const stringFields = ["testing_env", "measurement_method", "cellComponentWeight", "full_half"];
    if (!stringFields.includes(name)) {
      value = parseFloat(value);
    }

    if(value === undefined || ""){
      value = null;
    }

    const updated = {
      ...testingCell,
      [name]: value,
    };

    setTestingCell(updated);
  }

  const handleSumbit = (e) => {
    e.preventDefault();

    // maintaining the previosly added testingCell
    const updatedMaterialProcessing = contributionData.enteries.map((mp, idx) =>
      idx === matproIndex
        ? {
            ...mp,
            testingCell: [...(mp.testingCell || []), testingCell],
          }
        : mp
    );

    updateContributionData("enteries", updatedMaterialProcessing);
  }

  // handle reset button
  const handleReset = () => {
    setTestingCell(initailtesting);
  }

  useEffect(() => {
    console.log(contributionData);
  }, [contributionData])
  
  return (
    <form onSubmit={handleSumbit} className="w-full flex flex-col gap-4 min-h-[500px] rounded-lg" >
      <hr className="mb-5" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full">
            <label htmlFor="current_density_mag" className="font-semibold block text-sm text-gray-600" > Current Density (mAg-1) </label>
            <input 
              type="number" 
              name="current_density_mag" 
              id="current_density_mag" 
              value={testingCell.current_density_mag}
              onChange={handleChange}
              className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary" 
              placeholder="100" 
            />
        </div>
        <div className="w-full">
            <label htmlFor="current_density_c" className="font-semibold block text-sm text-gray-700" > Current Density (C) </label>
            <input 
              type="number" 
              name="current_density_c" 
              id="current_density_c" 
              value={testingCell.current_density_c}
              onChange={handleChange}
              className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary" 
              placeholder="100" 
            />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full">
            <label htmlFor="temperature" className="font-semibold block text-sm text-gray-700" > Temperature (K)</label>
            <input 
              type="number" 
              name="temperature" 
              id="temperature" 
              value={testingCell.temperature}
              onChange={handleChange}
              className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary" 
              placeholder="100" 
            />
        </div>
        <div className="w-full">
            <label htmlFor="testing_env" className="font-semibold block text-sm text-gray-700" > Testing Environment</label>
            <input 
              type="text" 
              name="testing_env" 
              id="testing_env" 
              value={testingCell.testing_env}
              onChange={handleChange}
              className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary" 
              placeholder="Humidity" 
            />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full">
            <label htmlFor="min_voltage" className="font-semibold block text-sm text-gray-700" > Minium Voltage (V)</label>
            <input 
              type="number" 
              name="min_voltage" 
              id="min_voltage" 
              value={testingCell.min_voltage}
              onChange={handleChange}
              className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary" 
              placeholder="100" 
            />
        </div>
        <div className="w-full">
            <label htmlFor="max_voltage" className="font-semibold block text-sm text-gray-700" >Maximum Voltage (V)</label>
            <input 
              type="number" 
              name="max_voltage" 
              id="max_voltage" 
              value={testingCell.max_voltage}
              onChange={handleChange}
              className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary" 
              placeholder="100" 
            />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full">
            <label htmlFor="full_half_cell" className="font-semibold block text-sm text-gray-700" > Full or Half Cell</label>
            <select name="full_half_cell" id="full_half_cell" className="w-full p-2 border rounded-md" onChange={handleChange} value={testingCell.full_half}>
              <option value="Half">Half</option>
              <option value="Full">Full</option>
            </select>
        </div>
        <div className="w-full">
            <label htmlFor="measurement_method" className="font-semibold block text-sm text-gray-700" >Measurement Method</label>
            <select name="measurement_method" id="measurement_method" className="w-full p-2 border rounded-md" onChange={handleChange} value={testingCell.measurement_method}>
              <option value="Experimental">Experimental</option>
              <option value="DFT">DFT</option>
              <option value="ML Predicted">ML Predicted</option>
              <option value="Other Calculation">Other Calculation</option>
            </select>        
        </div>
      </div>

      <div className="w-full">
            <label htmlFor="cellComponentWeight" className="font-semibold block text-sm text-gray-700" >Cell Component Weight Considered for specific gravimetric calculation</label>
            <select name="cellComponentWeight" id="cellComponentWeight" className="w-full p-2 border rounded-md" onChange={handleChange} value={testingCell.cellComponentWeight}>
              <option value="Active Cathode alone">Active Cathode alone</option>
              <option value="Active Anode alone">Active Anode alone</option>
              <option value="Cathode alone">Cathode alone</option>
              <option value="Anode alone">Anode alone</option>
              <option value="Full cell without casing">Full cell without casing</option>
              <option value="Full cell with casing">Full cell with casing</option>
            </select>        
      </div>


      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="w-full">
            <label htmlFor="tw_active_anode" className="font-semibold block text-sm text-gray-700" > Total weight of active anode (g)</label>
            <input 
              type="number" 
              name="tw_active_anode" 
              id="tw_active_anode" 
              onChange={handleChange}
              value={testingCell.tw_active_anode}
              className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary" 
              placeholder="100" 
            />
        </div>
        <div className="w-full">
            <label htmlFor="tw_active_cathode" className="font-semibold block text-sm text-gray-700" >Total weight of active cathode (g)</label>
            <input 
              type="number" 
              name="tw_active_cathode" 
              id="tw_active_cathode" 
              onChange={handleChange}
              value={testingCell.tw_active_cathode}
              className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary" 
              placeholder="100" />
        </div>
        <div className="w-full">
            <label htmlFor="tw_anode" className="font-semibold block text-sm text-gray-700" > Total weight of anode (g)</label>
            <input 
              type="number" 
              name="tw_anode" 
              id="tw_anode" 
              onChange={handleChange}
              value={testingCell.tw_anode}
              className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary" 
              placeholder="100" />
        </div>
        <div className="w-full">
            <label htmlFor="tw_cathode" className="font-semibold block text-sm text-gray-700" >Total weight of cathode (g)</label>
            <input 
              type="number" 
              name="tw_cathode" 
              id="tw_cathode"
              onChange={handleChange}
              value={testingCell.tw_cathode} 
              className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary" 
              placeholder="100" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full">
            <label htmlFor="tw_cell_without_casing" className="font-semibold block text-sm text-gray-700" > Total weight of cell without casing (g)</label>
            <input 
              type="number" 
              name="tw_cell_without_casing" 
              id="tw_cell_without_casing" 
              onChange={handleChange}
              value={testingCell.tw_cell_without_casing}
              className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary" 
              placeholder="100" />
        </div>
        <div className="w-full">
            <label htmlFor="tw_cell" className="font-semibold block text-sm text-gray-700" >Total weight of cell (g)</label>
            <input 
              type="number" 
              name="tw_cell" 
              id="tw_cell" 
              value={testingCell.tw_cell}
              onChange={handleChange}
              className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary" 
              placeholder="100" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="w-full">
            <label htmlFor="tv_active_anode" className="font-semibold block text-sm text-gray-700" > Total volume of active anode (cm3)</label>
            <input 
              type="number" 
              name="tv_active_anode" 
              id="tv_active_anode" 
              onChange={handleChange}
              value={testingCell.tv_active_anode}
              className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary" 
              placeholder="100" />
        </div>
        <div className="w-full">
            <label htmlFor="tv_active_cathode" className="font-semibold block text-sm text-gray-700" >Total volume of active cathode (cm3)</label>
            <input 
              type="number" 
              name="tv_active_cathode" 
              id="tv_active_cathode" 
              onChange={handleChange}
              value={testingCell.tv_active_cathode}
              className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary" 
              placeholder="100" />
        </div>
        <div className="w-full">
            <label htmlFor="tv_anode" className="font-semibold block text-sm text-gray-700" > Total volume of anode (cm3)</label>
            <input 
              type="number" 
              name="tv_anode" 
              id="tv_anode" 
              onChange={handleChange}
              value={testingCell.tv_anode}
              className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary" 
              placeholder="100" />
        </div>
        <div className="w-full">
            <label htmlFor="tv_cathode" className="font-semibold block text-sm text-gray-700" >Total volume of cathode (cm3)</label>
            <input 
              type="number" 
              name="tv_cathode" 
              id="tv_cathode"
              onChange={handleChange}
              value={testingCell.tv_cathode} 
              className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary" 
              placeholder="100" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full">
            <label htmlFor="tv_cell_without_casing" className="font-semibold block text-sm text-gray-700" > Total volume of cell without casing (cm3)</label>
            <input 
              type="number" 
              name="tv_cell_without_casing" 
              id="tv_cell_without_casing" 
              onChange={handleChange}
              value={testingCell.tv_cell_without_casing}
              className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary" 
              placeholder="100" />
        </div>
        <div className="w-full">
            <label htmlFor="tv_cell" className="font-semibold block text-sm text-gray-700" >Total volume of cell (cm3)</label>
            <input 
              type="number" 
              name="tv_cell" 
              id="tv_cell" 
              onChange={handleChange}
              value={testingCell.tv_cell}
              className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary" 
              placeholder="100" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full">
            <label htmlFor="ta_cathode" className="font-semibold block text-sm text-gray-700" > Total area of the cathode (cm2)</label>
            <input 
              type="number" 
              name="ta_cathode" 
              id="ta_cathode"
              onChange={handleChange}
              value={testingCell.ta_cathode} 
              className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary" 
              placeholder="100" />
        </div>
        <div className="w-full">
            <label htmlFor="ta_anode" className="font-semibold block text-sm text-gray-700" >Total area of the anode (cm2)</label>
            <input 
              type="number" 
              name="ta_anode" 
              id="ta_anode" 
              onChange={handleChange}
              value={testingCell.ta_anode}
              className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary" 
              placeholder="100" />
        </div>
      </div>

      
      <div className="flex justify-end gap-5">
      <button type="button" onClick={handleReset} className="self-end border px-3 py-2 rounded-md bg-blue-400 text-white hover:bg-primary" > Reset </button>

      <button type="submit" className="self-end border px-3 py-2 rounded-md bg-red-400 text-white hover:bg-red-600" > Add </button>
      </div>
    </form>
  );
};

export default Form;
