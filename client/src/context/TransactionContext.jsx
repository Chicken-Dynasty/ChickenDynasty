import React,{useEffect,useState,Component} from "react";
import { ethers} from "ethers";
import tokenABI from "../tokenABI.json";
import eggABI from "../eggCoinABI.json";

export const TransactionContext = React.createContext();

const {ethereum} = window;

const tokenContractAddress = "0x4101FA871b81Dd46Bc4d3C746Ad37F1e5C3B7EC0";
const eggContractAddress = "0xcF3bf376f4c7910c0BB0F1Afb66c392C86BA0aa7";


export const TransactionsProvider = ({children}) => {
    const temp = [];
    const [tokenData, setTokenData] = useState([]);
    const [currentAccount, setCurrentAccount] = useState("");
    const [wheatBalance, setWheatBalance] = useState("");
    const [wheatInputAmount, setWheatInputAmount] = useState("");
    const [chickenName,setChickenName] = useState("");
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const tokenContract = new ethers.Contract(
        tokenContractAddress,
        tokenABI,
        signer
    );

    const eggCoinContract = new ethers.Contract(
        eggContractAddress,
        eggABI,
        signer
    );

    const handleWheatAmountInput = (e) => {
        setWheatInputAmount(e.target.value);
    }
    const handleChickenName = (e) => {
        setChickenName(e.target.value);
    }



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
                const checkCoinApproval = await eggCoinContract.allowance(currentAccount,tokenContractAddress);
                console.log(checkCoinApproval);
                if(!Number(checkCoinApproval)){
                    approveToken();
                }
                const response = await tokenContract.safeMint(chickenName);
                console.log('response: ', response);

            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    const collectEgg = async (id) => {
        if(window.ethereum){
            try {
                console.log(id);
                const response = await tokenContract.claimReward(BigInt(id));
                console.log('response: ', response);

            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    const buyWheat = async () => {
        if(window.ethereum){
            try {
                console.log(wheatInputAmount);
                const response = await tokenContract.buyWheat(BigInt(wheatInputAmount));
                console.log('response: ', response);

            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    const approveToken = async () => {
        if(window.ethereum){
            try {
                const eggCoinapproval = await eggCoinContract.approve(currentAccount,BigInt(10000000000000000000000));
                await eggCoinapproval.wait();
                const tokenApproval = await eggCoinContract.approve(tokenContractAddress,BigInt(10000000000000000000000));
                await tokenApproval.wait(); //wait() has the logic to return receipt once the transaction is mined
                return("Succeed");
            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    const displayNFTByAddress = async () => {
        if(window.ethereum){
            try{
                
                const balance = await tokenContract.balanceOf(currentAccount);
                // console.log('response: ', Number(balance));

                const nftAtIndex = [];
                for (let index = 0; index < balance; index++) {
                    const response = await tokenContract.tokenOfOwnerByIndex(currentAccount,BigInt(index));  //Will return the index of the NFT inside the tokenContract.
                    nftAtIndex.push(response);
                }
                // console.log(nftAtIndex);
                
                for (const index in nftAtIndex) {
                    const response = await tokenContract.chickenMap(BigInt(index));
                    temp[index] = (response);
                }
                
                console.log(temp);
                setTokenData(temp);
                
                
            } catch(error) {
                console.log("error: ", error)
            }
        }
    }

    const checkWheatAmount = async () => {
        if(window.ethereum){
            try{
                const response = await tokenContract.wheatInventory(currentAccount);
                setWheatBalance(Number(response));
                console.log(wheatBalance);
            }
            catch(error){
                console.log("error: ", error);
            }
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    },[]);

    return (
        
        <TransactionContext.Provider value={{connectWallet,
        currentAccount,
        mintNFT,
        displayNFTByAddress,
        buyWheat,
        tokenData,
        wheatInputAmount,
        setWheatInputAmount,
        handleWheatAmountInput,
        handleChickenName,
        collectEgg,

        }}>
            {children}
        </TransactionContext.Provider>
    );
}