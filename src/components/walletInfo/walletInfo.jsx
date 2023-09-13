import React from "react";
import './walletInfo.css'

function WalletInfo(props){
    return(<>
        <div id="wallet-info-container">
            <div id="info-wallet">  

                <h2>Direccion: </h2>
                <br />
                <h3 id="get-info">{props.account != null ? props.account : ""}</h3>
                <br />
            </div>
            <div id="info-wallet">
                <h2>Saldo: </h2>
                <br />
                <h3 id="get-info">{props.balance != null ? Number(props.balance): ""} ETH</h3>
            </div>
        </div>
    </>);
}
export default WalletInfo