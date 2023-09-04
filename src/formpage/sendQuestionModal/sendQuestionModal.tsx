import React, { useEffect, useReducer, useState } from "react";
import styles from "./sendQuestionModal.module.css";
import { Modal, Box, Button } from "@mui/material";
import { sendForm } from "../../httpRequests/formRequests";
import { useLocation } from "react-router-dom";
const SendQuestionModal = ({ formID }: { formID: string }) => {
  const [open, setOpen] = React.useState(false);
  const [permission, setPermission] = useState({
    sendTo: "every one",
    target: "All",
  });
  const location = useLocation().state;
  const handleSaveModalOpen = () => {
    setOpen(true);
  };
  const handleSaveModalClose = () => {
    setOpen(false);
  };

  const handleOptionChange = (value: any) => {
    setPermission((prev) => {
      return {
        sendTo: value,
        target: value === "certain people" ? "" : "All",
      };
    });
  };

  const handleUserInputChange = (value: any) => {
    setPermission((prev) => {
      return {
        ...prev,
        target: value,
      };
    });
  };

  const handleSendForm = () => {
    const permissions = permission.target.split(" ");
    sendForm(location.user._id, formID, permissions, "585205399")
      .then((res) => console.log(res))
      .catch((e) => console.error(e));
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
          <select
            onChange={(e) => handleOptionChange(e.target.value)}
            value={permission.sendTo}
            className={styles.selectPermission}
          >
            <option value="every one">every one</option>
            <option value="certain people">certain people</option>
          </select>
          {permission.sendTo === "certain people" && (
            <input
              placeholder="input user email"
              className={styles.permissionInput}
              onChange={(e) => handleUserInputChange(e.target.value)}
            ></input>
          )}
          <div className={styles.buttonContainer}>
            <button
              onClick={handleSaveModalClose}
              className={styles.cancelButton}
            >
              Close
            </button>
            <button onClick={handleSendForm} className={styles.sendButton}>
              Send
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SendQuestionModal;
