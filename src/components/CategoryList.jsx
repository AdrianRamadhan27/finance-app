import React, { useState, useEffect } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Import the spinner icon
import ItemCard from "./ItemCard";
import axios from "axios";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_BASE_API_URL;
  const maxRetries = 3;
  const retryDelay = 3000;

  const fetchCategories = async (retryCount = 0) => {
    try {
      const response = await axios.get(`${baseURL}/categories/`);
      setCategories(response.data.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      if (error.response && error.response.status === 429 && retryCount < maxRetries) {
        setTimeout(() => {
          fetchCategories(retryCount + 1);
        }, retryDelay);
      } else {
        setError("Too many requests. Please try again later.");
        setLoading(false);
        console.error("Error fetching categories:", error);
      }
    }
  };

  const onDelete = (id) => {
    axios.delete(`${baseURL}/categories/${id}`).then(() => {
        fetchCategories()
    });
  }

  useEffect(() => {
    fetchCategories();
  }, [baseURL]);

  // Helper function to format the date (day month)
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="font-bold text-black">Categories</h2>
        <button className="text-gray-400 hover:text-blue-500">
          <CiSquarePlus className="h-8 w-8" />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-3 max-h-44 overflow-y-auto">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : loading ? (
          <div className="flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin h-8 w-8 text-gray-500" />
          </div>
        ) : (
          Array.isArray(categories) &&
          categories.length > 0 &&
          categories.map((category) => (
            <ItemCard
              key={category._id}
              data={{
                title: category.name,
                subtitle: formatDate(category.updatedAt),
                id: category._id
              }}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryList;
