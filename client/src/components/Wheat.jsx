import React,{useContext, useState} from "react";
import { TransactionContext } from "../context/transactionContext";

const Wheat = () => {
    const {buyWheat,wheatInputAmount,setWheatInputAmount,handleWheatAmountInput,} = useContext(TransactionContext);
    console.log("Wheat page")
    return(
        <div className="grid place-items-center h-screen bg-farm">
            <form>
                <label>Enter amount of wheat </label>
                <input className="border-2 " name = "amount" onChange={handleWheatAmountInput} type={"number"} min={1}></input>
            </form>            
            <button className="border-2" onClick={buyWheat}>Buy Wheat</button>
        </div>
    );
};

export default Wheat;