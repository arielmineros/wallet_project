import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3 from 'web3';

const WalletContext = createContext();

export const useWallet = () => {
  return useContext(WalletContext);
};

export const WalletProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    async function initializeWeb3() {
      if (window.ethereum) {
        const ethereum = window.ethereum;

        try {
          await ethereum.request({ method: 'eth_requestAccounts' });
          const web3Instance = new Web3(ethereum);
          setWeb3(web3Instance);
          const accs = await web3Instance.eth.getAccounts();
          setAccounts(accs);
          setWalletConnected(true);
        } catch (error) {
          console.error('Error al conectar la billetera:', error);
        }
      }
    }

    initializeWeb3();
  }, []);

  return (
    <WalletContext.Provider value={{ web3, accounts, walletConnected }}>
      {children}
    </WalletContext.Provider>
  );
};