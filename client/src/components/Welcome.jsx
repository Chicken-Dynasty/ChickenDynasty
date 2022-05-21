import React,{useState,useContext} from "react";
import { TransactionContext } from "../context/transactionContext";
import ChickenCard from "./ChickenCard";
const Welcome = () => {
    const {connectWallet,currentAccount,displayNFTByAddress,tokenData} = useContext(TransactionContext);
    console.log("home page");
    // displayNFTByAddress();
    console.log(tokenData);

    return(
        <div className="grid place-items-center h-screen">
            <button className="border-1" onClick={displayNFTByAddress}>Display NFT</button>
            {/* <ul>
            {
                // tokenData.forEach((chicken) => {
                //     // <h2>element['name']</h2>
                //     // chicken.forEach(info => {
                //     //     console.log(info)
                //     // });
                // })
                tokenData.map((chicken, index) => (
                    <li key={index}>
                        <span>{"Name:"+chicken['name']+" Rarity:"+chicken['rarity']+" last claim:"+chicken['lastClaim']+" claimModifier"+chicken['claimModifier']}</span>
                    </li>
                ))
            }
            </ul> */}
            <ChickenCard />
        </div>
    );
};

export default Welcome;