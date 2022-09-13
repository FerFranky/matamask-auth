import React, { useState } from "react";

import MetaMaskAuth from "./../../components/MetaMaskAuth";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
const Inicio = () => {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [address, setAddress] = useState(undefined);
  const [signature, setSignature] = useState("");
  const sign = async (message) => {
    try {
      if (!window.ethereum) {
        alert("Debes instalar metamask");
      }
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const signature = await signer.signMessage(message);
      setMsg(message);
      setAddress(address);
      setSignature(signature);
      console.log(address);
    } catch (error) {
      console.log(error);
      toast("No fue posible firmar la peticion.", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    console.log(message);
  };
  return (
    <>
      <MetaMaskAuth
        sign={sign}
        msg={msg}
        address={address}
        signature={signature}
      />
      <ToastContainer />
    </>
  );
};

export default Inicio;
