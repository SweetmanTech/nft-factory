import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useMemo, useState } from "react";
import abi from "./abi.json";
import PendingTxModal from "../PendingTxModal";
import ConfirmedTxModal from "../ConfirmedTxModal";
import { getAddressLink } from "../../utils/etherscanService";
import { useAccount, useContract, useNetwork, useSigner } from "wagmi";

const MintNFT = ({ contractAddress, name, symbol }) => {
  const { data: signer } = useSigner();
  const { activeChain } = useNetwork();
  const { data: account } = useAccount();
  const [recipient, setRecipient] = useState(account?.address);
  const [tokenURI, setTokenURI] = useState(
    "ipfs://QmZMaWmwKCgmQLm6WUm7HXt9QNXgSzDKN7quFwnf4nv5QV"
  );
  const [tokenId, setTokenId] = useState();
  const [pendingTx, setPendingTx] = useState();
  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: abi,
    signerOrProvider: signer,
  });

  console.log("CONTRACt", contract);
  console.log("ACCOUNT", account?.address);

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
    contract
      .initialize(name, symbol)
      .then(async (tx) => {
        setPendingTx("Naming your smart contract");
        await tx.wait();
        setPendingTx("Sign transaction to Mint your NFT.");
        contract["mintBase(address,string)"](
          "0xeCF12d2259a30B156Da670031D7a836626C3a89F",
          "ipfs://QmaAAfkiTeXiJ2At9sA2SDUdYRPXsJwe5DUAwVQ4h35Z5v"
        )
          .then(async (tx) => {
            setPendingTx("Minting NFT");
            const receipt = await tx.wait();
            handleReceipt(receipt);
          })
          .catch((e) => {
            console.error(e);
            setPendingTx(false);
          });
      })
      .catch((e) => {
        console.error(e);
        setPendingTx(false);
      });
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

      <Button onClick={mint}>Mint NFT</Button>

      <ConfirmedTxModal tokenId={tokenId} contractAddress={contractAddress} />
      <PendingTxModal pendingTx={pendingTx} />
    </Box>
  );
};

export default MintNFT;
