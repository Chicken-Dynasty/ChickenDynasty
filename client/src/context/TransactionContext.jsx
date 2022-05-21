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
    const tokenData = [];
    const [currentAccount, setCurrentAccount] = useState("");
    const [wheatBalance, setWheatBalance] = useState("");
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

        // console.log(accounts);
        setCurrentAccount(accounts[0]);

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

    const buyWheat = async () => {
        if(window.ethereum){
            try {
                const response = await contract.buyWheat(BigInt(1));
                console.log('response: ', response);

            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    const displayNFTByAddress = async () => {
        if(window.ethereum){
            try{
                
                const balance = await contract.balanceOf(currentAccount);
                // console.log('response: ', Number(balance));

                const nftAtIndex = [];
                for (let index = 0; index < balance; index++) {
                    const response = await contract.tokenOfOwnerByIndex(currentAccount,BigInt(index));  //Will return the index of the NFT inside the contract.
                    nftAtIndex.push(response);
                }
                // console.log(nftAtIndex);
                
                for (const index in nftAtIndex) {
                    const response = await contract.chickenMap(BigInt(index));
                    tokenData[index] = (response);
                }
                
                console.log(tokenData);
                
                
            } catch(error) {
                console.log("error: ", error)
            }
        }
    }

    const checkWheatAmount = async () => {
        if(window.ethereum){
            try{
                const response = await contract.wheatInventory(currentAccount);
                setWheatBalance(Number(response));
                console.log(wheatBalance);
            }
            catch(error){
                console.log("error: ", error);
            }
        }
    }

    useEffect(() => {
        if(checkIfWalletIsConnected()){
            displayNFTByAddress;

        }

    },[]);

    return (
        
        <TransactionContext.Provider value={{connectWallet,
        currentAccount,
        mintNFT,
        displayNFTByAddress,
        buyWheat,

        }}>
            {children}
        </TransactionContext.Provider>
    );
}