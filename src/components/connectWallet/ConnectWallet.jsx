import { useEffect, useState } from "react";
import Web3 from "web3";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import smartContractRecord from "../smartContract/record.json";
import { type } from "@testing-library/user-event/dist/type";

function ConnectWallet(props) {
    const [Web3, setWeb3] = useState(null);
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
}
export default ConnectWallet;
