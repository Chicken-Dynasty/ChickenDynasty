import React,{useState,useContext,useEffect} from "react";
import { TransactionContext } from "../context/transactionContext";
import LineChart from "./charts/LineChart";
import BarChart from "./charts/BarChart";
import PieChart from "./charts/PieChart";

const Landing = () => {
    console.log("landing");
    return(
        <div className="grid place-items-center h-screen bg-farm">
            <h1 >Landing page</h1>
            <div className="mt-10">
                <BarChart></BarChart>
            </div>
            <div className="mt-10">
                <PieChart></PieChart>
            </div>
            <div>
                <LineChart></LineChart>
            </div>
        </div>

    );
}

export default Landing;