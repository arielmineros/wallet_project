import { useEffect, useState } from "react";
import Web3 from "web3";

// function App(){
//     const [Metamask, setMetamask]=useState(false);
//     const [web3,setWeb3]=useState(null);
    
// }


function ConnectWalletBtn(props){

    const [Metamask, setMetaMask]=useState(false);
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);  //GUARDA LA CUENTA
    const [balance, setBalance] = useState(null);  //guarda el balance
    
    const  conectarWallet = async()=>{

    if(typeof window.ethereum !=='undefined'){

    const web3Instance = new Web3(window.ethereum);
    setWeb3(web3Instance);

    try{
      await window.ethereum.enable();
    }catch(error){
        console.error(error);
      
    };
    }else{
      setMetaMask(false)
    }
    

  }


  useEffect(()=>{
    async function Wallet(){
      if(typeof window.ethereum !=='undefined'){
        console.log("si tenemos wallet")
        setMetaMask(true);
      }else{
        setMetaMask(false)
        console.log("no tenemos wallet")
      }
  };
  Wallet();
  },[]);
    return(
        <button onClick={props.ConnectWalletBtn}>Connect wallet</button>
    );
}
export default ConnectWalletBtn