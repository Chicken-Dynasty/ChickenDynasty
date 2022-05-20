import React,{Children, useEffect,useState} from "react";
import { ethers} from "ethers";

export const TransactionContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

}

export const TransactionProvider = ({Children}) => {

    const [connectedAccount, setConnectedAccount] = useState("");

    const checkIfWalletIsConnected = async () => {
        if(!ethereum) return alert("Please install metamask");

        const accounts = await ethereum.request({method: 'eth_accounts'});

        console.log(accounts);
    }

    const connectWallet = async() => {
        try{
            if(!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({method : 'eth_requestAccounts' });

            setConnectedAccount(accounts[0]);
        }
        catch(error){
            console.log(error);
            throw new Error("No ethereum object");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    },[]);

    return (
        <TransactionContext.Provider value={{connectWallet,connectedAccount}}>
            {Children}
        </TransactionContext.Provider>
    );
}