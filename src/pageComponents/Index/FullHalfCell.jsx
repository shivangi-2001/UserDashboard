import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterSet } from "../../features/searchInput";

const cell = [ "Half Cell", "Full Cell" ];

const FullHalfCell = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("Select Option");

  const handleSelection = (option) => {
    setSelected(option); 
    if(option === 'Full Cell')
        dispatch(setFilterSet({name: 'full_half_cell', value: 'Full'}));
    else dispatch(setFilterSet({name: 'full_half_cell', value: 'Half'}));
  };

  return (
    <div className="flex flex-col w-full">
      <label htmlFor="full_half" className="text-md font-semibold capitalize mb-2" >
        Full/Half Cell
      </label>
      <Menu as="div" id="full_half" className="relative" name="full_half_cell" >
        <MenuButton className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none">
          {selected}
          <IoMdArrowDropdown className="w-5 ml-2" aria-hidden="true" />
        </MenuButton>
        <Transition enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95" >
            <MenuItems className="absolute border w-full bg-gray-300/10 shadow-lg" >            
            {cell.map((c, index) => (
              <MenuItem key={index}>
                {({ active }) => (
                  <p className={`block px-4 py-2 text-sm w-full text-left ${ active ? "bg-gray-100" : "" }`} onClick={() => handleSelection(c)} >
                    {c}
                  </p>               
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default FullHalfCell;
