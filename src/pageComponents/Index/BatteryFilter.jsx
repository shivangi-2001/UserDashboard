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
        <div className="bg-slate-100 p-3 md:p-6">
            <div className=" text-gray-800 pt-2 rounded-md w-full md:w-[80%] mx-auto mt-2">
                {/* Header Section */}
                <div className="flex justify-between items-center py-4 border-b border-black/20">
                    <h2 className="text-2xl mx-3 font-bold">Filters</h2>
                    <div className="flex items-center gap-2">
                        <button 
                            className="rounded-md bg-red-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"                        
                            onClick={resetHandler} >
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
                <div className={`mb-4 transition-all duration-300 ${ hideFilter ? "max-h-0 opacity-0 translate-y-[-10px] pointer-events-none" : "opacity-100 translate-y-0 pointer-events-auto" }`} >                
                    <form className="py-2 space-y-4">
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
        </div>
    );
};

export default BatteryFilter;
