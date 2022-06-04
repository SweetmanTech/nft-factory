import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ethers } from "ethers";
import { useMemo, useState } from "react";
import abi from "../ButtonCreateERC721/abi.json";
import PendingTxModal from "../PendingTxModal";
import ConfirmedTxModal from "../ConfirmedTxModal";
import { getAddressLink } from "../../utils/etherscanService";
import { useSigner } from "wagmi";
import { useNetwork } from "wagmi";
import { useAccount } from "wagmi";

const MintNFT = ({ contractAddress }) => {
  const { data: signer } = useSigner();
  const { activeChain } = useNetwork();
  const { data: account } = useAccount();
  const [recipient, setRecipient] = useState(account?.address);
  const [tokenURI, setTokenURI] = useState(
    "ipfs://QmZMaWmwKCgmQLm6WUm7HXt9QNXgSzDKN7quFwnf4nv5QV"
  );
  const [tokenId, setTokenId] = useState();
  const [pendingTx, setPendingTx] = useState();

  const contract = useMemo(
    () =>
      contractAddress
        ? new ethers.Contract(contractAddress, abi, signer)
        : false,
    [contractAddress]
  );

  const contractBlockscanAddress = useMemo(
    () => getAddressLink(activeChain, contractAddress),
    [activeChain, contractAddress]
  );
  const ownerBlockscanAddress = useMemo(
    () => getAddressLink(activeChain, account?.address),
    [activeChain, account]
  );

  const handleReceipt = (receipt) => {
    const newTokenId = receipt.events[0].args.tokenId.toString();
    setTokenId(newTokenId);
    setPendingTx(false);
  };

  const mint = async () => {
    setPendingTx("Sign transaction to Mint your NFT.");
    const tx = await contract.mint(recipient, tokenURI);
    setPendingTx("Minting NFT");
    const receipt = await tx.wait();
    handleReceipt(receipt);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" align="center">
        Created!
      </Typography>
      <h3>
        ERC721 contract (owned by{" "}
        <a target="__blank" href={ownerBlockscanAddress}>
          you
        </a>
        ):{" "}
        <a target="__blank" href={contractBlockscanAddress}>
          {contractAddress}
        </a>
      </h3>
      <h1>Mint an NFT on your smart contract</h1>
      <Box>
        <TextField
          label="NFT recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <TextField
          label="tokenURI"
          value={tokenURI}
          onChange={(e) => setTokenURI(e.target.value)}
        />
      </Box>

      <Button onClick={mint}>Mint NFT</Button>

      <ConfirmedTxModal tokenId={tokenId} contractAddress={contractAddress} />
      <PendingTxModal pendingTx={pendingTx} />
    </Box>
  );
};

export default MintNFT;
