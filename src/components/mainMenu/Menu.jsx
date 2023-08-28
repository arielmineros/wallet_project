// import logo from './logo.svg';
// import './App.css';
import "./Menu.css";
import "./SearchBar";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Web3 from "web3";
//import ConnectWallet from "../connectWallet/ConnectWallet";
import withReactContent from "sweetalert2-react-content";
import SearchBar from "./SearchBar";
import smartContractRecord from "../smartContract/record.json";
// import mainLogo from './blockchain.png'

function Menu() {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [contract, setContract] = useState(null);
    const [verificationWallet, setVerificationWallet] = useState(false);
    const [buttonWallet, setButtonWallet] = useState(false);
    const [listarInfo, setListarInfo] = useState([]);
    const MySwal = withReactContent(Swal);

    //Function to connect wallet
    const connectWallet = async () => {
        //verify if metamask is installed
        if (typeof window.ethereum !== "undefined") {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
            try {
                //ask for wallet access
                await window.ethereum.enable();

                //Get the address of the current account
                const accounts = await web3Instance.eth.getAccounts();
                setAccount(accounts[0]);

                // Get amount in the account
                const balanceWei = await web3Instance.eth.getBalance(
                    accounts[0]
                ); // Represents the balance of an acc in wei

                const balanceEth = web3Instance.utils.fromWei(
                    balanceWei,
                    "ether"
                ); //Converts the balance from wei to eth
                setBalance(balanceEth);
                setButtonWallet(false);

                const contractInstance = new web3Instance.eth.Contract(
                    smartContractRecord,
                    smartContractRecord &&
                        "0x34D44DBc2c73B0eCb4bC738bfB850f92AaB89ae2"
                ); //Create an instance
                setContract(contractInstance);
            } catch (error) {
                console.log(error);
                MySwal.fire({
                    icon: "error",
                    title: "Oops",
                    text: "Has rechazado la solicitud de conexión de tu wallet",
                });
            }
        } else {
            setVerificationWallet(false);
        }
    };

    //Verify if we have a wallet
    useEffect(() => {
        async function Wallet() {
            if (typeof window.ethereum !== "undefined") {
                setVerificationWallet(true);
                setButtonWallet(true);
            }
            //else {
            //setButtonWallet(false);
            //}
        }
        Wallet();
    }, []);

    return (
        <nav className="navbarra">
            <div className="nav-lista">
                <div className="logo-contenedor">
                    <li className="logo-empresa">
                        <img
                            src={require("../../img/blockchain.png")}
                            alt="logo"
                        />
                        <label id="brand-name">Blockchain</label>
                    </li>
                </div>

                <div className="search-contenedor">
                    <a>
                        <SearchBar />
                    </a>
                </div>

                <div className="menu-contenedor">
                    <>
                        {verificationWallet ? (
                            <>
                                <li>
                                    <a href="#" className="navegador-item">
                                        <img
                                            src={require("../../icons/home.png")}
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="navegador-item">
                                        <img
                                            src={require("../../icons/heart.png")}
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="navegador-item">
                                        <img
                                            src={require("../../icons/shopping-cart.png")}
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="navegador-item">
                                        <img
                                            src={require("../../icons/bell.png")}
                                        />
                                    </a>
                                </li>
                                <li className="navegador-item">
                                    <>
                                        {buttonWallet ? (
                                            <button onClick={connectWallet}>
                                                Conectar wallet
                                            </button>
                                        ) : (
                                            <button onClick={connectWallet}>
                                                Wallet conectada
                                            </button>
                                        )}
                                    </>
                                </li>
                            </>
                        ) : (
                            <>
                                <h3>
                                    Para comenzar en esta plataforma es esencial
                                    crear una billetera
                                </h3>
                            </>
                        )}
                    </>
                </div>
            </div>
        </nav>
    );
}

export default Menu;
