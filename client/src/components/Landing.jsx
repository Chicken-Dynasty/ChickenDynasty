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
            <h1 className="font-alfa text-xl text-black">Landing page</h1>
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

            <div class="carousel   w-1/2 h-full ml-20 ">
                <div id="item1" class="carousel-item grid plac-items-center w-full ">
                    <CoinLineChart/>
                </div> 
                <div id="item2" class="carousel-item w-full  grid plac-items-center ">
                    <BarChart/>
                </div> 
                <div id="item3" class="carousel-item w-full grid plac-items-center">
                    <PieChart/>
                </div> 
                <div id="item4" class="carousel-item w-full  grid plac-items-center">
                    <LineChart/>
                </div>
            </div> 
            <div class="flex justify-center w-full p-2 gap-2">
                <a href="#item1" class="btn btn-sm">1</a> 
                <a href="#item2" class="btn btn-sm">2</a> 
                <a href="#item3" class="btn btn-sm">3</a> 
                <a href="#item4" class="btn btn-sm">4</a>
            </div>

        </div>

    

    );
}

export default Landing;