import { useState, useEffect } from "react";
import { itemColors } from "../utils/colors";
import { icons } from "../utils/icons";
import { FiEdit2, FiTrash2  } from "react-icons/fi";

function ItemCard({data, onEdit, onDelete}) {
    const [bgColor, setBgColor] = useState("bg-red-700");
    const [Icon, setIcon] = useState(null);

    useEffect(() => {
      // Randomly select a color from the list
      const randomColor = itemColors[Math.floor(Math.random() * itemColors.length)];
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      setBgColor(randomColor);
      setIcon(() => randomIcon);
    }, []); // Only run this once, when the component mounts

    return (
        <button className="flex gap-3 hover:shadow-md hover:rounded-md hover:bg-gray-100 dark:hover:bg-slate-500 p-3 group justify-between items-center">
            <div className="flex gap-3">
            {Icon && <Icon className={`h-10 w-10 text-white rounded-lg my-auto ${bgColor}`}/> }
                <div className="text-left">
                    <h2 className="font-bold text-black max-w-20 truncate">{data.title}</h2>
                    <p className="text-sm max-w-20 truncate">{data.subtitle}</p>
                </div>
            </div>

            <div className="flex gap-2 items-center">
                <button className="hidden group-hover:block  text-green-700 bg-green-200 hover:text-white hover:bg-green-700 p-1 rounded-sm"><FiEdit2 /></button>
                <button onClick={() => onDelete(data.id)} className="hidden group-hover:block  text-red-700 bg-red-200 hover:text-white hover:bg-red-700 p-1 rounded-sm"><FiTrash2 /></button>

            </div>

        </button>
    );
}

export default ItemCard;