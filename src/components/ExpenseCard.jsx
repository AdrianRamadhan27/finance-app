import {useState, useEffect} from "react";
import { CiBookmark } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import { icons } from "../utils/icons";
import { expenseColors } from "../utils/colors";
import axios from "axios";


function ExpenseCard({data, onEdit, afterDelete}) {
    const [color, setColor] = useState("bg-red-200 text-red-500");
    const [Icon, setIcon] = useState(null);
    const baseURL = import.meta.env.VITE_BASE_API_URL;

    useEffect(() => {
        // Randomly select a color from the list
        const randomColor = expenseColors[Math.floor(Math.random() * expenseColors.length)];
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        setColor(randomColor);
        setIcon(() => randomIcon);
      }, []); // Only run this once, when the component mounts

    const handleDelete = () => {
        axios.delete(`${baseURL}/expense-items/${data.id}`).then(() => {
            afterDelete()
        });
    }

    const handleEdit = () => {
        onEdit(data.id);
    }
    
    
    
    return (
        <button className="bg-white hover:bg-slate-200 dark:bg-gray-400 dark:hover:bg-gray-600 rounded-md shadow-md flex justify-between p-3 text-black">
            <div className="flex gap-3">
                {Icon && <Icon className={`h-6 w-6 ${color} rounded-sm my-auto`}/>}
                <div>
                    <div className="flex gap-2 items-center">
                        <h2 className="font-bold text-black dark:text-white max-w-64 truncate">{data.title}</h2>
                        {data.category && <p className="bg-gray-400 dark:bg-white rounded-md w-fit max-w-32 truncate text-white dark:text-black px-1 text-sm">{data.category}</p>}
                    </div>
    
                    <p className="text-sm text-left text-black dark:text-white">{data.date}</p>
                </div>

            </div>
            <div className="flex gap-2 my-auto">
                <h2 className="font-bold text-black dark:text-white">{data.type === "income" ? "+" : "-"}${data.price}</h2>
                <button className="bg-blue-200 rounded-md p-1 hover:bg-blue-600 text-blue-600 hover:text-white"><CiBookmark className=""/></button>
                <button onClick={handleEdit} className="bg-gray-200 rounded-md p-1 hover:bg-green-600 hover:text-white"><LuPencil/></button>
                <button onClick={handleDelete} className="bg-gray-200 rounded-md p-1 hover:bg-red-600 hover:text-white"><IoMdClose/></button>
            </div>
        </button>
    );
}

export default ExpenseCard;