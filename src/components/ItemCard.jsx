import React from "react";
import { MdCoffee } from "react-icons/md";
import { CiWallet } from "react-icons/ci";
import { colors } from "../utils/colors";
import { icons } from "../utils/icons";

function ItemCard({data, styling}) {
    const colorClass = colors[styling.color] || 'bg-gray-700';
    const IconComponent = icons[styling.icon] || CiWallet;

    return (
        <button className="flex gap-3 hover:shadow-md hover:rounded-md hover:bg-gray-100">
            <IconComponent className={`h-10 w-10 text-white ${colorClass} rounded-lg my-auto`}/>
            <div className="text-left">
                <h2 className="font-bold text-black">{data.title}</h2>
                <p className="text-sm">{data.subtitle}</p>
            </div>

        </button>
    );
}

export default ItemCard;