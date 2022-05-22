import React,{ useEffect,useContext, useRef,useState} from "react";
import { TransactionContext } from "../context/transactionContext";
import Card from "./Card";
const ChickenCard = () => {
    const {currentAccount,tokenData,displayNFTByAddress} = useContext(TransactionContext);

    useEffect(() => {
        console.log("Run fetch Data")
        displayNFTByAddress()// action here
    }, [tokenData.length]);

    return(
        <div>
            <div>
                {currentAccount ? (
                    <h3 className="font-alfa text-black text-xl">Your chicken</h3>
                ):
                (
                    <h3 className="font-alfa text-black text-xl">Please connect to your wallet</h3>
                )}
            </div>
            <div className="carousel-item flex flex-wrap justify-center items-center mt-1 p-2  space-x-4">
                    {
                    tokenData.map((chicken, index) => (
                        <Card className= "" key={index} {...chicken} />
                    ))}
                    
            </div>
        </div>

        
    );


}

export default ChickenCard;