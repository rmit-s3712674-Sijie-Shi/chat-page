import React, { useEffect, useReducer, useState } from "react";
import styles from "./sendQuestionModal.module.css";
import { Modal, Box, Button } from "@mui/material";
import { sendForm } from "../../httpRequests/formRequests"
import { useLocation } from "react-router-dom";
const SendQuestionModal = ({ formID }: { formID: string }) => {
  const [open, setOpen] = React.useState(false);
  const [permission, setPermission] = useState("every one");
  const location = useLocation().state;
  const handleSaveModalOpen = () => {
    setOpen(true);
  };
  const handleSaveModalClose = () => {
    setOpen(false);
  };

  const handleOptionChange = (value: any) => {
    setPermission(value);
  };

  const handleSendForm = () => {
    sendForm(location.user._id, formID, ["All"], "")
  }

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
          <select onChange={(e) => handleOptionChange(e.target.value)} value={permission} className={styles.selectPermission}>
            <option value="every one">every one</option>
            <option value="certain people">certain people</option>
          </select>
          {permission === "certain people" && <input placeholder="input user email" className={styles.permissionInput}></input>}
          <div className={styles.buttonContainer}>
          <button
            onClick={handleSaveModalClose}
            className={styles.cancelButton}
          >
            Close
          </button>
          <button onClick={handleSaveModalClose} className={styles.sendButton}>
            Send
          </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SendQuestionModal;
