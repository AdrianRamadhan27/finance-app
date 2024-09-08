import NavBar from "./NavBar";
import SideBar from "./SideBar";

import { FaWallet } from "react-icons/fa";
import { CgArrowsV } from "react-icons/cg";
import { BiFilter } from "react-icons/bi";
import { RiAddLargeLine } from "react-icons/ri";

import ExpenseCard from "./ExpenseCard";
import React, { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Import the spinner icon
import axios from "axios";


function ExpensesList() {
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const baseURL = import.meta.env.VITE_BASE_API_URL;
    const maxRetries = 3;
    const retryDelay = 3000;

    const fetchExpenses = async (retryCount = 0) => {
        try {
          const response = await axios.get(`${baseURL}/expense-items`);
          setExpenses(response.data.data);
          setLoading(false);
          setError(null);
        } catch (error) {
          if (error.response && error.response.status === 429 && retryCount < maxRetries) {
            setTimeout(() => {
              fetchExpenses(retryCount + 1);
            }, retryDelay);
          } else {
            setError("Too many requests. Please try again later.");
            setLoading(false);
            console.error("Error fetching expenses:", error);
          }
        }
    };


    useEffect(() => {
        fetchExpenses();
    }, [baseURL]);

    // Helper function to format the date (day month)
    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "long" };
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);
    };


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

                    <div className="flex justify-between">
                        <div className="flex w-fit gap-2">
                            <button className="p-2  flex border-2 rounded-md border-gray-500 hover:border-blue-500  text-gray-600 hover:text-blue-500">Group By <CgArrowsV className="my-auto"/></button>
                            <button className="p-2  flex border-2 rounded-md border-gray-500 hover:border-blue-500  text-gray-600 hover:text-blue-500">Dates <CgArrowsV className="my-auto"/></button>
                            <button className="p-2  flex border-2 rounded-md border-gray-500 hover:border-blue-500  text-gray-600 hover:text-blue-500"><BiFilter className="my-auto"/></button>
                        </div>

                        <button className="text-white bg-orange-600 hover:bg-orange-300 p-2 rounded-md flex gap-2 items-center">
                            New Expense <RiAddLargeLine />
                        </button>
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
                    <div className="p-4 flex flex-col gap-3 max-h-56 overflow-y-auto">
                    {error ? (
                        <p className="text-red-500">{error}</p>
                        ) : loading ? (
                        <div className="flex justify-center items-center">
                            <AiOutlineLoading3Quarters className="animate-spin h-8 w-8 text-gray-500" />
                        </div>
                        ) : (
                        Array.isArray(expenses) &&
                        expenses.length > 0 &&
                        expenses.map((expense) => (
                            <ExpenseCard
                            key={expense._id}
                            data={{
                                title: expense.title,
                                date: formatDate(expense.updatedAt),
                                price: expense.amount.toLocaleString(),
                                category: expense.category ? expense.category.name : "",
                                id: expense._id,
                            }}
                            afterDelete={fetchExpenses}
                            />
                        ))
                    )}              
                        
                    </div>
                </div>
                
            </div>
            <div>
                <SideBar/>
            </div>
        </div>
    );
}

export default ExpensesList;