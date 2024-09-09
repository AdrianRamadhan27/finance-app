import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditCategory({id, afterSubmit}) {
  const baseURL = import.meta.env.VITE_BASE_API_URL;

  // State for form inputs
  const [name, setName] = useState("");
  const [wallet, setWallet] = useState("");


  // State for wallets and categories data
  const [wallets, setWallets] = useState([]);

  // Fetch wallets and categories when the component mounts
  useEffect(() => {
    axios.get(`${baseURL}/categories/${id}`)
    .then(response => {
      setName(response.data.data.name);
      setWallet(response.data.data.wallet);
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
  }, [baseURL]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const expenseData = {
      name,  // Ensure the amount is a number
      wallet,
    };

    axios.put(`${baseURL}/categories/${id}`, expenseData)
      .then(response => {
        console.log("Expense added successfully:", response.data);
        afterSubmit();
      })
      .catch(error => {
        console.error("Error adding expense:", error);
      });
  };

  return (
    <div className="flex flex-col gap-2 text-center p-3 max-w-6xl">
      <h1 className="font-bold">Add Category</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-gray-400 w-full m-auto rounded-md p-3">
        <div className="grid grid-cols-2 gap-1 text-left">
          <label htmlFor="name" className="text-white">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        <input type="submit" value="Save" className="cursor-pointer bg-green-600 hover:bg-green-400 text-white rounded-md p-2" />
      </form>
    </div>
  );
}
