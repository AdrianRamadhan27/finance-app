import React from "react";
import { CiSearch } from "react-icons/ci";
import { useTheme } from '../context/ThemeContext';

function NavBar() {
    const { theme, toggleTheme } = useTheme();
    return (
        <nav className="flex justify-between items-center p-2">
            <ul className="flex gap-3 p-5 text-black dark:text-white">
                <h1 className="font-extrabold text-lg my-auto">Budget</h1>
                <li className="bg-white flex gap-2 rounded-md p-2 my-auto dark:text-black"><CiSearch className="my-auto"/><input type="text" placeholder="Search" classname=""/></li>
                <li className="my-auto"><a href="" className="hover:text-blue-700">Overview</a></li>
                <li className="my-auto"><a href="" className="hover:text-blue-700 font-bold">Finance</a></li>
                <li className="my-auto"><a href="" className="hover:text-blue-700">Calendar</a></li>
                <li className="my-auto"><a href="" className="hover:text-blue-700">Events</a></li>
            </ul>
            <button
            onClick={toggleTheme}
            className="h-fit p-2 bg-gray-400 hover:bg-gray-700 dark:bg-gray-900 dark:hover:bg-gray-700 rounded"
            >
            {theme === "light" ? "☀️" : "🌙"}
            </button>
        </nav>
    );
}

export default NavBar;