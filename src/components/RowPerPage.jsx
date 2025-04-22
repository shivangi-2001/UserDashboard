import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { LuRows3 } from "react-icons/lu";
import { setRowsPerPage } from "../features/batteryContentTable";

const pageRow = [
  { name: "10 / Page", count: 10 },
  { name: "20 / Page", count: 20 },
  { name: "30 / Page", count: 30 },
  { name: "50 / Page", count: 50 },
];

const RowPerPage = () => {
  const dispatch = useDispatch();
  const { rowPerPage } = useSelector((state) => state.batteryContentTable);

  const handleCheckboxChange = (rows) => {
    dispatch(setRowsPerPage(rows));
  };

  return (
    <React.Fragment>
      <Menu as="div" className="relative inline-block text-left place-content-center">
        <MenuButton className="inline-flex justify-center w-full p-1 text-sm font-medium border bg-blue-600 text-white rounded-md focus:outline-none">
          <div className="relative group">
            <LuRows3 width={'50px'} />
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 w-[80px] px-2 py-1 text-[12px] text-white bg-slate-500 rounded shadow-lg opacity-0 group-hover:opacity-100"> 
                page size
            </div>
          </div>
        </MenuButton>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="z-10 absolute -top-36 right-0 w-40 bg-white border border-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {pageRow.map((page, index) => (
              <MenuItem key={index} as="div" className="flex items-center gap-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <input
                  type="checkbox"
                  className="mr-2 size-5 accent-pink-500"
                  checked={rowPerPage === page.count}
                  onChange={() => handleCheckboxChange(page.count)}
                />
                <span>{page.name}</span>
              </MenuItem>
            ))}
          </MenuItems>
        </Transition>
      </Menu>
    </React.Fragment>
  );
};

export default RowPerPage;
