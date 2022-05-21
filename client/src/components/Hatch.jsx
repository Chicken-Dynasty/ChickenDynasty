import React,{useContext, useState} from "react";
import { TransactionContext } from "../context/transactionContext";

const Hatch = () => {
    const {connectWallet,currentAccount,mintNFT} = useContext(TransactionContext);
    console.log("hatch page")
    return(
        <div className="grid place-items-center h-screen bg-farm ">
            <div className=" bg-white/90 h-5/6 w-3/5 mt-5 ml-20  rounded-md  "> 
                <div className="p-3 bg-yellow-300 rounded-md mb-2">
                    <text className="font-alfa "> BUY AN EGG</text>
                </div>
                <div className="grid place-items-center mt-2">
                     <text className=" font-alfa text-center"> Cost : 100 EGG</text>
                </div>
                
                
                <div  className="h-5/6 w-full  grid  place-items-center ">
                    <div class="w-3/6 h-auto px-10 m-3">
                        <img src="https://cdn.discordapp.com/attachments/958394721011662938/977631636571164742/Untitled3_20220522005856.png" alt="..." class="shadow rounded max-w-full h-auto align-center border-none" />
                    </div>
                    {/* <div class="w-4/6 h-3/4 px-6 m-5 ">
                        <img src="https://cdn.discordapp.com/attachments/958394721011662938/958394807460438047/Untitled2_20220329222043.png" alt="..." class="shadow rounded max-w-full h-auto align-center border-none" />
                    </div> */}
                </div>
                <div className="grid place-items-center p-3 bg-yellow-300 ">
                    <form>
                        <text className="font-alfa"> Name your chicken :  </text>
                        <input className="border-zinc-500" name= "cname"></input>
                    </form>
                </div>
            </div>

            <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                onClick={mintNFT}
                className="inline-block px-6 py-2.5 bg-lime-600 text-white font-alfa text-md leading-tight rounded shadow-md hover:bg-lime-700 hover:shadow-lg focus:bg-lime-700 focus:shadow-lg focus:outline-none focus:ring-0  transition duration-150 ease-in-out ml-10 p-3"
            > HATCH </button>
        </div>
    );
};

export default Hatch;