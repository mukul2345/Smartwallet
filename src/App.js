// App.js
import React, { useEffect, useState } from "react";
import SmartWalletContract from "./contracts/SmartWallet.json";
import SmartWalletProxyContract from "./contracts/SmartWalletProxy.json";
import { ethers } from "ethers";

function App() {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);
    const [walletBalance, setWalletBalance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [depositAmount, setDepositAmount] = useState("");
    const [transferAmount, setTransferAmount] = useState("");
    const [transferToAddress, setTransferToAddress] = useState("");
    const [promptMessage, setPromptMessage] = useState("");

    useEffect(() => {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== "undefined") {
            loadBlockchainData();
        }
    }, []);

    const loadBlockchainData = async () => {
        try {
            // Request account access if needed
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Get the current account
            const accounts = await provider.listAccounts();
            setCurrentAccount(accounts[0]);

            // Get the Smart Wallet address for the current user
            const proxyContract = new ethers.Contract(SmartWalletProxyContract.networks["31337"].address, SmartWalletProxyContract.abi, signer);
            const walletAddress = await proxyContract.getWallet();
            setWalletAddress(walletAddress);

            // Get the balance of the Smart Wallet
            const walletContract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", SmartWalletContract.abi, signer);//replace address accordingly
            const balance = await walletContract.balance();
            setWalletBalance(balance);
        } catch (error) {
            console.error("Error loading blockchain data:", error);
        }
    };

    const connectWalletHandler = async () => {
        try {
            // Request account access if needed
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    const createWalletHandler = async () => {
        try {
            setLoading(true);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const proxyContract = new ethers.Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", SmartWalletProxyContract.abi, signer);
            await proxyContract.createWallet();
            setLoading(false);
            setPromptMessage("Wallet created successfully!");
            // Refresh wallet data after creating
            loadBlockchainData();
        } catch (error) {
            setLoading(false);
            console.error("Error creating wallet:", error);
            setPromptMessage("Error creating wallet! Please try again.");
        }
    };

    const depositFundsHandler = async () => {
        try {
            setLoading(true);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const walletContract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", SmartWalletContract.abi, signer);
            const tx = await walletContract.deposit({ value: ethers.utils.parseEther(depositAmount) });
            await tx.wait();
            setLoading(false);
            setPromptMessage("Funds deposited successfully!");
            // Refresh wallet balance after deposit
            loadBlockchainData();
        } catch (error) {
            setLoading(false);
            console.error("Error depositing funds:", error);
            setPromptMessage("Error depositing funds! Please try again.");
        }
    };

    const transferFundsHandler = async () => {
        try {
            setLoading(true);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const walletContract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", SmartWalletContract.abi, signer);
            const tx = await walletContract.transfer(transferToAddress, ethers.utils.parseEther(transferAmount));
            await tx.wait();
            setLoading(false);
            setPromptMessage("Funds transferred successfully!");
            // Refresh wallet balance after transfer
            loadBlockchainData();
        } catch (error) {
            setLoading(false);
            console.error("Error transferring funds:", error);
            setPromptMessage("Error transferring funds! Please try again.");
        }
    };

    const destroyWalletHandler = async () => {
        try {
            setLoading(true);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const walletContract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", SmartWalletContract.abi, signer);
            const tx = await walletContract.destroyWallet();
            await tx.wait();
            setLoading(false);
            setPromptMessage("Wallet destroyed successfully!");
            // Clear wallet data after destruction
            setWalletAddress(null);
            setWalletBalance(null);
        } catch (error) {
            setLoading(false);
            console.error("Error destroying wallet:", error);
            setPromptMessage("Error destroying wallet! Please try again.");
        }
    };

    return (
        <div className="App" style={{ textAlign: "center" }}>
            <h1>Smart Wallet App</h1>
            {currentAccount ? (
                <>
                    <p>Connected Wallet: {currentAccount}</p>
                    {walletAddress && <p>Wallet Address: {walletAddress}</p>}
                    {walletBalance && <p>Wallet Balance: {ethers.utils.formatEther(walletBalance)} ETH</p>}
                    <input type="text" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} placeholder="Enter amount to deposit" />
                    <button onClick={depositFundsHandler} disabled={loading}>Deposit Funds</button>
                    <br />
                    <input type="text" value={transferToAddress} onChange={(e) => setTransferToAddress(e.target.value)} placeholder="Enter recipient address" />
                    <input type="text" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} placeholder="Enter amount to transfer" />
                    <button onClick={transferFundsHandler} disabled={loading}>Transfer Funds</button>
                    <br />
                    <button onClick={destroyWalletHandler} disabled={loading}>Destroy Wallet</button>
                </>
            ) : (
                <button onClick={connectWalletHandler}>Connect Wallet</button>
            )}
            <br />
            <footer style={{ position: "fixed", bottom: 0, width: "100%", backgroundColor: "#f0f0f0", padding: "10px 0" }}>BY: Mukul Gupta</footer>

            <button onClick={createWalletHandler} disabled={loading}>Create Wallet</button>
            {promptMessage && <p>{promptMessage}</p>}
        </div>
    );
}

export default App;
