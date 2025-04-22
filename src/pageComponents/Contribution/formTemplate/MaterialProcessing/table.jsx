import { useContext } from "react";
import { StepperContext } from "../../StepperContext";

const Table = ({ goToNext }) => {
    const { contributionData, setMatproIndex, setContributionData } = useContext(StepperContext);

    const handleDelete = (index) => {
        const updatedList = contributionData.enteries.filter((_, idx) => idx !== index);
      
        setContributionData(prev => ({
          ...prev,
          enteries: updatedList,
        }));
    };
    

    return (
        <div className="relative overflow-x-auto border my-6 mx-auto">
            <table className="text-sm text-left rtl:text-right w-full">
                <thead className="text-[10px] uppercase bg-gray-200">
                    <tr className="border-b border-gray-200 text-center">
                        <th scope="col" className="w-[0.03px] border-e border-e-black-1">S.No</th>
                        <th scope="col" className="p-2 border-e border-e-black-1">Shuttling Ion</th>
                        <th scope="col" className="p-2 border-e border-e-black-1">Active Cathode</th>
                        <th scope="col" className="p-2 border-e border-e-black-1">Element Cathode</th>
                        <th scope="col" className="p-2 border-e border-e-black-1">Active Anode</th>
                        <th scope="col" className="p-2 border-e border-e-black-1">Element Anode</th>
                        <th scope="col" className="p-2 border-e border-e-black-1">Electrolyte</th>
                        <th scope="col" className="p-2 border-e border-e-black-1">Separator</th>
                        <th scope="col" className="p-2 border-e border-e-black-1">Processing</th>
                        <th scope="col" className="p-2 border-e border-e-black-1">Add Testing Condition</th>
                        <th scope="col" className="p-2 border-e border-e-black-1">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {contributionData.enteries?.length > 0 ? (
                        contributionData.enteries.map((row, index) => (
                            <tr key={index} className="border-b border-gray-200 text-[13px] text-center h-[90px]">
                                <td className="bg-gray-400/10">
                                    <div className="h-[90px] overflow-y-auto">{index + 1}</div>
                                </td>
                                <td className="border-r">
                                    <div className="h-[90px] overflow-y-auto">{row.shuttling_ion}</div>
                                </td>
                                <td className="border-r">
                                    <div className="h-[90px] overflow-y-auto">{row.active_cathode}</div>
                                </td>
                                <td className="border-r">
                                    <div className="h-[90px] overflow-y-auto">
                                        {(Array.isArray(row.element_cathode) ? row.element_cathode : row.element_cathode?.split(',')).join(', ')}
                                    </div>
                                </td>
                                <td className="border-r">
                                    <div className="h-[90px] overflow-y-auto">{row.active_anode}</div>
                                </td>
                                <td className="border-r">
                                    <div className="h-[90px] overflow-y-auto">
                                    {(Array.isArray(row.element_anode) ? row.element_anode : row.element_anode?.split(',')).join(', ')}
                                    </div>
                                </td>
                                <td className="border-r">
                                    <div className="h-[90px] overflow-y-auto">{row.electrolyte}</div>
                                </td>
                                <td className="border-r">
                                    <div className="h-[90px] overflow-y-auto">{row.separator}</div>
                                </td>
                                <td className="border-r">
                                    <div className="h-[90px] overflow-y-auto">{row.processing}</div>
                                </td>
                                <td className="border-r">
                                    <div className="h-[90px] flex items-center justify-center">
                                        <button className="border p-1 rounded-md bg-primary text-white" onClick={() => { setMatproIndex(index); goToNext(); }}>
                                            Add Testing Cell
                                        </button>
                                    </div>
                                </td>
                                <td className="border-r">
                                    <div className="h-[90px] flex items-center justify-center">
                                        <button onClick={() => handleDelete(index)} className="border p-1 rounded-md bg-red-600 text-white">Delete</button>
                                    </div>
                                </td>
                            </tr>

                        ))
                    ) : (
                        <tr>
                            <td colSpan="11" className="text-center text-gray-400 select-none p-4">No Data Added</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
