import React,{useState,useContext,useEffect} from "react";
import { TransactionContext } from "../context/transactionContext";
import ChickenCard from "./ChickenCard";
const Welcome = () => {
    const {connectWallet,currentAccount,displayNFTByAddress,tokenData,wheatBalance} = useContext(TransactionContext);
    console.log("home page");
    // displayNFTByAddress();

    return(
        <div className="grid h-screen bg-farm">
            {/* <button className=" btn- border-1 font-alfa text-black text-xxl mt-4" onClick={displayNFTByAddress}>Display NFT</button> */}
            <div className="justify-center">
                <button className="btn gap-2 ml-64">
                    Wheat Balance
                <div className="badge badge-secondary">{wheatBalance}</div>
                </button>
            </div>
            <div>
                {currentAccount ? (
                    <h3 className="font-alfa text-black text-xl ml-64">Your chicken</h3>
                ):
                (
                    <h3 className="font-alfa text-black text-xl ml-64">Please connect to your wallet</h3>
                )}
            </div>
            <div className="carousel  w-5/6 p-7 ml-72 space-x-4 bg-white/0rounded-box">
                <div className="carousel-item"> <ChickenCard />
                </div>
               
            </div>
            
        </div>
    );
};

export default Welcome;