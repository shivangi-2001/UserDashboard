import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { useDispatch } from "react-redux"; 
import { useRelatedResearchMutation } from "../../services/BatteryData";
import { extractValue, relatedResearchColumn } from "../../utilis/batteryColumns";
import { setBatteryId } from "../../features/batteryContentTable"; 

const RelatedResearch = ({ id, contentRef }) => {
    const [datas, setDatas] = useState([]); 
    const [error, setError] = useState(null);
    const [researchAPI, { isLoading }] = useRelatedResearchMutation();
    const dispatch = useDispatch();

    const researchHandle = async () => {
        try {
            if (!id) {
                throw new Error("ID parameter is missing");
            }
            const result = await researchAPI({ id }).unwrap();
            if (result?.message) {
                setDatas(result.message);
                setError(null);
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (error) {
            setError(error?.data?.error_message || error.message || "An error occurred");
            setDatas([]); 
        }
    };

    useEffect(() => {
        researchHandle();
    }, [id]); 

    return (
        <div className="max-w-full max-h-96 overflow-auto border border-gray-300 rounded-md touch-pan-x touch-pan-y">
            {error && <p className="text-red-600">{error}</p>}
            <table className="w-full bg-white border-collapse">
                <thead>
                    <tr>
                        {relatedResearchColumn.map((col, index) => (
                            <th
                                key={index}
                                className="p-0.5 border border-gray-200 bg-gray-100 sticky top-0"
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {datas.map((data, rowIndex) => (
                        <tr key={rowIndex} className="border">
                            {relatedResearchColumn.map((column, colIndex) => (
                                <td key={`col-${rowIndex}-${colIndex}`} className="border p-2 truncate text-center">
                                    {column === "ID" && (
                                        <Link onClick={() => { contentRef?.current?.scrollIntoView({ behavior: "smooth" });
                                            dispatch(setBatteryId(data._id))}} to={`/batteries/${data.condition}`} className="underline text-blue-600" > {data.condition} </Link>
                                    )}
                                    {column === "Active Cathode" && data.active_cathode}
                                    {column === "Active Anode" && data.active_anode}
                                    {column === "Current Density (mA/g)" && extractValue(data.current_density_mag)}
                                    {column === "Current Density (C)" && extractValue(data.current_density_c)}
                                    {column === "Temperature (K)" && extractValue(data.temperature)}
                                    {column === "Testing Environment" && data.testing_env}
                                    {column === "Minium Voltage (V)" && extractValue(data.min_voltage)}
                                    {column === "Maximum Voltage (V)" && extractValue(data.max_voltage)}
                                    {column === "Measurement Method" && data.measurement_method}
                                    {column === "Full or Half Cell" && data.full_half_cell}
                                    {column === "Cycle number" && data.cycle_number}
                                    {column === "Retention Percentage of Capacity" && extractValue(data.retention_percentage)}
                                    {column === "Discharge Gravimetric Specific  Capacity (mAh/g)" && extractValue(data.discharge_gravimetric_specific_capacity)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RelatedResearch;
