import React from "react";
import { MdCoffee } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { icons } from "../utils/icons";

function ExpenseCard({data, styling}) {
    const IconComponent = icons[styling.icon] || MdCoffee;
    
    return (
        <div className="bg-white rounded-md shadow-md flex justify-between p-3">
            <div className="flex gap-3">
                <IconComponent className={`h-6 w-6 text-${styling.color}-500 bg-${styling.color}-200 rounded-sm my-auto`}/>
                <div>
                    <h2 className="font-bold text-black">{data.title}</h2>
                    <p className="text-sm">{data.date}</p>
                </div>

            </div>
            <div className="flex gap-2 my-auto">
                <h2 className="font-bold">{data.price}</h2>
                <button className="bg-blue-200 rounded-md p-1 hover:bg-blue-600 text-blue-600 hover:text-white"><CiBookmark className=""/></button>
                <button className="bg-gray-200 rounded-md p-1 hover:bg-gray-600 hover:text-white"><IoMdClose/></button>
            </div>
        </div>
    );
}

export default ExpenseCard;