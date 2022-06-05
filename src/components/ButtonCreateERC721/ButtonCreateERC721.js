import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import abi from "./abi.json";
import PendingTxModal from "../PendingTxModal";
import { useAccount, useContract, useNetwork, useSigner } from "wagmi";
import { toast } from "react-toastify";
import getFactoryAddress from "../../utils/getFactoryAddress";

const ButtonCreateERC721 = ({ onDeployed, name, symbol }) => {
  const { data: signer } = useSigner();
  const { data: account } = useAccount();
  const { activeChain } = useNetwork();
  const contract = useContract({
    addressOrName: getFactoryAddress(activeChain?.id),
    contractInterface: abi,
    signerOrProvider: signer,
  });

  const [pendingTx, setPendingTx] = useState(false);

  const createAlbum = async () => {
    if (!account?.address) {
      toast.error("please connect wallet");
      return;
    }
    setPendingTx("Sign transaction deploying ERC721 smart contract.");

    const tx = await contract.createAlbum(name, symbol);
    setPendingTx("Deploying creator ERC721 contract.");
    const receipt = await tx.wait();
    onDeployed?.(receipt?.events?.[0]?.args?._album);
  };

  const handleButtonClick = async () => {
    try {
      await createAlbum();
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
