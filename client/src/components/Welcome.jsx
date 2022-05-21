import React,{useState,useContext,useEffect} from "react";
import { TransactionContext } from "../context/transactionContext";
import ChickenCard from "./ChickenCard";
const Welcome = () => {
    const {connectWallet,currentAccount,displayNFTByAddress,tokenData} = useContext(TransactionContext);
    console.log("home page");
    // displayNFTByAddress();

    return(
        <div className="grid place-items-center h-screen bg-farm">
            <button className="border-1" onClick={displayNFTByAddress}>Display NFT</button>
            <ChickenCard />
        </div>
    );
};

export default Welcome;