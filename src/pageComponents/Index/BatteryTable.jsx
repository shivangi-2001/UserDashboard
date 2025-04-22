import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from "@headlessui/react";
import { BatteryColumn } from "../../utilis/batteryColumns";
import { setCurrentPage, setRecords, setTotalRecords, toggleColumn } from "../../features/batteryContentTable";
import BatteryDataTable from "./BatteryDataTable";
import RowPerPage from "../../components/RowPerPage";
import Pagination from "../../components/Pagination";
import { useFetchbatteriesQuery } from "../../services/BatteryData";
import { useEffect } from "react";
import LoadingPage from "../../components/LoadingPage";


const BatteryTable = () => {
    const dispatch = useDispatch();
    const { defaultActiveColumns, rowPerPage, currentPage, totalRecords } = useSelector((state) => state.batteryContentTable);
    const { searchText, cell_parameter, query, sort_field } = useSelector(state => state.searchInput);


    const { data, isLoading } = useFetchbatteriesQuery({
        param_value: cell_parameter,
        searchText: searchText,
        page: currentPage,
        limit: rowPerPage,
        query: query,
        sort_field: sort_field.column,
        sort_order: sort_field.order
    }, { refetchOnMountOrArgChange: true });

    
    useEffect(() => {
        if(data){
            dispatch(setTotalRecords(data["total_records"]));
            dispatch(setRecords(data["data"]));
        }
    }, [data, dispatch])

    const IndexofFirstItem = (currentPage - 1) * rowPerPage + 1;
    const IndexofLastItem = Math.min(currentPage * rowPerPage, totalRecords);

    const paginate = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
    };
    
    
    return ( 
        <div className="z-100 bg-white border border-gray-300 text-[#202536] pt-2 rounded-md w-full mt-2">
            {/* Table Header */}
            <div className="flex justify-between items-center border-b pb-2 px-4">
                {!isLoading ? <div className="capitalize">
                    <span className="text-4xl mr-1">{totalRecords}</span> Matches your result 
                    <div className="capitalize text-sm"> Showing 
                        <span className="ml-1 font-semibold"> 
                            {IndexofFirstItem}-{IndexofLastItem}
                        </span>
                    </div>
                </div>: <LoadingPage />}
                <Menu as="div" className="relative flex justify-end">
                    <MenuButton className="flex items-center justify-between px-2 bg-primary border ring-1 ring-slate-800 border-gray-300 rounded-md shadow-sm py-1 text-white focus:outline-none">
                        Columns
                        <IoIosArrowDropdownCircle className="w-5 ml-2" aria-hidden="true" />
                    </MenuButton>
                    <Transition enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95" >
                        <MenuItems className="z-10 absolute top-7 right-0 mt-2 w-96 h-80 overflow-y-scroll bg-white border border-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {BatteryColumn.map((col, index) => (
                            <MenuItem key={index}>
                            {() => (
                                <div className="flex-1 align-middle gap-2 items-center px-4 py-2 hover:bg-slate-100 hover:font-semibold" onChange={() => dispatch(toggleColumn(col))}>
                                <input type="checkbox" defaultChecked={defaultActiveColumns[col]} className="size-4 accent-emerald-400" onClick={(e) => e.stopPropagation()} />
                                <span className={`text-md ml-2 capitalize text-gray-700 `} > {col} </span>
                                </div>
                            )}
                            </MenuItem>
                        ))}
                        </MenuItems>
                    </Transition>
                </Menu>
            </div>

            {/* Table Content */}
            <BatteryDataTable/>

            {/* Page Content  */}
            <div className="flex flex-1 justify-end align-middle bg-gray-50 border-b p-3 gap-5">
                <RowPerPage />
                <Pagination
                    rowsPerPage={rowPerPage}
                    totalRows={totalRecords}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
}

export default BatteryTable;
