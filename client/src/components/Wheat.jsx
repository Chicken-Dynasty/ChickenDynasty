import React,{useContext, useState , useRef} from "react";
import { TransactionContext } from "../context/transactionContext";

const Wheat = () => {
    const {buyWheat} = useContext(TransactionContext);

    const[amount,setAmount] = useState("");
    const ref = useRef(amount);

    const handleChange = (event) => {
        ref.current = event.target.value;
        console.log(ref.current);
    }

    const exceuteBuy = () =>{
        buyWheat(ref.current);
    }

    console.log("Wheat page")
    return(
        <div className="grid place-items-center h-screen bg-farm">
            <div className=" bg-white/90 h-5/6 w-3/5 mt-5 ml-20  rounded-md  "> 
                <div className="p-3 bg-lime-400 rounded-md mb-2">
                    <text className="font-alfa "> BUY WHEAT</text>
                </div>
                <div className="grid place-items-center mt-2">
                     <text className=" font-alfa text-center"> 1 Wheat = 1 EGG</text>
                </div>
                
                
                <div  className="h-5/6 w-full  grid  place-items-center ">
                    <div class="w-3/6 h-auto px-10 m-3">
                        <img src="https://cdn.discordapp.com/attachments/958394721011662938/977648219205017740/Untitled4_20220522020454.png" alt="..." class="shadow rounded max-w-full h-auto align-center border-none" />
                    </div>
                    {/* <div class="w-4/6 h-3/4 px-6 m-5 ">
                        <img src="https://cdn.discordapp.com/attachments/958394721011662938/958394807460438047/Untitled2_20220329222043.png" alt="..." class="shadow rounded max-w-full h-auto align-center border-none" />
                    </div> */}
                </div>
                <div className="grid place-items-center p-3 bg-lime-500 ">
                    <form>
                        <text className="font-alfa"> Amount of wheat :  </text>
                        <input className="border-zinc-500" name = "amount" onChange={handleChange} type={"number"} min={1}></input>
                    </form>
                </div>
            </div>

            <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                onClick={exceuteBuy}
                className="inline-block px-6 py-2.5 bg-rose-700 text-white font-alfa text-md leading-tight
                 rounded shadow-md hover:bg-rose-800 hover:shadow-lg focus:bg-rose-800 focus:shadow-lg focus:outline-none 
                 focus:ring-0  transition duration-150 ease-in-out ml-10 p-3"> BUY </button>
        </div>
    );
};

export default Wheat;