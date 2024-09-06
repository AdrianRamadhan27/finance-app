import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

import { FaWallet } from "react-icons/fa";
import { CgArrowsV } from "react-icons/cg";
import { BiFilter } from "react-icons/bi";
import { MdCoffee } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import ExpenseCard from "./ExpenseCard";


function ExpensesList() {
    return (
        <div className="rounded-lg bg-gray-200 grid grid-cols-4 h-full shadow-md">
            <div className="col-span-3">
                <NavBar />
                <div className="p-8">
                    <div className="flex justify-between mb-10">
                        <div className="flex gap-3">
                            <FaWallet className="h-10 w-10 text-orange-600"/>
                            <div>
                            <h2 className="font-bold text-blue-600">Home Wallet</h2>
                            <a href="" className="text-sm hover:text-gray-500">Change default wallet</a>
                            </div>

                        </div>
                        <div>
                            <input type="date" name="" id="" className="my-auto"/>
                        </div>
                    </div>

                    <div className="flex w-fit gap-2">
                        <button className="p-3  flex border-2 rounded-md border-gray-500 hover:border-blue-500 m-auto text-gray-600 hover:text-blue-500">Group By <CgArrowsV className="my-auto"/></button>
                        <button className="p-3  flex border-2 rounded-md border-gray-500 hover:border-blue-500 m-auto text-gray-600 hover:text-blue-500">Realisation <CgArrowsV className="my-auto"/></button>
                        <button className="p-3  flex border-2 rounded-md border-gray-500 hover:border-blue-500 m-auto text-gray-600 hover:text-blue-500">Dates <CgArrowsV className="my-auto"/></button>
                        <button className="p-3  flex border-2 rounded-md border-gray-500 hover:border-blue-500 m-auto text-gray-600 hover:text-blue-500">Types <CgArrowsV className="my-auto"/></button>
                        <button className="p-3  flex border-2 rounded-md border-gray-500 hover:border-blue-500 m-auto text-gray-600 hover:text-blue-500">Sample <CgArrowsV className="my-auto"/></button>
                        <button className="p-3  flex border-2 rounded-md border-gray-500 hover:border-blue-500 m-auto text-gray-600 hover:text-blue-500">Extended <CgArrowsV className="my-auto"/></button>
                        <button className="p-3  flex border-2 rounded-md border-gray-500 hover:border-blue-500 m-auto text-gray-600 hover:text-blue-500 h-full"><BiFilter className="my-auto"/></button>
                    </div>
                    <div className="flex justify-between mt-3">
                        <h3 className="font-bold text-black">
                            January 15 2020
                        </h3>
                        <div className="flex text-gray-400 gap-4">
                            <p>Number of transactions: 04</p>
                            <p>Value: $7408</p>
                        </div>
                    </div>
                    <div className="p-4 flex flex-col gap-5">
                        <ExpenseCard 
                            data={{
                                title: "Restaurants & Cafe",
                                date: "20 August 2019",
                                price: "-$99.00"
                            }}
                            styling={{
                                icon: "coffee",
                                color: "blue"
                            }}
                        />
  
                        
                        
                        
                    </div>
                </div>
                
            </div>
            <div>
                <SideBar />
            </div>
        </div>
    );
}

export default ExpensesList;