import React, { useEffect, useReducer, useState } from "react";
import styles from "./sendQuestionModal.module.css";
import { Modal, Box, Button } from "@mui/material";
const SendQuestionModal = ({
  formID,
}: {
  formID: string;
}) => {
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
      <Modal open={open} onClose={handleSaveModalClose}>
      <Box sx={{ width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            {formID}
          </p>
          <button onClick={handleSaveModalClose}>Close Child Modal</button>
        </Box>
      </Modal>
    </>
  );
};

export default SendQuestionModal;
