import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaReact, FaUserCog } from "react-icons/fa";
import { useLogoutMutation } from "../services/AuthLogout";
import { setLogout } from "../features/authentication";
import { Menu, MenuButton, MenuItems, MenuItem, Transition, } from "@headlessui/react";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.authenticated);
  const navigate = useNavigate();

  const [LogoutAPI, { isLoading }] = useLogoutMutation();

  const LogoutSubmit = async () => {
    try {
      const result = await LogoutAPI({}).unwrap();
      if (result.message) {
        dispatch(setLogout());
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="sticky top-0 z-10 flex w-full bg-body text-white tracking-[0.1em] mb-4 shadow-md">
      <div className="flex justify-between items-center w-full h-16 px-4 md:px-6">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2 text-xl h-full">
          <FaReact className="size-6" />
          <span>Tattvasar</span>
        </a>

        {/* Navbar Links */}
        <div className="flex justify-end items-center gap-3 h-full">
          {/* Hamburger Menu for Mobile */}
          <div
            className="block md:hidden cursor-pointer text-[26px]"
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
          >
            &#9776;
          </div>

          {/* Desktop Navigation */}
          {!isAuthenticated && (
            <div className="hidden md:flex items-center gap-6 text-[17px] h-full">
              {["Community", "About", "Login"].map((text, index) => (
                <Link
                  key={index}
                  to={`/${text.toLowerCase()}`}
                  className="flex border-b-4 border-transparent transition-all duration-300 ease-in-out hover:border-gray-200 h-full place-items-center"
                >
                  {text}
                </Link>
              ))}
            </div>
          )}

          {isAuthenticated && (
            <div className="hidden md:flex">
              <Menu>
              <MenuButton className="focus:outline-none">
                <FaUserCog className="w-[40px]" />
              </MenuButton>
              <Transition enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95" >
                <MenuItems className="text-gray-600 bg-white w-[70%] sm:w-[30%] lg:w-[20%] absolute right-8 mt-6 rounded-md shadow-lg border border-slate-300 focus:outline-none">
                  <MenuItem>
                    <Link
                      to="/contribution"
                      className="flex flex-1 pl-8 align-middle py-2 hover:bg-gray-200/90 hover:text-gray-900"
                    >
                      Be a contributor
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/settings"
                      className="flex flex-1 pl-8 align-middle py-2 hover:bg-gray-200/90 hover:text-gray-900"
                    >
                      My Settings
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <div
                      onClick={LogoutSubmit}
                      className="flex flex-1 pl-8 align-middle py-2 hover:bg-gray-200/90 hover:text-gray-900 cursor-pointer"
                    >
                      Logout
                    </div>
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
              </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
