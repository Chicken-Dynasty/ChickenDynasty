import React,{ useEffect,useContext, useState } from "react";
import { TransactionContext } from "../context/transactionContext";


const Card = ({name,rarity,lastClaim,claimModifier,chickenId}) => {
    const {setChickenId,chickenIdIndex,collectEgg,transferChicken,handleTransferAddress} = useContext(TransactionContext);
    const [transferAddress,setTransferAddress] = useState("");
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

    const transfer = () => {
        transferChicken(Number(chickenId));
    }

    return( 
    <div class="card w-96 bg-base-100 shadow-xl">
        <div className="card-actions justify-end px-5 py-5">
            <label for="my-modal" class="btn modal-button btn-outline btn-accent">Transfer </label>
                <input type="checkbox" id="my-modal" class="modal-toggle" />
                    <div class="modal">
                     <div class="modal-box">
                         <h3 class="font-bold text-lg">Transfering your chicken</h3>
                         <p class="py-4">Enter the reciever's address</p>
                         <input type="text" placeholder="Type here" class="input input-bordered input-success w-full max-w-xs" onChange={handleTransferAddress} />
                         <div class="modal-action">
                         {/* <button class="btn btn-success" onClick={transfer}>Transfer</button> */}
                         <label for="my-modal" class="btn btn-success" onClick={transfer}>Transfer</label>
                         <label for="my-modal" class="btn btn-error">Cancel</label>
                         </div>
                     </div>
                    </div>
        </div>            
        <figure class="px-10 pt-10">
            <img src={imageSrc} class="rounded-xl" />
        </figure> 

        <div class="card-body items-center text-center">    
            <h2 class="card-title">{name}</h2>        
            <div class="card-actions py-5">
            <button className="btn btn-accent" onClick={callCollectEggContract}>Collect Egg</button>
            </div>
        </div>
    </div>        
           
    // <div className="bg-pink-300 m-4 flex flex-1 
    // 2xl:min-w-[450px]
    // 2xl:max-w-[500px]
    // sm:min-w-[270px]
    // sm:max-w-[300px]
    // flex-col p-3 rounded-md hover:shadow-2xl
    // ">
    //     <div className="flex flex-col items-center w-full mt-3 ">
    //         <div className="flex justify-start w-full mb-6 p-2">
    //             <p>{name}</p>
    //             <div className="flex justify-end w-full mb-6 p-2">
    //                 <label for="my-modal" class="btn modal-button btn-outline btn-accent">Transfer </label>
    //                 <input type="checkbox" id="my-modal" class="modal-toggle" />
    //                 <div class="modal">
    //                 <div class="modal-box">
    //                     <h3 class="font-bold text-lg">Transfering your chicken</h3>
    //                     <p class="py-4">Enter the reciever's address</p>
    //                     <input type="text" placeholder="Type here" class="input input-bordered input-success w-full max-w-xs" onChange={handleTransferAddress} />
    //                     <div class="modal-action">
    //                     <button class="btn btn-success" onClick={transfer}>Transfer</button>
    //                     <label for="my-modal" class="btn btn-error">Cancel</label>
    //                     </div>
    //                 </div>
    //                 </div>
    //             </div>
    //         </div>

    //         <img src={imageSrc}
    //             className="w-full h-128 2x:h-96 rounded-md shadow-lg object-cover"></img>
    //         <div>
    //             <button className="btn btn-accent" onClick={callCollectEggContract}>Collect Egg</button>
    //         </div>

    //     </div>

    // </div>
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
                    <h3>Your chicken</h3>
                ):
                (
                    <h3>Please connect to your wallet</h3>
                )}
            </div>
            <div className="flex flex-wrap justify-center items-center mt-10 ">
                    {
                    tokenData.map((chicken, index) => (
                        <Card key={index} {...chicken}/>
                    ))}
                    
            </div>
        </div>

        
    );


}

export default ChickenCard;