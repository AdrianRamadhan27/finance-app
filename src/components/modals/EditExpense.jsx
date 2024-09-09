import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditExpense({id, afterSubmit}) {
  const baseURL = import.meta.env.VITE_BASE_API_URL;

  // State for form inputs
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [category, setCategory] = useState("");
  const [flowType, setFlowType] = useState("income");

  // State for wallets and categories data
  const [wallets, setWallets] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch wallets and categories when the component mounts
  useEffect(() => {
    axios.get(`${baseURL}/expense-items/${id}`)
    .then(response => {
      setTitle(response.data.data.title);
      setAmount(response.data.data.amount);
      setWallet(response.data.data.wallet);
      setCategory(response.data.data.category);
      setFlowType(response.data.data.flowType);
    })
    .catch(error => {
      console.error("Error fetching wallets:", error);
    });

    axios.get(`${baseURL}/wallets`)
      .then(response => {
        setWallets(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching wallets:", error);
      });

    axios.get(`${baseURL}/categories`)
      .then(response => {
        setCategories(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, [baseURL]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const expenseData = {
      title,
      amount: parseFloat(amount),  // Ensure the amount is a number
      wallet,
      category,
      flowType,
    };

    axios.put(`${baseURL}/expense-items/${id}`, expenseData)
      .then(response => {
        console.log("Expense updated successfully:", response.data);
        afterSubmit();
      })
      .catch(error => {
        console.error("Error updating expense:", error);
      });
  };

  return (
    <div className="flex flex-col gap-2 text-center p-3 max-w-6xl">
      <h1 className="font-bold">Edit Expense</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-gray-400 w-full m-auto rounded-md p-3">
        <div className="grid grid-cols-2 gap-1 text-left">
          <label htmlFor="title" className="text-white">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-md"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-1 text-left">
          <label htmlFor="amount" className="text-white">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="rounded-md"
            required
          />
        </div>

        {/* Wallet Select */}
        <div className="grid grid-cols-2 gap-1 text-left">
          <label htmlFor="wallet" className="text-white">Wallet</label>
          <select
            name="wallet"
            id="wallet"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="rounded-md"
            required
          >
            <option value="">Select Wallet</option>
            {wallets.map(wallet => (
              <option key={wallet._id} value={wallet._id}>{wallet.name}</option>
            ))}
          </select>
        </div>

        {/* Category Select */}
        <div className="grid grid-cols-2 gap-1 text-left">
          <label htmlFor="category" className="text-white">Category</label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md"
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-1 text-left">
          <label htmlFor="flowType" className="text-white">Flow Type</label>
          <select
            name="flowType"
            id="flowType"
            value={flowType}
            onChange={(e) => setFlowType(e.target.value)}
            className="rounded-md"
            required
          >
            <option value="income">Income</option>
            <option value="outcome">Outcome</option>
          </select>
        </div>

        <input type="submit" value="Save" className="cursor-pointer bg-green-600 hover:bg-green-400 text-white rounded-md p-2" />
      </form>
    </div>
  );
}
