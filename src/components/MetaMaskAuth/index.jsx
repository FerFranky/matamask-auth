import React, { useEffect, useState, useRef } from "react";
import styles from "./MetamaskAuth.css";
import image from "../../assets/metamask.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { SendSign } from "../../utils/Api";
function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}
const getbalance = (address, setUserBalance) => {
  // Requesting balance method
  window.ethereum
    .request({
      method: "eth_getBalance",
      params: [address, "latest"],
    })
    .then((balance) => {
      setUserBalance(ethers.utils.formatEther(balance));
      console.log(ethers.utils.formatEther(balance));
      console.log(ethers.utils);
    });
};
async function connect(onConnected, setsignStatus, setUserBalance) {
  if (!window.ethereum) {
    alert("Get MetaMask!");
    return;
  }
  if (localStorage.getItem("sign")) {
    localStorage.removeItem("sign")
    setsignStatus(false)
  }
  const accounts = await window.ethereum
    .request({
      method: "eth_requestAccounts",
    })
    .catch((error) => {
      if (error.code === 4001) {
        toast("No fue posible autenticar al usuario.", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error(error);
      }
    });

  onConnected(accounts[0]);
  console.log("Hasta aca funcis" + accounts);
  getbalance(accounts[0], setUserBalance);
  setUserBalance(getbalance(accounts[0]));
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const signature = await signer.signMessage(`
    Ya quedo esto!!!

    Welcome to MyLogin!

    Signing is the only way we can truly know 
    that you are the owner of the wallet you 
    are connecting. Signing is a safe, gas-less 
    transaction that does not in any way give 
    MyLogin permission to perform any 
    transactions with your wallet. \n
    Your address is \n
    ` + address);
    console.log("firma" + signature);
    console.log("Vamo a almacenar la firma");
    try {
      if (localStorage.getItem("sign")) {
        if (localStorage.getItem("sign") != signature) {
          localStorage.setItem("sign", signature);
        }
        localStorage.getItem("sign");
        console.log("existe");
      }
      console.log("mostrar");

      localStorage.setItem("sign", signature);
      let response = await SendSign(signature, accounts[0]);
      console.log('*****************************');
      console.log(response);
      console.log('*****************************');
      console.log(signature);
      setsignStatus(true);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log("hasta aqui cae el error");
    toast("Debes autorizar la firma para continuar.", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

async function checkIfWalletIsConnected(
  onConnected,
  setsignStatus,
  setUserBalance
) {
  let accounts = "";
  if (localStorage.getItem("sign")) {
    setsignStatus(true);
  }
  if (window.ethereum) {
    accounts = await window.ethereum
      .request({
        method: "eth_accounts",
      })
      .catch((error) => {
        // EIP-1193 userRejectedRequest error
        // console.log('Please connect to MetaMask.');
      });
    console.log(accounts);
    getbalance(accounts[0], setUserBalance);
    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }

    if (isMobileDevice()) {
      await connect(onConnected);
    }
  }
}

const MetaMaskAuth = ({ sign, msg, address, signature }) => {
  const text_area = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    sign(text_area.current.value);
  };
  const [userAddress, setUserAddress] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const [signStatus, setsignStatus] = useState(false);
  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress, setsignStatus, setUserBalance);
  }, []);
  try {
    const getbalance = (address) => {
      // Requesting balance method
      window.ethereum
        .request({
          method: "eth_getBalance",
          params: [address, "latest"],
        })
        .then((balance) => {
          console.log(ethers.utils.formatEther(balance));
          console.log(ethers.utils);
          // Setting balance
          //setdata({
          // address: address,
          // Balance: ethers.utils.formatEther(balance),
          //});
        });
    };
    getbalance(userAddress);
  } catch (error) {
    
  }

  console.log("Main method " + userAddress);
  console.log("Main method " + signStatus);
  return userAddress && signStatus ? (
    <div className="Align-Items-Center row">
      <div className="col-12 Align-Items-Center ">
        <Link to="/logout">Cerrar sesion</Link>
      </div>
      <div className="col-12 Align-Items-Center ">
        <h3>Wallet conectada </h3>
      </div>
      <div className="col-12 Align-Items-Center ">
        <h6>
          <Address userAddress={userAddress} />
        </h6>
      </div>
      <div className="col-12 Align-Items-Center ">
        <h5>Balance: {userBalance}</h5>
      </div>
      <div className="col-12 Align-Items-Center ">
        <Link to="/firmas">Firmas obtenidas</Link>
      </div>
    </div>
  ) : (
    <Connect
      setUserAddress={setUserAddress}
      setsignStatus={setsignStatus}
      setUserBalance={setUserBalance}
    />
  );
};

export default MetaMaskAuth;

function Connect({ setUserAddress, setsignStatus, setUserBalance }) {
  if (isMobileDevice()) {
    const dappUrl = "metamask-auth.ilamanov.repl.co"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
    const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
    return (
      <a href={metamaskAppDeepLink}>
        <button className={styles.button}>Connect to MetaMask</button>
      </a>
    );
  }

  return (
    <div className="Align-Items-Center">
      <button
        className={"btn-Modal"}
        onClick={() => connect(setUserAddress, setsignStatus, setUserBalance)}
      >
        <img className={"Image-Metamask"} src={image} />
        <h1>MetaMask</h1>
        <h4>Connect to your MetaMask Wallet</h4>
      </button>
      <ToastContainer />
    </div>
  );
}

function Address({ userAddress }) {
  return <span className={styles.address}>{userAddress}</span>;
}
