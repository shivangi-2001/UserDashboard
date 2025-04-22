import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterSet } from "../../features/searchInput";

const elements = [
  {name: "Sodium (Na)", Symbol: 'Na'},
  {name: "Lithium (Li)", Symbol: 'Li'},
  {name: "Magnesium (Mg)", Symbol: 'Mg'},
  {name: "Potassium (K)", Symbol: 'K'},
  {name: "Calcium (Ca)", Symbol: 'Ca'}
];

const ShuttlingIonSelector = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("Select Option");

  const handleSelection = (option) => {
    setSelected(option.name); 
    dispatch(setFilterSet({name: 'shuttling_ion', value: option.Symbol}));
  };

  return (
    <div className="flex flex-col w-full">
      <label htmlFor="shuttling_ion" className="text-md font-semibold capitalize mb-2" >
        Shuttling Ion
      </label>
      <Menu as="div" id="shuttling_ion" className="relative" name="shutling_ion" >
        <MenuButton className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none">
          {selected}
          <IoMdArrowDropdown className="w-5 ml-2" aria-hidden="true" />
        </MenuButton>
        <Transition enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95" >
            <MenuItems className="z-10 absolute w-full bg-white shadow-lg  border" >            
            {elements.map((ele, index) => (
              <MenuItem key={index}>
                {({ active }) => (
                  <p className={`block px-4 py-2 text-sm w-full text-left ${ active ? "bg-gray-100" : "" }`} onClick={() => handleSelection(ele)} >
                    {ele.name}
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

export default ShuttlingIonSelector;
