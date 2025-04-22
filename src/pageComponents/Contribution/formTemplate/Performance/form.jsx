import { useContext, useEffect, useState } from "react";
import { StepperContext } from "../../StepperContext";

const initialPerformance = {
  cycle_number: null,
  retention_percentage: null,
  discharge_gravimetric_specific_capacity: null,
  discharge_gravimetric_specific_energy: null,
  discharge_gravimetric_specific_capacitance: null,
  discharge_areal_specific_capacitance: null,
  charge_gravimetric_specifc_capacity: null,
  charge_gravimetric_specifc_energy: null,
  energy: null,
  coulombic: null,
  open_circuit_voltage: null,
  active_cathode_volume: null,
  active_anode_volume: null,
  charge_curve: {},
  discharge_curve: {}
}

const Form = () => {
  const { contributionData, updateContributionData, matproIndex, testcellIndex } = useContext(StepperContext);
  const [ performance, setPerformance ] = useState(initialPerformance);

  const handleChange = (e) => {
    let {name, value} = e.target;
    if(name !== "open_circuit_voltage"){
      value = parseFloat(value)
    }
    if(value === undefined || ""){
      value = null;
    }
    const updated = {
      ...performance,
      [name]: value,
    };
    setPerformance(updated);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMaterialProcessing = contributionData.enteries.map((mp, idx) => {
      if (idx === matproIndex) {
        return {
          ...mp,
          testingCell: Array.isArray(mp.testingCell)
            ? mp.testingCell.map((cell, cellIndex) => {
                if (cellIndex === testcellIndex) {
                  return {
                    ...cell,
                    performance: [...(cell.performance || []), performance],
                  };
                }
                return cell;
              })
            : mp.testingCell,
        };
      }
      return mp;
    });
  
    // Step 2: Call updateContributionData with correct structure
    updateContributionData("enteries",  updatedMaterialProcessing);
  }


  const handleReset = () => { 
    setPerformance(initialPerformance);
  }

  useEffect(() => {
    console.log(contributionData)
  }, [contributionData])


  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 min-h-[500px] rounded-lg" >
      <hr className="mb-5" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full">
          <label htmlFor="cycle_number" className="font-semibold block text-sm text-gray-600" > Cycle number </label>
          <input
            type="number"
            name="cycle_number"
            id="cycle_number"
            onChange={handleChange}
            value={performance.cycle_number}
            className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
            placeholder="1"
          />
        </div>
        <div className="w-full">
          <label htmlFor="retention_percentage" className="font-semibold block text-sm text-gray-700" > Retention Percentage </label>
          <input
            type="number"
            name="retention_percentage"
            id="retention_percentage"
            onChange={handleChange}
            value={performance.retention_percentage}
            className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
            placeholder="100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full">
          <label htmlFor="charge_gravimetric_specifc_capacity" className="font-semibold block text-sm text-gray-700" > Charge Gravimetric Specific Capacity (mAhg-1) </label>
          <input
            type="number"
            name="charge_gravimetric_specifc_capacity"
            id="charge_gravimetric_specifc_capacity"
            onChange={handleChange}
            value={performance.charge_gravimetric_specifc_capacity}
            className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
            placeholder="100"
          />
        </div>
        <div className="w-full">
          <label htmlFor="charge_gravimetric_specifc_energy" className="font-semibold block text-sm text-gray-700" > Charge Gravimetric Specific Energy (WhKg-1) </label>
          <input
            type="number"
            name="charge_gravimetric_specifc_energy"
            id="charge_gravimetric_specifc_energy"
            onChange={handleChange}
            value={performance.charge_gravimetric_specifc_energy}
            className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
            placeholder="100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full">
          <label htmlFor="energy" className="font-semibold block text-sm text-gray-700" > Energy Effeciency </label>
          <input
            type="number"
            name="energy"
            id="energy"
            onChange={handleChange}
            value={performance.energy}
            className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
            placeholder="100"
          />
        </div>
        <div className="w-full">
          <label htmlFor="coulombic" className="font-semibold block text-sm text-gray-700" > Coulombic Effeciency </label>
          <input
            type="number"
            name="coulombic"
            id="coulombic"
            onChange={handleChange}
            value={performance.coulombic}
            className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
            placeholder="100"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="w-full">
          <label htmlFor="discharge_gravimetric_specific_energy" className="font-semibold block text-sm text-gray-700" > Discharge Gravimetric Specific Energy (WhKg-1) </label>
          <input
            type="number"
            name="discharge_gravimetric_specific_energy"
            id="discharge_gravimetric_specific_energy"
            onChange={handleChange}
            value={performance.discharge_gravimetric_specific_energy}
            className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
            placeholder="100"
          />
        </div>
        <div className="w-full">
          <label htmlFor="discharge_gravimetric_specific_capacitance" className="font-semibold block text-sm text-gray-700" > Discharge Gravimetric Specific Capacitance (Fg-1) </label>
          <input
            type="number"
            name="discharge_gravimetric_specific_capacitance"
            id="discharge_gravimetric_specific_capacitance"
            onChange={handleChange}
            value={performance.discharge_gravimetric_specific_capacitance}
            className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
            placeholder="100"
          />
        </div>
        <div className="w-full">
          <label htmlFor="discharge_areal_specific_capacitance" className="font-semibold block text-sm text-gray-700" > Discharge Areal Specific Capacitance (Fcm-2) </label>
          <input
            type="number"
            name="discharge_areal_specific_capacitance"
            id="discharge_areal_specific_capacitance"
            onChange={handleChange}
            value={performance.discharge_areal_specific_capacitance}
            className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
            placeholder="100"
          />
        </div>
        <div className="w-full">
          <label htmlFor="discharge_gravimetric_specific_capacity" className="font-semibold block text-sm text-gray-700" > Discharge Gravimetric Specific Capacity (mAhg-1) </label>
          <input
            type="number"
            name="discharge_gravimetric_specific_capacity"
            id="discharge_gravimetric_specific_capacity"
            onChange={handleChange}
            value={performance.discharge_gravimetric_specific_capacity}
            className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
            placeholder="100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full">
          <label htmlFor="open_circuit_voltage" className="font-semibold block text-sm text-gray-700" > {" "} Open Circuit Voltage (Volt) </label>
          <input
            type="text"
            name="open_circuit_voltage"
            id="open_circuit_voltage"
            onChange={handleChange}
            value={performance.open_circuit_voltage}
            className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
            placeholder="voltage"
          />
        </div>
        <div className="w-full">
          <label htmlFor="active_cathode_volume" className="font-semibold block text-sm text-gray-700" > Active cathode volume expansion (%) </label>
          <input
            type="number"
            name="active_cathode_volume"
            id="active_cathode_volume"
            onChange={handleChange}
            value={performance.active_cathode_volume}
            className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
            placeholder="100"
          />
        </div>
        <div className="w-full">
          <label htmlFor="active_anode_volume" className="font-semibold block text-sm text-gray-700" > Active anode volume expansion (%) </label>
          <input
            type="number"
            name="active_anode_volume"
            id="active_anode_volume"
            onChange={handleChange}
            value={performance.active_anode_volume}
            className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
            placeholder="100"
          />
        </div>
      </div>

      <div className="w-full">
        <label
          htmlFor="charge_discharge_curve" className="font-semibold block text-sm text-gray-700" > Charge & Discharge Curve </label>
        <input
          type="file"
          name="charge_discharge_curve"
          id="charge_discharge_curve"
          className="rounded-md text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm w-full border p-2 focus:ring-2 focus:ring-primary"
          placeholder="100"
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
