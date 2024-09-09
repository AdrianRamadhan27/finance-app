import React, { useState, useEffect } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Import the spinner icon
import ItemCard from "./ItemCard";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ReactDOM from 'react-dom';
import AddWallet from "./modals/AddWallet";

function WalletsList() {
    const navigate = useNavigate();
    const location = useLocation();
    const [modalShown, setModalShown] = useState(false);
    const [wallets, setWallets] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
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
      fetchWallets();
  }

    const fetchWallets = async (retryCount = 0) => {
        try {
          const response = await axios.get(`${baseURL}/wallets`);
          setWallets(response.data.data);
          setLoading(false);
          setError(null);
        } catch (error) {
          if (error.response && error.response.status === 429 && retryCount < maxRetries) {
            setTimeout(() => {
              fetchWallets(retryCount + 1);
            }, retryDelay);
          } else {
            setError("Too many requests. Please try again later.");
            setLoading(false);
            console.error("Error fetching wallets:", error);
          }
        }
    };
    
    const onDelete = (id) => {
        axios.delete(`${baseURL}/wallets/${id}`).then(() => {
            fetchWallets()
        });
    }

    useEffect(() => {
        fetchWallets();
    }, [baseURL]);

    const calculateTotalAmount = (expenseItems) => {
        return expenseItems.reduce((total, item) => total + item.amount, 0);
    };

    return (
        <div>
            <div className="flex justify-between">
                <h2 className="font-bold text-black">Wallets</h2>
                <Link to="/add-wallet">
                    <button onClick={()=>setModalShown(true)} className="text-gray-400 dark:text-white hover:text-blue-500">
                        <CiSquarePlus className="h-8 w-8"/>
                    </button>
                </Link>


                
            </div>
            <div className="p-4 flex flex-col gap-3 max-h-44 overflow-y-auto">
            {error ? (
            <p className="text-red-500">{error}</p>
            ) : loading ? (
            <div className="flex justify-center items-center">
                <AiOutlineLoading3Quarters className="animate-spin h-8 w-8 text-gray-500" />
            </div>
            ) : (
            Array.isArray(wallets) &&
            wallets.length > 0 &&
            wallets.map((wallet) => (
                <ItemCard
                key={wallet._id}
                data={{
                    title: wallet.name,
                    subtitle: "$"+calculateTotalAmount(wallet.expenseItems).toLocaleString(),
                    id: wallet._id
                }}
                onDelete={onDelete}
                />
            ))
            )}
            </div>

            {modalShown && location.pathname == "/add-wallet" && ReactDOM.createPortal(modal(<AddWallet afterSubmit={afterSubmit}/>), document.body)}

        </div>
    );
}

export default WalletsList;