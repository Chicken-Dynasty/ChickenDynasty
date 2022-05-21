import React,{ useContext } from "react";
import { TransactionContext } from "../context/transactionContext";

const Card = ({name,rarity,lastClaim,claimModifier}) => {
    return(        
    <div className="bg-pink-300 m-4 flex flex-1 
    2xl:min-w-[450px]
    2xl:max-w-[500px]
    sm:min-w-[270px]
    sm:max-w-[300px]
    flex-col p-3 rounded-md hover:shadow-2xl
    ">
        <div className="flex flex-col items-center w-full mt-3 ">
            <div className="flex justify-start w-full mb-6 p-2">
                <p>Chicken name</p>
            </div>
            <img src="https://cdn.discordapp.com/attachments/958394721011662938/958394807691141150/Untitled1_20220328224357.png"
                className="w-full h-128 2x:h-96 rounded-md shadow-lg object-cover"></img>
            <div>
                <button className="rounded-full border-2 bg-yellow-300 hover:bg-yellow-400">Collect Egg</button>
            </div>

        </div>

    </div>
    );
}
const ChickenCard = () => {
    const {currentAccount,tokenData} = useContext(TransactionContext);
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
            <div className="flex flex-wrap justify-center items-center mt-10">
                    {
                    tokenData.map((chicken, index) => (
                        <Card key={index} {...chicken}/>
                    ))}
                    
            </div>
        </div>

        
    );


}

export default ChickenCard;