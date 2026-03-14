import { useState, useRef, useEffect } from "react";
import { TicketPlus, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
import axios from "axios";
import axiosInstance from "../lib/axiosInstance";

const UserProfileMenu = ({user}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

    const currUser = user ? JSON.parse(user) : null;


    //Logout 
    const logout=() => {// clear auth state here
              console.log("User In Profile",currUser);
            //   localStorage.setItem("user",null);
              axiosInstance.post('/users/logout');
               localStorage.clear();
              //localStorage.removeItem("user");
              navigate("/login");
              scrollTo(0,0);
            }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-indigo-600 text-white
                   flex items-center justify-center font-semibold
                   hover:bg-indigo-700 transition"
      >
        {currUser?.name?.charAt(0).toUpperCase()}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white
                        rounded-xl shadow-lg border py-2 z-50">
          
          {/* Profile */}
          <MenuItem
            label="Profile"
            icon={<User size={16} />}
            onClick={() => navigate("/profile")}
          />

          {/* My Bookings */}
          <MenuItem
            label="My Bookings"
            icon={<TicketPlus size={16} />}
            onClick={() => navigate("/my-bookings/"+currUser.id)}
          />

          <div className="my-1 border-t" />

          {/* Logout */}
          <MenuItem
            label="Logout"
            icon={<LogOut size={16} />}
            onClick={logout}
            danger
          />
        </div>
      )}
    </div>
  );
};

export default UserProfileMenu;
