import React,{useContext, useState} from "react";
import { TransactionContext } from "../context/transactionContext";

const Wheat = () => {
    const {buyWheat,mintNFT} = useContext(TransactionContext);
    console.log("Wheat page")
    return(
        <div className="grid place-items-center h-screen">
            <button className="border-2" onClick={buyWheat}>Buy Wheat</button>
        </div>
    );
};

export default Wheat;