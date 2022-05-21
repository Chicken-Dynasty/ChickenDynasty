import React,{useEffect,useState,Component} from "react";
import { ethers} from "ethers";
import tokenABI from "../tokenABI.json";

export const TransactionContext = React.createContext();

const {ethereum} = window;

const tokenContractAddress = "0x2AeF139E269393111C9325ab502d3c77cC78b72E";

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        tokenContractAddress,
        tokenABI,
        signer
    );
    return contract;
}

export const TransactionsProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        tokenContractAddress,
        tokenABI,
        signer
    );

    const checkIfWalletIsConnected = async () => {
        if(!ethereum) return alert("Please install metamask");

        const accounts = await ethereum.request({method: 'eth_accounts'});

        console.log(accounts);
    }

    const connectWallet = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_requestAccounts", });
    
          setCurrentAccount(accounts[0]);
          window.location.reload();
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      };
    
    const mintNFT = async () => {
        if(window.ethereum){
            try {
                const response = await contract.safeMint("kai");
                console.log('response: ', response);

            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    },[]);

    return (
        
        <TransactionContext.Provider value={{connectWallet,
        currentAccount,
        mintNFT}}>
            {children}
        </TransactionContext.Provider>
    );
}