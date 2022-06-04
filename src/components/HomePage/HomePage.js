import styles from "../../../styles/Home.module.css";
import MintNFT from "../MintNFT";
import { useState } from "react";
import { Box } from "@mui/system";
import CreateERC721 from "../CreateERC721";
import { Typography } from "@mui/material";

const HomePage = () => {
  const [contractAddress, setContractAddress] = useState();

  return (
    <>
      <h1 className={styles.title}>NFT factory</h1>
      <p>for music nfts (on Polygon & ETH)</p>

      {contractAddress ? (
        <MintNFT contractAddress={contractAddress} />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          p={3}
          gap={3}
        >
          <Typography variant="h5">
            Get started: create your ERC721 smart contract.
          </Typography>
          <CreateERC721 onDeployed={setContractAddress} />
        </Box>
      )}
    </>
  );
};

export default HomePage;
