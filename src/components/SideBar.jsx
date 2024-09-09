import React from "react";
import { CiBellOn } from "react-icons/ci";
import WalletsList from "./WalletsList";
import CategoryList from "./CategoryList";

function SideBar() {

    return (
        <div className="bg-white dark:bg-slate-400 h-full p-4 rounded-r-lg w-full"> 
            <div className="flex justify-end gap-3">
                <CiBellOn className="w-5 h-5 my-auto"/>
                <img className="h-8" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="" />
            </div>

            <div className="mt-10">
                <WalletsList/>
            </div>

            <div className="mt-10">
                <CategoryList/>
            </div>
        </div>
    );
}


export default SideBar;