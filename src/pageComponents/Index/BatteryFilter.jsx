import React, { useState, useEffect } from "react";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setFilterSet, setQuery, setReset } from "../../features/searchInput";
import ShuttlingIonSelector from "./ShuttlingIon";
import MeasurementMethod from "./MeasurementMethod";
import FullHalfCell from "./FullHalfCell";

const filter_min_parameter = [
    { label: "Discharge Gravimetric Specific Capacity", name: 'discharge_capacity', min: 0 },
    { label: "Current Density (mA/g)", name: 'min_current_density', min: 0 },
    { label: "Retention Percentage (%)", name: 'min_retention_percentage', min: 50 },
    { label: "Cycle Number", name: 'min_cycle_number', min: 0 },
    { label: "Discharge Gravimetric Specific Energy", name: 'min_discharge_gravimetric_specific_energy', min: 0 },
];

const filter_maxmin_parameter = [
    { label: "Temperature (K)", min_name: 'min_temperature', max_name: 'max_temperature', min: 0, max: 10000 },
    { label: "Voltage (V)", min_name: 'min_voltage', max_name: 'max_voltage', min: 0, max: 10000 }
];

const BatteryFilter = () => {
    const dispatch = useDispatch();
    const { filter_set } = useSelector(state => state.searchInput);
    const [hideFilter, setHideFilter] = useState(true);

    const getQuery = () => {
        return Object.entries(filter_set)
            .filter(([_, value]) => value !== '')
            .map(([key, value]) => `${key}=${value}`)
            .join("&");
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        dispatch(setFilterSet({ name, value }));
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(setQuery(getQuery()));
        }, 300);
        return () => clearTimeout(timeout);
    }, [filter_set, dispatch]);

    const resetHandler = () => {
        dispatch(setReset());
    };

    return (
        <div className="bg-white text-gray-800 px-4 pt-2 rounded-md border w-full mt-2 shadow-lg">
            {/* Header Section */}
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-2xl">Filters</h2>
                <div className="flex items-center gap-2">
                    <button className="border border-gray-500 px-3 py-1 rounded-lg hover:border-red-600 hover:text-red-600 transition" onClick={resetHandler} >
                        Reset
                    </button>
                    {hideFilter ? (
                        <MdOutlineArrowDropUp className="w-7 h-7 cursor-pointer" onClick={() => setHideFilter(false)} />
                    ) : (
                        <MdOutlineArrowDropDown className="w-7 h-7 cursor-pointer" onClick={() => setHideFilter(true)} />
                    )}
                </div>
            </div>

            {/* Animated Filter Section */}
            <div className={`mb-4 overflow-hidden transition-all duration-500 ${ hideFilter ? "max-h-0 opacity-0 translate-y-[-10px] pointer-events-none" : "max-h-[500px] opacity-100 translate-y-0 pointer-events-auto" }`} >                
                <form className="p-4 space-y-4">
                    <div className="grid md:grid-cols-4 gap-4">
                        {/* Min Filters */}
                        {filter_min_parameter.map((filter, index) => (
                            <div key={index} className="flex flex-col">
                                <label className="font-semibold">{filter.label}</label>
                                <input
                                    type="number"
                                    name={filter.name}
                                    placeholder="Min"
                                    value={filter_set[filter.name] || ""}
                                    onChange={onChangeHandler}
                                    min={filter.min}
                                    className="w-full bg-white border border-gray-300 rounded-lg shadow-sm px-3 py-2 text-gray-900 hover:bg-gray-100 focus:outline-none"
                                />
                            </div>
                        ))}

                        {/* Max/Min Filters */}
                        {filter_maxmin_parameter.map((filter, index) => (
                            <div key={index} className="flex flex-col">
                                <label className="font-semibold">{filter.label}</label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        name={filter.min_name}
                                        placeholder="Min"
                                        value={filter_set[filter.min_name] || ""}
                                        onChange={onChangeHandler}
                                        min={filter.min}
                                        className="w-full bg-white border border-gray-300 rounded-lg shadow-sm px-3 py-2 text-gray-900 hover:bg-gray-100 focus:outline-none"
                                    />
                                    <input
                                        type="number"
                                        name={filter.max_name}
                                        placeholder="Max"
                                        value={filter_set[filter.max_name] || ""}
                                        onChange={onChangeHandler}
                                        max={filter.max}
                                        className="w-full bg-white border border-gray-300 rounded-lg shadow-sm px-3 py-2 text-gray-900 hover:bg-gray-100 focus:outline-none"
                                    />
                                </div>
                            </div>
                        ))}

                        <ShuttlingIonSelector />
                        <MeasurementMethod />
                        <FullHalfCell />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BatteryFilter;
