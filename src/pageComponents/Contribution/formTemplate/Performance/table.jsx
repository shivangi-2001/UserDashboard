import { useContext } from "react";
import { StepperContext } from "../../StepperContext";

const Table = () => {
  const { contributionData, testcellIndex, matproIndex, setContributionData } = useContext(StepperContext);

  const performanceData =
    contributionData.enteries?.[matproIndex]?.testingCell?.[testcellIndex]?.performance || [];

  const handleDelete = (index) => {
    const listPerformance =
      contributionData.enteries[matproIndex].testingCell[testcellIndex].performance;

    if (!Array.isArray(listPerformance)) return;

    const updatedList = listPerformance.filter((_, idx) => idx !== index);

    const updatedMaterialProcessing = contributionData.enteries.map((item, idx) => {
      if (idx === matproIndex) {
        return {
          ...item,
          testingCell: item.testingCell.map((cell, cellIdx) => {
            if (cellIdx === testcellIndex) {
              return {
                ...cell,
                performance: updatedList,
              };
            }
            return cell;
          }),
        };
      }
      return item;
    });

    setContributionData((prev) => ({
      ...prev,
      enteries: updatedMaterialProcessing,
    }));
  };

  return (
    <div className="relative max-w-full overflow-x-auto border my-6 mx-auto">
      <table className="w-full text-sm text-left border whitespace-nowrap">
        <thead className="text-[10px] uppercase bg-gray-50">
          <tr className="border-b border-gray-200">
            <th className="p-2 border-r bg-gray-400">S.No</th>
            <th className="p-2 border-r">Cycle Number</th>
            <th className="p-2 border-r">Retention %</th>
            <th className="p-2 border-r">Charge Capacity (mAhg-1)</th>
            <th className="p-2 border-r">Charge Energy (WhKg-1)</th>
            <th className="p-2 border-r">Energy Efficiency</th>
            <th className="p-2 border-r">Coulombic Efficiency</th>
            <th className="p-2 border-r">Discharge Energy (WhKg-1)</th>
            <th className="p-2 border-r">Discharge Gravimetric Capacitance (Fg-1)</th>
            <th className="p-2 border-r">Discharge Areal Capacitance (Fcm-2)</th>
            <th className="p-2 border-r">Discharge Capacity (mAhg-1)</th>
            <th className="p-2 border-r">Open Circuit Voltage (Volt)</th>
            <th className="p-2 border-r">Active Cathode Volume (%)</th>
            <th className="p-2 border-r">Active Anode Volume (%)</th>
            <th className="p-2 border-r">Action</th>
          </tr>
        </thead>
        <tbody>
          {performanceData.length > 0 ? (
            performanceData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2 border-r">{index + 1}</td>
                <td className="p-2 border-r">{item.cycle_number}</td>
                <td className="p-2 border-r">{item.retention_percentage}</td>
                <td className="p-2 border-r">{item.charge_gravimetric_specifc_capacity}</td>
                <td className="p-2 border-r">{item.charge_gravimetric_specifc_energy}</td>
                <td className="p-2 border-r">{item.energy}</td>
                <td className="p-2 border-r">{item.coulombic}</td>
                <td className="p-2 border-r">{item.discharge_gravimetric_specific_energy}</td>
                <td className="p-2 border-r">{item.discharge_gravimetric_specific_capacitance}</td>
                <td className="p-2 border-r">{item.discharge_areal_specific_capacitance}</td>
                <td className="p-2 border-r">{item.discharge_gravimetric_specific_capacity}</td>
                <td className="p-2 border-r">{item.open_circuit_voltage}</td>
                <td className="p-2 border-r">{item.active_cathode_volume}</td>
                <td className="p-2 border-r">{item.active_anode_volume}</td>
                <td className="p-2 border-r">
                  <button
                    className="border p-1 rounded-md bg-red-600 text-white ml-2"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="15" className="text-left text-gray-400 select-none p-4">
                No Performances Added
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
