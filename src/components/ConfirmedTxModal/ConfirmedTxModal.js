import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "../Modal";

const ConfirmedTxModal = ({ tokenId, contractAddress }) => {
  const [open, setOpen] = useState();

  useEffect(() => {
    setOpen(contractAddress && tokenId);
  }, [contractAddress, tokenId]);

  return (
    <Modal open={open} handleClose={() => setOpen(false)}>
      <Typography variant="h3">NFT Minted!</Typography>
    </Modal>
  );
};

export default ConfirmedTxModal;
