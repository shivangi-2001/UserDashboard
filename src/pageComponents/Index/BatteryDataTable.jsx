import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BatteryColumn, extractValue } from "../../utilis/batteryColumns";
import { setBatteryId  } from "../../features/batteryContentTable";
import { useMemo } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { setSorting } from "../../features/searchInput";


const sort_columns = {   
    "Current Density (mA/g)": "current_density_mag",
    "Temperature (K)": "temperature",
    "Minium Voltage (V)": "min_voltage",
    "Maximum Voltage (V)": "max_voltage",
    "Cycle number": "cycle_number",
    "Retention Percentage of Capacity": "retention_percentage",
    "Discharge Gravimetric Specific  Capacity (mAh/g)": "discharge_gravimetric_specific_capacity",	
    "Discharge Gravimetric  Specific Energy (WhKg-1)": "discharge_gravimetric_specific_energy",
}

const BatteryDataTable = () => {
    const dispatch = useDispatch();
    const { defaultActiveColumns, records } = useSelector(state => state.batteryContentTable);
    const activeColumns = useMemo(() => 
        BatteryColumn.filter(column => defaultActiveColumns[column]), 
        [defaultActiveColumns]
    );

    const { sort_field } = useSelector(state => state.searchInput);

    const handleSort = (column) => {
        if (!sort_columns[column]) return; 
        dispatch(setSorting({ column: sort_columns[column] }));
    };


    return ( 
        <div className="overflow-x-scroll">
            <table className="table-fixed w-full z-99">
                <thead className="border-b border-t-2 bg-base-200 text-sm font-light">
                    <tr>{activeColumns.map((column, index) => 
                        <th key={index} className="border-r border-b-2 border-gray-200 cursor-pointer" onClick={() => handleSort(column)} >
                            <span className="flex justify-center gap-1 items-center">
                                {column}
                                {sort_columns[column] && (
                                    (sort_field.column === sort_columns[column] && sort_field.order === "asc") ? <MdKeyboardDoubleArrowUp /> : <MdKeyboardDoubleArrowDown />
                                )}
                            </span>
                        </th>)}
                    </tr>
                </thead>
                <tbody>
                {records && records.length === 0 ? (
                    <td colSpan={activeColumns.length} className="text-center p-10 text-2xl opacity-20 select-none">
                        No Data Available
                    </td>
                ) : (
                    records?.map((data, rowIndex) => (
                        <tr key={`row-${rowIndex}`} className={`text-center ${rowIndex === data.length - 1 ? "" : "border-b border-gray-200"}`}>
                        {activeColumns.map((column, colIndex) => (
                            <td key={`col-${rowIndex}-${colIndex}`} className="border-r p-2 truncate">
                            {column === "ID" && (<Link  to={`batteries/${data.condition}`} className="underline text-blue-600 cursor-pointer">{data.condition}</Link>)}
                            {column === "Shuttling Ion" && data.shuttling_ion}
                            {column === "Active Cathode" && data.active_cathode}
                            {column === "Elements in Cathode" && data.element_cathode.join(", ")}
                            {column === "Active Anode" && data.active_anode}
                            {column === "Elements in Anode" && data.element_anode.join(", ")}
                            {column === "Electrolyte Salt, Solvent & Additives" && data.electrolyte}
                            {column === "Separator" && data.separator}
                            {column === "Processing Details" && data.processing}
                            {column === "Current Density (mA/g)" && extractValue(data.current_density_mag)}
                            {column === "Current Density (C)" && extractValue(data.current_density_c)}
                            {column === "Temperature (K)" && extractValue(data.temperature)}
                            {column === "Testing Environment" && data.testing_env}
                            {column === "Minium Voltage (V)" && extractValue(data.min_voltage)}
                            {column === "Maximum Voltage (V)" && extractValue(data.max_voltage)}
                            {column === "Measurement Method" && data.measurement_method}
                            {column === "Cell Component Weight (specific gravimetric calculation)" && data.cellComponentWeight}
                            {column === "Total weight of active anode (g)" && extractValue(data.tw_active_anode)}
                            {column === "Total weight of active cathode (g)" && extractValue(data.tw_active_cathode)}
                            {column === "Total weight of anode (g)" && extractValue(data.tw_anode)}
                            {column === "Total weight of cathode (g)" && extractValue(data.tw_cathode)}
                            {column === "Total weight of cell without casing (g)" && extractValue(data.tw_cell_without_casing)}
                            {column === "Total weight of cell (g)" && extractValue(data.tw_cell)}
                            {column === "Total volume of active anode (cm3)" && extractValue(data.tv_active_anode)}
                            {column === "Total volume of active cathode (cm3)" && extractValue(data.tv_active_cathode)}
                            {column === "Total volume of anode (cm3)" && extractValue(data.tv_anode)}
                            {column === "Total volume of cathode (cm3)" && extractValue(data.tv_cathode)}
                            {column === "Total volume of cell without casing (cm3)" && extractValue(data.tv_cell_without_casing)}
                            {column === "Total volume of cell (cm3)" && extractValue(data.tv_cell)}
                            {column === "Total area of the cathode (cm2)" && extractValue(data.ta_cathode)}
                            {column === "Total area of the anode (cm2)" && extractValue(data.ta_anode)}
                            {column === "Full or Half Cell" && data.full_half_cell}
                            {column === "Active cathode volume expansion (%)" && extractValue(data.active_cathode_volume)}
                            {column === "Active anode volume expansion (%)" && extractValue(data.active_cathode_volume)}
                            {column === "Cycle number" && data.cycle_number}
                            {column === "Retention Percentage of Capacity" && extractValue(data.retention_percentage)}
                            {column === "Discharge Gravimetric Specific  Capacity (mAh/g)" && extractValue(data.discharge_gravimetric_specific_capacity)}
                            {column === "Discharge Gravimetric  Specific Energy (WhKg-1)" && extractValue(data.discharge_gravimetric_specific_energy)}
                            {column === "Discharge  Gravimetric  Specific  Capacitance (F/g)" && extractValue(data.discharge_gravimetric_specific_capacitance)}
                            {column === "Discharge Areal  Specific Capacitance  (F/cm2)" && extractValue(data.discharge_areal_specific_capacitance)}
                            {column === "Charge Gravimetric Specific  Capacity (mAh/g)" && extractValue(data.charge_gravimetric_specifc_capacity)}
                            {column === "Charge Gravimetric   Specific  Energy (WhK/g)" && extractValue(data.charge_gravimetric_specifc_energy)}
                            {column === "Energy Effeciency" && data.energy}
                            {column === "Coulombic Effeciency" && data.coulombic}
                            {column === "Open Circuit Voltage (Volt)" && data.open_circuit_voltage}
                            </td>
                        ))}
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}
 
export default BatteryDataTable;