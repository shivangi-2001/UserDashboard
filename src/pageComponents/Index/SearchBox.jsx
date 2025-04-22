import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Menu, Transition, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoMdArrowDropdown } from "react-icons/io";
import periodic_icon from "../../assets/periodic_icon.png";
import PeriodicTable from "./PeriodicTable";
import { setCell, setSearchText, setWindowParams, setCellParamater } from "../../features/searchInput";
import Tabs from "./Tabs";
import { BsFillQuestionCircleFill } from "react-icons/bs";


const getParameter = (params, tab) => {
  const map = {
    "electrode,include": "electrode_include",
    "electrode,exclude": "electrode_exclude",
    "electrode,formula": "electrode_formula",
    "anode,formula": "anode_formula",
    "anode,include": "anode_include",
    "anode,exclude": "anode_exclude",
    "cathode,formula": "cathode_formula",
    "cathode,include": "cathode_include",
    "cathode,exclude": "cathode_exclude",
  };
  return map[`${params},${tab}`] || "";
};

const CellList = [
  "electrode_include", "electrode_exclude", "electrode_formula",
  "anode_formula", "anode_include", "anode_exclude",
  "cathode_exclude", "cathode_include", "cathode_formula",
];

const dropdown_options = ["Electrode", "Cathode", "Anode"];

const SearchBox = ({ batteryContentRef }) => {
  const dispatch = useDispatch();
  const [hidePeriodicTable, setHidePeriodicTable] = useState(false);
  const [hideInfo, setHideinfo] = useState(false);

  const [error, setError] = useState(""); 

  const togglePeriodicTable = () => {
    setHidePeriodicTable((prev) => !prev);
  };
  const toggleHideInfo = () => {
    setHideinfo((prev) => !prev);
  };

  const handleMaterialClick = (option) => {
    dispatch(setCell(option.toLowerCase()));
  };

  const { searchText, cell, tab, window_params } = useSelector((state) => state.searchInput);

  const [searchURL, setSearchURL] = useSearchParams();
  const param_value = getParameter(cell, tab);


  const handleSubmit = () => {
    try {
      CellList.forEach((cell) => searchURL.delete(cell));
      searchURL.set(param_value, searchText);
      setSearchURL(searchURL, { replace: true });
      dispatch(setWindowParams(window.location.search));
      batteryContentRef?.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Search failed", error);
      setError("An error occurred while processing your search.");
    }
  };

  const handleKeySearch = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (window_params !== window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.delete(param_value);
      setSearchURL(urlParams.toString(), { replace: true });
      dispatch(setWindowParams(window.location.search));
    }
  }, [window_params, param_value, setSearchURL, dispatch]);

  return (
    <div className="grid grid-flow-row justify-center md:mb-10">
      {/* Error Message */}
      {error && <div className="text-red-500 text-center mt-2">{error}</div>}

      <div className="flex items-center justify-center">
        {/* Dropdown Menu */}
        <Menu as="div" className="relative w-28">
          <MenuButton className="w-full h-12 bg-primary text-white flex justify-center items-center border-r border-gray-500">
            {cell ? cell[0].toUpperCase() + cell.slice(1) : "Electrode"}
            <IoMdArrowDropdown />
          </MenuButton>
          <Transition enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95" >
            <MenuItems className="absolute mt-1 w-full bg-white shadow-lg z-30">
              {dropdown_options.map((option, index) => (
                <MenuItem key={index}>
                  {({ active }) => (
                    <p
                      onClick={() => handleMaterialClick(option)}
                      className={`p-2 text-center cursor-pointer ${active ? "bg-gray-300" : ""}`}
                    >
                      {option}
                    </p>
                  )}
                </MenuItem>
              ))}
            </MenuItems>
          </Transition>
        </Menu>
        
        {/* Search Input */}
        <input autoComplete="off" type="text" placeholder="e.g. Na,V or Na3V2(PO4)3" 
          className="w-full border-y border-gray-500 p-2 pl-4 md:w-[500px] text-lg h-12" 
          value={searchText} 
          onChange={(e) => dispatch(setSearchText(e.target.value))} 
          onKeyDown={handleKeySearch} 
        />

        {/* info button */}
        <button className="h-12 border-y border-gray-500 border-r bg-white p-1.5 active:outline" title="Show Periodic Table" onClick={toggleHideInfo} >
          <BsFillQuestionCircleFill size={18}/>
        </button>
        
        {/* Periodic Table Button */}
        <button className="hidden md:flex items-center justify-center border mx-[1px] border-red-500 bg-red-100 h-12" title="Show Periodic Table" onClick={togglePeriodicTable} >
          <img src={periodic_icon} alt="periodic-table-img" className="h-full object-contain p-1 w-15 border" />
        </button>


        {/* Search Button */}
        <button className="bg-primary text-white p-2 h-12 w-32" onClick={handleSubmit}>
          Search
        </button>
      </div>

      <Tabs />

      <div className="relative">
      <div className={`absolute -top-8 z-99 md:w-[530px] md:ml-28 h-30 border-2 overflow-scroll transition-all duration-300 ${!hideInfo ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100"}`}>
          <div className="bg-white p-2 text-xs overflow-scroll">
            <p className="mb-3">Search Example</p>
            <div className="text-[16px] font-bold flex flex-col gap-3">
              <p>Include at least elements in formula charge: <span className="font-thin text-blue-600 bg-gray-200 px-1.5 py-0.5 text-[16px]"><a href="" className="hover:underline">Fe,O,Ti</a></span></p>
              <p>Include only elements in formula charge:</p>
              <p>Include only elements plus wildcards in formula charge:</p>
              <p>Has formula charge:</p>
              <p>Has formula charge with wildcard atoms:</p>
            </div>
            <p className="mt-5">Search by working ion and more using the filters panel below.</p>
          </div>
        </div>

      <div className={`z-1 overflow-scroll transition-all duration-300 ${!hidePeriodicTable ? "max-h-0 opacity-0 translate-y-[-10px]" : "max-h-[500px] opacity-100 translate-y-0"}`} >
          <PeriodicTable />
      </div>
      </div>
      {/* info tab */}
      
    </div>
  );
};

export default SearchBox;
