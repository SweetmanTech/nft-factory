import { Box, TextField } from "@mui/material";
import ButtonCreateERC721 from "../ButtonCreateERC721";

const CreateERC721 = ({ onDeployed, name, setName, symbol, setSymbol }) => (
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

export default CreateERC721;
