import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import ItemCard from "./ItemCard";
import { colors } from "../utils/colors";
import { icons } from "../utils/icons";

function WalletsList() {
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="font-bold text-black">Wallets</h2>
                <button className="text-gray-400 hover:text-blue-500">
                    <CiSquarePlus className="h-8 w-8"/>
                </button>

                
            </div>
            <div className="p-4 flex flex-col gap-5">
                <ItemCard 
                data={{
                        title: "Home Wallet",
                        subtitle: "$2349,500" 
                    }}
                styling={{
                    color:"purple",
                    icon:"wallet"
                }}
                />
                <ItemCard 
                data={{
                    title: "Work Wallet",
                    subtitle: "$249,500" 
                    }}
                styling={{
                    color:"red",
                    icon:"wallet"
                }}
                />
            </div>

        </div>
    );
}

export default WalletsList;