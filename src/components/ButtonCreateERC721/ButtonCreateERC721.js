import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { ContractFactory, ethers } from "ethers";
import abi from "./abi.json";
import bytecode from "./bytecode.json";
import PendingTxModal from "../PendingTxModal";
import { useSigner, useAccount } from "wagmi";
import { toast } from "react-toastify";

const ButtonCreateERC721 = ({ onDeployed, name, symbol }) => {
  const { data: signer } = useSigner();
  const { data: account } = useAccount();
  const [pendingTx, setPendingTx] = useState(false);

  const deployContract = async () => {
    if (!account?.address) {
      toast.error("please connect wallet");
      return;
    }
    setPendingTx("Sign transaction deploying ERC721 smart contract.");

    // Deploy the contract
    const factory = new ContractFactory(abi, bytecode, signer);

    const options = {
      gasLimit: 3215060,
    };
    const contract = await factory.deploy(name, symbol, options);
    setPendingTx("Deploying creator ERC721 contract.");
    const receipt = await contract.deployed();
    onDeployed?.(receipt.address);
  };

  const handleButtonClick = async () => {
    try {
      await deployContract();
    } catch (err) {
      console.error(err);
    }
    setPendingTx(false);
  };

  return (
    <>
      {pendingTx ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          onClick={handleButtonClick}
          disabled={pendingTx}
        >
          Create Smart Contract
        </Button>
      )}
      <PendingTxModal pendingTx={pendingTx} />
    </>
  );
};

export default ButtonCreateERC721;
