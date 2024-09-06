import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import ItemCard from "./ItemCard";

function CategoryList() {
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="font-bold text-black">Categories</h2>
                <button className="text-gray-400 hover:text-blue-500">
                    <CiSquarePlus className="h-8 w-8"/>
                </button>

                
            </div>
            <div className="p-4 flex flex-col gap-5">
                <ItemCard 
                    data={{
                            title: "Utility",
                            subtitle: "29 April" 
                        }}
                    styling={{
                        color:"green",
                        icon:"headphone"
                    }}
                    />
                <ItemCard 
                data={{
                    title: "Shopping",
                    subtitle: "27 February" 
                    }}
                styling={{
                    color:"yellow",
                    icon:"wallet"
                }}
                />
            </div>

        </div>
    );
}

export default CategoryList;