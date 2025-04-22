import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { useLogoutMutation } from "../services/AuthLogout";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const sidebarRef = useRef(null);
  const triggerRef = useRef(null);
  const { isAuthenticated } = useSelector((state) => state.authenticated);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === "true"
  );

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !triggerRef.current?.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  // Close sidebar on "Esc" key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Store sidebar expansion state in localStorage
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    document.body.classList.toggle("sidebar-expanded", sidebarExpanded);
  }, [sidebarExpanded]);

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
    <>
      {/* Backdrop Overlay (Visible when sidebar is open) */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-slate-900/90 text-white p-5 shadow-lg transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button ref={triggerRef} onClick={() => setSidebarOpen(false)} className="absolute top-4 left-4 text-4xl text-gray-300 hover:text-white transition-colors" > &times; </button>

        {/* Sidebar Menu */}
        <div className="mt-12 flex flex-col items-end space-y-4 text-xl">
          <NavLink to="/about" className="hover:text-gray-300">
            About
          </NavLink>
          <NavLink to="/contribution" className="hover:text-gray-300">
            Be a Contributor
          </NavLink>
          <NavLink to="/settings" className="hover:text-gray-300">
            Settings
          </NavLink>
          {!isAuthenticated ?<NavLink to="/login" className="hover:text-gray-300">
            Login
          </NavLink>:<NavLink onClick={LogoutSubmit} className="hover:text-gray-300">
            Logout
          </NavLink>}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
