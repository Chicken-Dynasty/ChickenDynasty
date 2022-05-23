import React,{ useEffect,useContext, useRef,useState} from "react";
import { TransactionContext } from "../context/TransactionContext";
import Countdown from 'react-countdown';


const Card = ({name,rarity,lastClaim,claimModifier,chickenId}) => {
    const {collectEgg,transferChicken,wheatBalance,displayNFTByAddress} = useContext(TransactionContext);
    const [transferAddress,setTransferAddress] = useState("");
    const [claimable,setClaimable] = useState("");
    const ref = useRef(transferAddress);

    let imageSrc = "";
    let claimRef  = Number(lastClaim)+Number(claimModifier) < Math.floor(new Date().getTime()/1000.0);
    let remainingTime = (Number(lastClaim)+Number(claimModifier)- Math.floor(new Date().getTime()/1000.0)) * 1000;
    let countDownEnd = false;
    console.log("claimable in ", remainingTime);

    console.log(name,Number(rarity),Number(lastClaim),Number(claimModifier),Number(chickenId));
    const callCollectEggContract = () => {
        collectEgg(Number(chickenId));
    }

    const handleChange = (event) => {
        ref.current = event.target.value;
        console.log(ref.current);
    }

    const transfer = () => {
        console.log("transfering: ",Number(chickenId));
        transferChicken(ref.current,Number(chickenId));
        
    }

    switch(Number(rarity)){
        case 0 : imageSrc = "https://cdn.discordapp.com/attachments/958394721011662938/958394807460438047/Untitled2_20220329222043.png"; break;
        case 1 : imageSrc = "https://cdn.discordapp.com/attachments/958394721011662938/958394807691141150/Untitled1_20220328224357.png"; break;
        case 2 : imageSrc = "https://cdn.discordapp.com/attachments/958394721011662938/958394807905026128/Untitled1_20220329222159.png"; break;
        case 3 : imageSrc = "https://cdn.discordapp.com/attachments/958394721011662938/958394808135725076/Untitled2_20220329222030.png"; break;
        default : imageSrc = ""
    }

    useEffect(() => {
        displayNFTByAddress();
    }, [countDownEnd])
    
    return( 

    <div className="card w-72 bg-white shadow-xl">
        <div className="card-actions justify-end px-5 py-5">
            <label htmlFor={`${chickenId}my-modal`}  className="btn modal-button btn-outline btn-accent">Transfer </label>
                    <input type="checkbox" id={`${chickenId}my-modal`}  className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Transfering your chicken</h3>
                            <p className="py-4">Enter the reciever's address</p>
                            <input type="text" placeholder="Type here" className="input input-bordered input-success w-full max-w-xs" onChange={handleChange} />
                            <div className="modal-action">
                                <label htmlFor={`${chickenId}my-modal`}  className="btn btn-success" onClick={()=>transfer()}>Transfer</label>
                                <label htmlFor={`${chickenId}my-modal`}  className="btn btn-error">Cancel</label>
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
                {
                    wheatBalance ? (
                        claimRef ? (<button className="btn btn-accent" onClick={callCollectEggContract}>Collect Egg</button>) :
                        <button className="btn btn-error"><Countdown date={Date.now() + remainingTime} onComplete={displayNFTByAddress} /></button>
                    ): 
                    <button className="btn btn-error">Insufficient Wheat</button>
                    
                }
            </div>
        </div>
    </div>                  
    );
}
export default Card;