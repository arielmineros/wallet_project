import { useEffect, useState } from "react";
import Web3 from "web3";

function App(){
    const [Metamask, setMetamask]=useState(false);
    const [web3,setWeb3]=useState(null);
    
}


function ConnectWalletBtn(props){
    return(
        <button onClick={props.ConnectWalletBtn}>Connect wallet</button>
    );
}
export default ConnectWalletBtn