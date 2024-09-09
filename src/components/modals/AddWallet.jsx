import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddWallet({afterSubmit}) {
  const baseURL = import.meta.env.VITE_BASE_API_URL;

  // State for form inputs
  const [name, setName] = useState("");



  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const expenseData = {
      name,
    };

    axios.post(`${baseURL}/wallets`, expenseData)
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
      <h1 className="font-bold">Add Wallet</h1>
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
        

        <input type="submit" value="Save" className="cursor-pointer bg-green-600 hover:bg-green-400 text-white rounded-md p-2" />
      </form>
    </div>
  );
}
