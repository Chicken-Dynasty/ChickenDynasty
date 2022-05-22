import React,{ useEffect,useContext, useRef,useState} from "react";
import { TransactionContext } from "../context/transactionContext";


const Card = ({name,rarity,lastClaim,claimModifier,chickenId}) => {
    const {collectEgg,transferChicken} = useContext(TransactionContext);
    const [transferAddress,setTransferAddress] = useState("");
    const ref = useRef(transferAddress);

    let imageSrc = "";
    switch(Number(rarity)){
        case 0 : imageSrc = "https://cdn.discordapp.com/attachments/958394721011662938/958394807460438047/Untitled2_20220329222043.png"; break;
        case 1 : imageSrc = "https://cdn.discordapp.com/attachments/958394721011662938/958394807691141150/Untitled1_20220328224357.png"; break;
        case 2 : imageSrc = "https://cdn.discordapp.com/attachments/958394721011662938/958394807905026128/Untitled1_20220329222159.png"; break;
        case 3 : imageSrc = "https://cdn.discordapp.com/attachments/958394721011662938/958394808135725076/Untitled2_20220329222030.png"; break;
        default : imageSrc = ""
    }
    const callCollectEggContract = () => {
        collectEgg(Number(chickenId));
    }

    const handleChange = (event) => {
        ref.current = event.target.value;
        console.log(ref.current);
    }

    const transfer = () => {
        console.log("transfering: ",Number(chickenId));
        //transferChicken(ref.current,Number(chickenId));
    }

    return( 

    <div className="card w-96 bg-white shadow-xl">
        <div className="card-actions justify-end px-5 py-5">
            <label for="my-modal" className="btn modal-button btn-outline btn-accent">Transfer </label>
                <input type="checkbox" id="my-modal" className="modal-toggle" />
                    <div className="modal">
                     <div className="modal-box">
                         <h3 className="font-bold text-lg">Transfering your chicken</h3>
                         <p className="py-4">Enter the reciever's address</p>

                         <input type="text" placeholder="Type here" className="input input-bordered input-success w-full max-w-xs" onChange={handleChange} />
                         <div className="modal-action">
                         {/* <button className="btn btn-success" onClick={transfer}>Transfer</button> */}
                         <label for="my-modal" className="btn btn-success" onClick={transfer}>Transfer</label>
                         <label for="my-modal" className="btn btn-error">Cancel</label>
                         </div>
                     </div>
                    </div>
        </div>            
        <figure className="px-10 pt-10">
            <img src={imageSrc} className="rounded-xl" />
        </figure> 

        <div className="card-body items-center text-center">    
            <h2 className="card-title">{name}</h2>        
            <div className="card-actions py-5">
            <button className="btn btn-accent" onClick={callCollectEggContract}>Collect Egg</button>
            </div>
        </div>
    </div>                  
    );
}
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
                        <Card className= "" key={index} {...chicken}/>
                    ))}
                    
            </div>
        </div>

        
    );


}

export default ChickenCard;