import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {}
  };

  return (
    <nav className="bg-amber-50 shadow px-6 py-3 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2 text-[#B22166] text-xl font-bold">
          <img src="./public/logo.png" alt="Logo" className="h-4 w-auto" />
        </Link>
      </div>

      {/* User Section */}
      {user && (
        <div className="relative flex items-center space-x-4">
          <p className="text-[#b22121] text-sm font-medium">Hey, {user.firstName}</p>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="focus:outline-none"
            >
              <img
                src={user.photoUrl}
                alt="User"
                className="w-9 h-9 rounded-full border border-gray-300 hover:ring-2 hover:ring-[#B22166]"
              />
            </button>

            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md py-2 z-10 text-sm text-[#1D1D1D] font-medium">
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-[#F0F4FF] hover:text-[#B22166] transition"
                  >
                    Profile <span className="text-xs bg-[#B22166] text-white px-2 py-0.5 ml-1 rounded">New</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/connections"
                    className="block px-4 py-2 hover:bg-[#F0F4FF] hover:text-[#B22166] transition"
                  >
                    Connections
                  </Link>
                </li>
                <li>
                  <Link
                    to="/requests"
                    className="block px-4 py-2 hover:bg-[#F0F4FF] hover:text-[#B22166] transition"
                  >
                    Requests
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-[#F0F4FF] hover:text-[#FF3B30] transition"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
