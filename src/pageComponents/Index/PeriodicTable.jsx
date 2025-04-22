import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText, setTab, setSelectedSymbol } from "../../features/searchInput";

import PeriodicElements from "../../utilis/periodicElements.json"
import { categoryColor } from "../../utilis/periodic";


const PeriodicTable = () => {
    const dispatch = useDispatch()
    
    const { tab, searchText, selectedSymbol } = useSelector(state => state.searchInput);
    
    const [Input, setInput] = useState(searchText);

    useEffect(() => {
        setInput(searchText);
    }, [searchText]);

    const [hoverElement, setHoverElement] = useState({
        symbol: "",
        category: "",
        number: "",
        name: "",
        mass: "",
    });
    
    useEffect(() => {
        if (Input) {
            dispatch(setSearchText(Input));
        }
    }, [Input, dispatch]);
    

    const handleHoverElement = (element) => {
        setHoverElement({
            symbol: element.symbol,
            category: element.category,
            number: element.number,
            name: element.name,
            mass: parseFloat(element.atomic_mass).toFixed(2),
        });
    };

    const handleElementClick = (symbol) => {
        dispatch(setSelectedSymbol(symbol))
        setInput((prevInput) => {
            let newInput = prevInput || "";
            if (typeof symbol === "number" || symbol === "(" || symbol === ")") {
              newInput += symbol;
            } else if (symbol === ".") {
              const lastNumber = newInput.split(/[^0-9.]+/).pop(); 
              if (!lastNumber.includes(".")) {
                newInput += symbol;
              }
            } else {
              if (tab === "formula") {
                newInput = newInput.split(",").join("") + symbol;
              } else {
                newInput = newInput ? `${newInput},${symbol}` : symbol;
              }
            }
            dispatch(setSearchText(newInput))
            return newInput;
        });
    };

    return (
        <div className="hidden md:flex flex-col items-center justify-center mx-auto border-2 p-1.5 bg-white overflow-hidden">
            <div className="relative">
            {hoverElement.symbol && (
                <div className={`absolute top-[44px] right-[13.4rem] w-[85px] h-[83px] text-center border ${categoryColor(hoverElement.category)}`}>
                    <div className="text-left ml-1 text-sm"> {hoverElement.number} </div>
                    <div className="text-center text-2xl"> {hoverElement.symbol}
                        <div className="text-center text-xs">{hoverElement.name}</div>
                    </div>
                    <div className="text-right text-[10px] mt-0.5">{hoverElement.mass}</div>
                </div>
            )}
            </div>
        

            {/* Periodic Table Key  */}
            <div className="grid grid-cols-18 gap-0.5">
                {PeriodicElements.map((ele, index) => (
                    <div key={index} 
                        className={`flex flex-col border w-[41px] h-[41px] border-gray-400 text-center hover:z-50 hover:scale-110 
                        ${categoryColor( ele.category )} ${ selectedSymbol.includes(ele.symbol) ? "border-2 opacity-50" : "" }`} 
                        style={{ gridColumnStart: ele.xpos, gridRowStart: ele.ypos, }}
                        onMouseEnter={() => handleHoverElement(ele)}
                        onMouseLeave={() => setHoverElement({ symbol: "", category: "" })}
                        onClick={() => handleElementClick(ele.symbol)}
                    >
                    <div className="text-left font-bold text-[8px] ml-0.5">
                        {ele.number}
                    </div>
                    <div className="font-bold text-[15px]">{ele.symbol}</div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default PeriodicTable;
