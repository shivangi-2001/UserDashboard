import { useContext } from "react";
import { StepperContext } from "../../StepperContext";

const Table = ({ goToNext }) => {
    const { contributionData, matproIndex, setTestcellIndex, setContributionData } = useContext(StepperContext);

    // find the testing cell assoicated with matproIndex
    const testingCell = contributionData?.enteries?.[matproIndex]?.testingCell || [];

    const handleDelete = (index) => {
        const listTestingCell = contributionData.enteries[matproIndex]?.testingCell;
        if (!Array.isArray(listTestingCell)) return;
      
        const updatedTestingCell = listTestingCell.filter((_, idx) => idx !== index);
      
        const updatedEntries = contributionData.enteries.map((item, idx) => {
          if (idx === matproIndex) {
            return {
              ...item,
              testingCell: updatedTestingCell,
            };
          }
          return item;
        });
      
        setContributionData(prev => ({
          ...prev,
          enteries: updatedEntries,
        }));
    };

    return (
        <div className="relative max-w-full overflow-x-auto border my-6 mx-auto">
            <table className="w-full text-sm text-left rtl:text-right border whitespace-nowrap">
                <thead className="text-[10px] uppercase bg-gray-50">
                    <tr className="border-b border-gray-200">
                        <th scope="col" className="p-2 border-r bg-gray-400">S.No</th>
                        <th scope="col" className="p-2 border-r">Current Density (mAg-1)</th>
                        <th scope="col" className="p-2 border-r">Current Density (C)</th>
                        <th scope="col" className="p-2 border-r">Temperature (K)</th>
                        <th scope="col" className="p-2 border-r">Testing Environment</th>
                        <th scope="col" className="p-2 border-r">Minimum Voltage (V)</th>
                        <th scope="col" className="p-2 border-r">Maximum Voltage (V)</th>
                        <th scope="col" className="p-2 border-r">Full or Half Cell</th>
                        <th scope="col" className="p-2 border-r">Measurement Method</th>
                        <th scope="col" className="p-2 border-r">Cell Component Weight Considered</th>
                        <th scope="col" className="p-2 border-r">Total weight of active anode (g)</th>
                        <th scope="col" className="p-2 border-r">Total weight of active cathode (g)</th>
                        <th scope="col" className="p-2 border-r">Total weight of anode (g)</th>
                        <th scope="col" className="p-2 border-r">Total weight of cathode (g)</th>
                        <th scope="col" className="p-2 border-r">Total weight of cell without casing (g)</th>
                        <th scope="col" className="p-2 border-r">Total weight of cell (g)</th>
                        <th scope="col" className="p-2 border-r">Total volume of active anode (cm³)</th>
                        <th scope="col" className="p-2 border-r">Total volume of active cathode (cm³)</th>
                        <th scope="col" className="p-2 border-r">Total volume of anode (cm³)</th>
                        <th scope="col" className="p-2 border-r">Total volume of cathode (cm³)</th>
                        <th scope="col" className="p-2 border-r">Total volume of cell without casing (cm³)</th>
                        <th scope="col" className="p-2 border-r">Total volume of cell (cm³)</th>
                        <th scope="col" className="p-2 border-r">Total area of the cathode (cm²)</th>
                        <th scope="col" className="p-2 border-r">Total area of the anode (cm²)</th>
                        <th scope="col" className="p-2 border-r">Add Performance</th>
                        <th scope="col" className="p-2 border-r">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {testingCell.length > 0 ? (
                        testingCell.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-2 border-r">{index + 1}</td>
                                <td className="p-2 border-r">{item.current_density_mag}</td>
                                <td className="p-2 border-r">{item.current_density_c}</td>
                                <td className="p-2 border-r">{item.temperature}</td>
                                <td className="p-2 border-r">{item.testing_env}</td>
                                <td className="p-2 border-r">{item.min_voltage}</td>
                                <td className="p-2 border-r">{item.max_voltage}</td>
                                <td className="p-2 border-r">{item.full_half}</td>
                                <td className="p-2 border-r">{item.measurement_method}</td>
                                <td className="p-2 border-r">{item.cellComponentWeight}</td>
                                <td className="p-2 border-r">{item.tw_active_anode}</td>
                                <td className="p-2 border-r">{item.tw_active_cathode}</td>
                                <td className="p-2 border-r">{item.tw_anode}</td>
                                <td className="p-2 border-r">{item.tw_cathode}</td>
                                <td className="p-2 border-r">{item.tw_cell_without_casing}</td>
                                <td className="p-2 border-r">{item.tw_cell}</td>
                                <td className="p-2 border-r">{item.tv_active_anode}</td>
                                <td className="p-2 border-r">{item.tv_active_cathode}</td>
                                <td className="p-2 border-r">{item.tv_anode}</td>
                                <td className="p-2 border-r">{item.tv_cathode}</td>
                                <td className="p-2 border-r">{item.tv_cell_without_casing}</td>
                                <td className="p-2 border-r">{item.tv_cell}</td>
                                <td className="p-2 border-r">{item.ta_cathode}</td>
                                <td className="p-2 border-r">{item.ta_anode}</td>
                                <td className="p-2 border-r">
                                    <button
                                        className="border p-1 rounded-md bg-primary text-white"
                                        onClick={() => {
                                            goToNext();
                                            setTestcellIndex(index);
                                        }}
                                    >
                                        Add Performance
                                    </button>
                                </td>
                                <td className="p-2 border-r">
                                    <button onClick={() => handleDelete(index)} className="border p-1 rounded-md bg-red-600 text-white">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="26" className="text-left text-gray-400 select-none p-4">
                                No Testing & Cell information Added
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
