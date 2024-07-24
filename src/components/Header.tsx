import React, { useState } from "react";
import { Menu } from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  VideoCameraIcon,
  BellIcon,
  UserCircleIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import {Logout} from "../api/auth"
import "./Header.styles.css";

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <header className="bg-white py-2 px-4 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <img
          src="https://www.youtube.com/img/desktop/yt_1200.png"
          alt="YouTube Logo"
          className="h-24 logo"
          onClick={() => navigate("/")}
        />

        <form className="flex-grow mx-4">
          <div className="relative flex-grow max-w-3xl">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              className="w-full py-2 px-4 pl-10 pr-16 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <div className="absolute top-2 left-3">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
            </div>
            <button
              type="submit"
              className="absolute top-2 right-3 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </form>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/upload")}
            className="hover:bg-gray-100 p-2 rounded-full"
          >
            <VideoCameraIcon className="h-6 w-6" />
          </button>
          <button className="hover:bg-gray-100 p-2 rounded-full">
            <BellIcon className="h-6 w-6" />
          </button>

          <Menu as="div" className="relative">
            <Menu.Button className="hover:bg-gray-100 p-2 rounded-full">
              <UserCircleIcon className="h-6 w-6" />
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <button onClick={()=>{
                Logout()
                navigate("/login")
              }} className="hover:bg-gray-100 p-2 rounded-full flex justify-between">
                Logout <ArrowLongRightIcon className="h-6 w-6"/>
              </button>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
