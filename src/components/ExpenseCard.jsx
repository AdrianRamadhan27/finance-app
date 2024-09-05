import React from "react";
import { MdCoffee } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

function ExpenseCard() {
    return (
        <div className="bg-white rounded-md shadow-md flex justify-between p-3">
            <div className="flex gap-3">
                <MdCoffee className="h-6 w-6 text-blue-500 bg-blue-300 rounded-sm my-auto"/>
                <div>
                    <h2 className="font-bold text-black">Restaurants & Cafe</h2>
                    <p className="text-sm">20 August 2019</p>
                </div>

            </div>
            <div className="flex gap-2 my-auto">
                <h2 className="font-bold">-$99.00</h2>
                <button className="bg-blue-200 rounded-md p-1 hover:bg-blue-600 text-blue-600 hover:text-white"><CiBookmark className=""/></button>
                <button className="bg-gray-200 rounded-md p-1 hover:bg-gray-600 hover:text-white"><IoMdClose/></button>
            </div>
        </div>
    );
}

export default ExpenseCard;