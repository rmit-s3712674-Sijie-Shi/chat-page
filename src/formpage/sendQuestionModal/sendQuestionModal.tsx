import React, { useEffect, useReducer, useState } from "react";
import styles from "./sendQuestionModal.module.css";
import { Modal, Box, Button } from "@mui/material";
const SendQuestionModal = ({ formID }: { formID: string }) => {
  const [open, setOpen] = React.useState(false);
  const [permission, setPermission] = useState("every one");
  const handleSaveModalOpen = () => {
    setOpen(true);
  };
  const handleSaveModalClose = () => {
    setOpen(false);
  };

  const handleOptionChange = (value: any) => {
    setPermission(value);
  };

  return (
    <>
      <button onClick={handleSaveModalOpen}>Send</button>
      <Modal
        open={open}
        onClose={handleSaveModalClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box className={styles.container}>
          <h2 id="child-modal-title">Set Permission For this Form</h2>
          <p id="child-modal-description">{formID}</p>
          <select onChange={(e) => handleOptionChange(e.target.value)} value={permission}>
            <option value="every one">every one</option>
            <option value="certain people">certain people</option>
          </select>
          {permission === "certain people" && <input placeholder="input user email"></input>}
          <button
            onClick={handleSaveModalClose}
            className={styles.cancelButton}
          >
            Close
          </button>
          <button onClick={handleSaveModalClose} className={styles.sendButton}>
            Send
          </button>
        </Box>
      </Modal>
    </>
  );
};

export default SendQuestionModal;
