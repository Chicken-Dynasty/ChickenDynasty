import React,{useContext, useState} from "react";
import { TransactionContext } from "../context/transactionContext";

const Hatch = () => {
    const {connectWallet,currentAccount,mintNFT} = useContext(TransactionContext);
    console.log("hatch page")
    return(
        <div className="grid place-items-center h-screen">
            <button className="border-2" onClick={mintNFT}>Hatch</button>
        </div>
    );
};

export default Hatch;