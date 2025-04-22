import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTab, setSearchText } from "../../features/searchInput";


const Tabs = () => {
    const dispatch = useDispatch();
    const { tab, searchText } = useSelector(state => state.searchInput)
    const [Input, setInput] = useState(searchText);

    useEffect(() => {    
            setInput(searchText);
    }, [searchText]);

    const handleTabChange = (tab) => {
        dispatch(setTab(tab));
        // Instead of dispatching directly here, set the searchInput state
        setInput((prevInput) => {
            if (!prevInput) return "";
            let convertedInput;
            if (!/[a-zA-Z]/.test(prevInput)) {
                return prevInput;
            }
            if (tab === "formula") {
                convertedInput = prevInput
                    ?.replace(/[^a-zA-Z]/g, "")
                    .match(/[A-Z][a-z]*/g)
                    .join("");
            } else {
                convertedInput = prevInput
                    ?.replace(/[^a-zA-Z]/g, "")
                    .match(/[A-Z][a-z]*/g)
                    .join(",");
            }
            return convertedInput;
        });
    };

    useEffect(() => {
        if (Input) {
            dispatch(setSearchText(Input));
        }
    }, [Input, dispatch]);


    return ( 
    <div className={`flex flex-row mx-auto text-sm h-8 w-full ring-1 ring-inset ring-slate-400 border-slate-800 bg-white `}>
        <div className="relative w-1/3 border-r group">
          <input type="radio" id="include" name="tab" className="m-0 w-0 h-0 cursor-pointer opacity-0" value="include" checked={tab === "include"} onChange={() => handleTabChange("include")}/>
          <label htmlFor="include" className={`text-xs md:text-[14px] inline-flex w-full h-full items-center justify-center cursor-pointer transition-all ease-in hover:bg-slate-400 ${tab === "include" ? "bg-blue-200 text-slate-800" : ""} hover:text-white font-semibold`}>
              Include Elements
          </label>
          {/* <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 w-[200px] px-2 py-1 text-[12px] text-white bg-yellow-500 rounded shadow-lg opacity-0 group-hover:opacity-100"> 
            Select elements to search for battery materials with{" "} <b>including </b>these elements (ex: Li,Fe) 
          </div> */}
        </div>

        <div className="relative w-1/3 border-r-2 group">
            <input type="radio" id="exclude" name="tab" className="absolute m-0 w-0 h-0 cursor-pointer opacity-0" value="exclude" checked={tab === "exclude"} onChange={() => handleTabChange("exclude")}/>            
            <label htmlFor="exclude" className={`text-xs md:text-[14px] inline-flex w-full h-full items-center justify-center rounded cursor-pointer transition-all ease-in hover:bg-slate-400 ${tab === "exclude" ? "bg-blue-200 text-slate-800" : ""} hover:text-white font-semibold`}>Exclude Elements</label>
            {/* <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[200px] px-2 py-1 text-[12px] text-white bg-yellow-500 rounded shadow-lg opacity-0 group-hover:opacity-100"> 
            Select elements to search for battery materials with{" "} <b>excluding </b>these elements (ex: Li,Fe)
            </div> */}
        </div>

        <div className="relative w-1/3 group">
            <input type="radio" id="stiochiometry" name="tab" className="absolute m-0 w-0 h-0 cursor-pointer opacity-0" value="stiochiometry" checked={tab === "formula"} onChange={() => handleTabChange("formula")} />
            <label htmlFor="stiochiometry" className={` text-xs md:text-[14px] inline-flex w-full h-full items-center justify-center cursor-pointer transition-all ease-in hover:bg-slate-400 ${tab === "formula" ? "bg-blue-200 text-slate-800" : ""} hover:text-white font-semibold`}>
            Stiochiometry
            </label>
            {/* <div className="absolute top-1/2 left-full transform -translate-y-1/2 translate-x-2  w-[200px] px-2 py-1 text-[12px] text-white bg-yellow-500 rounded shadow-lg opacity-0 group-hover:opacity-100"> 
            Select stiochiometry to search for battery materials with{" "} (ex: Na2V3(PO4)3)
            </div> */}
        </div>
      </div>
    );
}
 
export default Tabs;