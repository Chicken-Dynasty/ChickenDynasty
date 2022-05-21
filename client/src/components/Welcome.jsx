import React,{useState,useContext} from "react";
import { TransactionContext } from "../context/transactionContext";

const Welcome = () => {
    const {connectWallet,currentAccount,displayNFTByAddress} = useContext(TransactionContext);
    console.log("home page");

    return(
        <div className="grid place-items-center h-screen">
            <button className="border-1" onClick={displayNFTByAddress}>Display NFT</button>
        </div>
    );
};

export default Welcome;