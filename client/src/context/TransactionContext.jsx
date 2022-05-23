import React,{useEffect,useState,Component, useRef} from "react";
import { ethers} from "ethers";
import tokenABI from "../tokenABI.json";
import eggABI from "../eggCoinABI.json";

export const TransactionContext = React.createContext();

const {ethereum} = window;

const tokenContractAddress = "0xBd113ce0D2f9fCa568c22d28c526505DFaFB56DB";
const eggContractAddress = "0xcF3bf376f4c7910c0BB0F1Afb66c392C86BA0aa7";


export const TransactionsProvider = ({children}) => {
    const temp = [];
    const [tokenData, setTokenData] = useState([]);
    const [currentAccount, setCurrentAccount] = useState("");
    const [wheatBalance, setWheatBalance] = useState("");
    const acc = useRef("");

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


    const checkIfWalletIsConnected = async () => {
        if(!ethereum) return alert("Please install metamask");
        const accounts = await ethereum.request({method: 'eth_accounts'});
        // console.log(accounts);
        setCurrentAccount(accounts[0]);
        acc.current = accounts[0];
        console.log("After set ",currentAccount,accounts[0],acc.current);

    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_requestAccounts", });
            setCurrentAccount(accounts[0]);
            console.log("After set"+currentAccount);
            window.location.reload();
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
      };
    
    const mintNFT = async (name) => {
        if(window.ethereum){
            try {
                const checkCoinApproval = await eggCoinContract.allowance(currentAccount,tokenContractAddress);
                console.log(checkCoinApproval);
                if(!Number(checkCoinApproval)){
                    approveToken();
                }
                console.log("minting: ",name);
                const response = await tokenContract.safeMint(name);
                console.log('response: ', response);

            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    const collectEgg = async (id) => {
        if(window.ethereum){
            try {
                console.log('collecting egg of: ',id);
                const response = await tokenContract.claimReward(BigInt(id));
                console.log('response: ', response);

            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    const buyWheat = async (amount) => {
        if(window.ethereum){
            try {
                console.log(amount);
                const response = await tokenContract.buyWheat(BigInt(amount));
                console.log('response: ', response);

            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    const transferChicken = async (transferAddress,id) => {
        if(window.ethereum){
            try {
                const approval = await tokenContract.approve(transferAddress,BigInt(id));
                approval.wait();
                const response = await tokenContract["safeTransferFrom(address,address,uint256)"](currentAccount,transferAddress,BigInt(id));
                response.wait();
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
                await checkIfWalletIsConnected();
                console.log("State Acc before enter balance of"+currentAccount);
                console.log("Ref Acc before enter balanceOf"+acc.current);
                var balance = await tokenContract.balanceOf(acc.current);
                console.log(balance)

                var nftAtIndex = [];
                for (let index = 0; index < Number(balance); index++) {
                    const response = await tokenContract.tokenOfOwnerByIndex(acc.current,BigInt(index));  //Will return the index of the NFT inside the tokenContract.
                    nftAtIndex.push(Number(response));
                }

                for(let index = 0; index < nftAtIndex.length ; index++) {
                    const response = await tokenContract.chickenMap(BigInt(nftAtIndex[index]));
                    temp[index] = (response);
                }
                
                setTokenData(temp);
                checkWheatAmount();
            } catch(error) {
                console.log("error: ", error)
            }
        }
    }

    const checkWheatAmount = async () => {
        if(window.ethereum){
            try{
                const response = await tokenContract.wheatInventory(acc.current);
                setWheatBalance(Number(response));
                console.log("WheatBalance",wheatBalance);
            }
            catch(error){
                console.log("error: ", error);
            }
        }
    }
    // useEffect(() => {
    //   displayNFTByAddress();
    // }, [currentAccount])
    

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
        collectEgg,
        transferChicken,
        checkWheatAmount,
        wheatBalance,

        }}>
            {children}
        </TransactionContext.Provider>
    );
}