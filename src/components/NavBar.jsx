import React from "react";
import { CiSearch } from "react-icons/ci";

function NavBar() {
    return (
        <nav className="">
            <ul className="flex gap-3 p-5 ">
                <h1 className="font-extrabold text-lg my-auto">Budget</h1>
                <li className="bg-white flex gap-2 rounded-md p-2 my-auto"><CiSearch className="my-auto"/><input type="text" placeholder="Search" classname=""/></li>
                <li className="my-auto"><a href="" className="active:font-bold hover:text-blue-700">Overview</a></li>
                <li className="my-auto"><a href="" aria-selected className="active:font-bold hover:text-blue-700">Finance</a></li>
                <li className="my-auto"><a href="" className="active:font-bold hover:text-blue-700">Calendar</a></li>
                <li className="my-auto"><a href="" className="active:font-bold hover:text-blue-700">Events</a></li>

            </ul>
        </nav>
    );
}

export default NavBar;