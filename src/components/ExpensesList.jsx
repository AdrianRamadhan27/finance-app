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
import { Link, useNavigate, useLocation } from "react-router-dom";

import AddExpense from './modals/AddExpense';
import ReactDOM from 'react-dom';

function ExpensesList() {
    const navigate = useNavigate();
    const location = useLocation();
    const [modalShown, setModalShown] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const today = new Date().toISOString().split("T")[0];
    const [date, setDate] = useState(today)
    const baseURL = import.meta.env.VITE_BASE_API_URL;
    const maxRetries = 3;
    const retryDelay = 3000;

    const modal = (children) => (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 font-josefin">
            <div className="bg-white w-fit max-w-4xl h-fit max-h-[80vh] flex flex-col shadow-lg rounded-lg overflow-hidden">
              <div className="text-right items-center">
                <button 
                    onClick={() => {
                        setModalShown(false);
                        navigate(-1);
                    }}
                    className="bg-red-700 hover:bg-red-400 px-2 py-1 text-white"
                >
                    X
                </button>
              </div>

            {children}
            </div>
          </div>
    );

    const afterSubmit = () => {
        setModalShown(false);
        navigate(-1);
        fetchExpenses();
    }

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
        const options = { day: "numeric", month: "long", year: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);
    };

    const calculateValue = (expenses) => {
        const totalAmount = expenses.reduce((acc, item) => {
            // If the flowType is 'income', add the amount; if 'outcome', subtract the amount
            if (item.flowType === 'income') {
              return acc + item.amount;
            } else if (item.flowType === 'outcome') {
              return acc - item.amount;
            }
            return acc; // If flowType is neither, just return the current accumulator
        }, 0);
        return totalAmount;
    }


    return (
        <div className="rounded-lg bg-gray-200 dark:bg-slate-800 grid grid-cols-4 h-full shadow-md text-black dark:text-white">
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
                            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} name="" id="" className="my-auto dark:bg-slate-500"/>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex w-fit gap-2">
                            <button className="p-2  flex border-2 rounded-md border-gray-500 hover:border-blue-500  text-gray-600 hover:text-blue-500">Group By <CgArrowsV className="my-auto"/></button>
                            <button className="p-2  flex border-2 rounded-md border-gray-500 hover:border-blue-500  text-gray-600 hover:text-blue-500">Dates <CgArrowsV className="my-auto"/></button>
                            <button className="p-2  flex border-2 rounded-md border-gray-500 hover:border-blue-500  text-gray-600 hover:text-blue-500"><BiFilter className="my-auto"/></button>
                        </div>

                        <Link to="/add-expense">
                            <button onClick={() =>setModalShown(true)} className="text-white bg-orange-600 hover:bg-orange-300 p-2 rounded-md flex gap-2 items-center">
                                New Expense <RiAddLargeLine />
                            </button>
                        </Link>
                    </div>

                    <div className="flex justify-between mt-3">
                        <h3 className="font-bold">
                            {formatDate(date)}
                        </h3>
                        <div className="flex text-gray-400 gap-4">
                            <p>Number of transactions: {expenses.length}</p>
                            <p>Value: ${calculateValue(expenses)}</p>
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
                                type: expense.flowType,
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

            {modalShown && location.pathname == "/add-expense" && ReactDOM.createPortal(modal(<AddExpense afterSubmit={afterSubmit}/>), document.body)}
        </div>
    );
}

export default ExpensesList;