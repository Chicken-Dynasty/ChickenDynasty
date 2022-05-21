import React,{useState,useContext,useEffect} from "react";
import { TransactionContext } from "../context/transactionContext";

const Landing = () => {
    console.log("landing");
    return(

        <h1 className="grid place-items-center h-screen bg-farm">Landing page</h1>
    );
}

export default Landing;