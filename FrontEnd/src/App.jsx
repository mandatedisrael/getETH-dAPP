import React, { useEffect, useState } from "react";
import "./App.css";
import abi from "./utils/freeETH.json";
import { ethers } from "ethers";

const App = () => {
  const contractAddress = "0xFc7DC3d58f1a60E794b1E9ac35Ee6b85C3fb3b31";

  const contractABI = abi.abi;

  const [currentAccount, setCurrentAccount] = useState("");

  const [allBeneficiaries, setAllBeneficiaries] = useState([]);

  const [inputMessage, setInputMessage] = useState("afo");

  const handleInput = (e) => {
    e.preventDefault();
    setInputMessage(e.target.value);
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(accounts[0]);
        console.log("Found an authorized account:", account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const checkETHLeft = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = await new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();
        const freeETHContract = await new ethers.Contract(contractAddress, contractABI, signer);


        const beneficiaries = await freeETHContract.getAllBeneficiaries();

        const beneficiaryClean = beneficiaries.map(benefit => {
          return {
            address: benefit._beneficiaries,
            timestamp: (new Date(benefit._timestamp * 1000)).toString(),
            message: benefit._message,
          };
        });

        setAllBeneficiaries(beneficiaryClean);

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      alert("You need to connect your metamask first!");
    }

  }

  const transferETH = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = await new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();
        const freeETHContract = await new ethers.Contract(contractAddress, contractABI, signer);
        freeETHContract.sendETH(inputMessage, { gasLimit: 3000000 });
      }
    } catch (error) {
      console.log(error);
    }

  }

  const feedInput = (e) => {
    e.preventDefault();
    transferETH();

  }


  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  useEffect(() => {
    let ethPortalContract;

    const onNewBeneficiary = (from, timestamp, message) => {
      console.log("NewBeneficiary", from, timestamp, message);
      setAllBeneficiaries(prevState => [...prevState, { address: from, timestamp: (new Date(timestamp * 1000)).toString(), message: message, },]);
    };

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      ethPortalContract = new ethers.Contract(contractAddress, contractABI, signer);
      ethPortalContract.on("Beneficiaries", onNewBeneficiary);
    }

    return () => {
      if (ethPortalContract) {
        ethPortalContract.off("NewMessage", onNewBeneficiary);
      }
    };
  }, []);

  useEffect(() => {
    let ethPortalContract;
    const onStatus = (userStatus) => {
      alert(userStatus);
    }
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      ethPortalContract = new ethers.Contract(contractAddress, contractABI, signer);
      ethPortalContract.on("WinOrLoss", onStatus)
    }

    return () => {
      if (ethPortalContract) {
        ethPortalContract.off("WinOrLoss", onStatus);
      }
    }
  }, []);

  return (
    <div className="mainContainer">
      <div class="header-new">
        <div class="name">
          KingX
          </div>
        {!currentAccount && (
          <button className="buttonx" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
        <button className="buttonx" onClick={checkETHLeft}>
          Check Beneficiaries
        </button>
      </div>
      <div className="dataContainer">
        <div className="reason-div">
          Need Free ether&#10067;
        </div>

        <form>
          <input type="text" class="msg" name="msg" placeholder="Why you need this?" onChange={handleInput} ></input><br></br>
          <input type="submit" value="Submit" class="msg-submit" onClick={feedInput}></input>
        </form>
      </div>
      <div class="beneficiary-list">
        {allBeneficiaries.map((eachBeneficiary, index) => {
          return (
            <div key={index} class="current-loop">
              <div class="address"> &#10004;&#65039; {eachBeneficiary.address} said "<p class="pmsg">{eachBeneficiary.message}</p>" and got 0.001ETH on <p class="ptime">{eachBeneficiary.timestamp}</p></div>
            </div>)
        })}
      </div>
    </div>
  );
}

export default App