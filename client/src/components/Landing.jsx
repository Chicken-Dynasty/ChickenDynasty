import React,{useState,useContext,useEffect} from "react";
import { TransactionContext } from "../context/transactionContext";
import LineChart from "./charts/LineChart";
import BarChart from "./charts/BarChart";
import PieChart from "./charts/PieChart";
import CoinLineChart from "./charts/CoinLineChart";

const Landing = () => {
    console.log("landing");
    return(
        <div className="grid place-items-center h-screen bg-farm">
            <h1 className="font-bold text-4xl text-black ml-20 mt-10">Cryptocurrencies</h1>
            {/* <div className="mt-10">
                <CoinLineChart/>
            </div>
            <div className="mt-10">
                <BarChart/>
            </div>
            <div className="mt-10">
                <PieChart/>
            </div>
            <div className="mt-10">
                <LineChart/>
            </div> */}

            <div className="carousel w-1/2 ml-20 mb-0">
                <div id="item1" className="carousel-item grid plac-items-center w-full ">
                    <CoinLineChart/>
                </div> 
                <div id="item2" className="carousel-item w-full  grid plac-items-center ">
                    <BarChart/>
                </div> 
                <div id="item3" className="carousel-item w-full grid plac-items-center">
                    <PieChart/>
                </div> 
                <div id="item4" className="carousel-item w-full  grid plac-items-center">
                    <LineChart/>
                </div>
            </div> 
            <div className="flex justify-center w-full p-4 gap-2 ml-20 mt-0">
                <a href="#item1" className="btn btn-sm">1</a> 
                <a href="#item2" className="btn btn-sm">2</a> 
                <a href="#item3" className="btn btn-sm">3</a> 
                <a href="#item4" className="btn btn-sm">4</a>
            </div>

        </div>

    

    );
}

export default Landing;