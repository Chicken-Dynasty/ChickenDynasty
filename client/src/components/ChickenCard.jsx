import React,{ useEffect,useContext, useRef,useState} from "react";
import { TransactionContext } from "../context/TransactionContext";
import Card from "./Card";
const ChickenCard = () => {
    const {currentAccount,tokenData,displayNFTByAddress,checkWheatAmount,wheatBalance} = useContext(TransactionContext);

    useEffect(() => {
        console.log("Run fetch Data");
        displayNFTByAddress();// action here


    }, [tokenData.length]);

    return(
        <div>
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