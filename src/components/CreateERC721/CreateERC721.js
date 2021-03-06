import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useAccount } from "wagmi";
import ButtonCreateERC721 from "../ButtonCreateERC721";

const CreateERC721 = ({ onDeployed }) => {
  const { data: account } = useAccount({
    suspense: true,
  });
  const [name, setName] = useState("My ERC721");
  const [symbol, setSymbol] = useState("SMBL");
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
      gap={3}
    >
      <TextField
        value={name}
        label="ERC721 Contract Name"
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        value={symbol}
        label="ERC721 Contract Symbol"
        onChange={(e) => setSymbol(e.target.value)}
      />
      <ButtonCreateERC721 onDeployed={onDeployed} name={name} symbol={symbol} />
    </Box>
  );
};

export default CreateERC721;
