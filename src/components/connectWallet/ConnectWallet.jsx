import { useEffect, useState } from "react";
import Web3 from "web3";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { type } from "@testing-library/user-event/dist/type";

function ConnectWallet(props) {
    const [Web3, setWeb3] = useState(null);
    const [account, setAccout] = useState(null);
    const [balance, setBalance] = useState(null);
    const [contract, setContract] = useState(null);
    const [verificationWallet, setVerificationWallet] = useState(false);
    //const [buttonWallet, setButtonWallet] = useState(false);
    const [listarInfo, setListarInfo] = useState([]);
    const MySwal = withReactContent(Swal);

    //Function to connect wallet
    const connectWallet = async () => {
        //verify if metamask is installed
        if (typeof window.ethereum !== "undefined") {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
            try {
                await window.ethereum.enable();
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

