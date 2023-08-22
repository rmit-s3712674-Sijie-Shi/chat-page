import React, { useEffect, useReducer, useState } from "react";
import styles from "./sendQuestionModal.module.css";
import { Modal, Box, Button } from "@mui/material";
const SendQuestionModal = ({ formID }: { formID: string }) => {
  const [open, setOpen] = React.useState(false);
  const handleSaveModalOpen = () => {
    setOpen(true);
  };
  const handleSaveModalClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button onClick={handleSaveModalOpen}>Send</button>
        <Modal open={open} onClose={handleSaveModalClose} sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          <Box className={styles.container}>
            <h2 id="child-modal-title">Set Permission For this Form</h2>
            <p id="child-modal-description">{formID}</p>
            <button onClick={handleSaveModalClose} className={styles.cancelButton}>Close</button>
            <button onClick={handleSaveModalClose} className={styles.sendButton}>Send</button>
          </Box>
        </Modal>
    </>
  );
};

export default SendQuestionModal;
