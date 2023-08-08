import React, { useContext, useEffect, useReducer, useState } from "react";
import { IUser } from "../globleTypes/userTypes";
import { useLocation } from "react-router-dom";
import { getUserForms } from "../httpRequests/formRequests";
import { IForm } from "../formpage/form";
import FormCard from "./formCard/FormCard";
import styles from "./FormIndex.module.css";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FormMainPage from "../formpage/formMainPage";
import {
  selectFormReducer,
  selectedFormContext,
  selectedFormState,
} from "../formpage/formContext";
import { v4 as uuidv4 } from "uuid";
import { Box } from "@mui/material";
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const formData: IForm = {
  id: "",
  title: "title",
  questions: [
    {
      id: uuidv4(),
      description: "the first question",
      questionsType: "text",
      response: "",
      maxRate: 0,
      minRate: 0,
    },
  ],
  timestamp: new Date().getTime(),
  endtime: 0,
};

const FormIndex = () => {
  const user: IUser = useLocation().state;
  const [formState, setFormState] = useState({
    savedForms: [],
    sentForms: [],
  });
  const [formSelected, setFormSelected] = useState<IForm>(formData);
  const [error, setError] = useState();
  const [open, setOpen] = React.useState(false);

  const [selectedForm, setSelectedForm] = useReducer(
    selectFormReducer,
    selectedFormState
  );

  useEffect(() => {
    getUserForms(user.user._id)
      .then((res) => setFormState(res))
      .catch((err) => setError(err));
  }, []);



  const handleOpen = (form: IForm) => {
    setOpen(true);
    setFormSelected(form);
  };
  const handleClose = () => {
    getUserForms(user.user._id)
      .then((res) => setFormState(res))
      .catch((err) => setError(err))
      .finally(() => setOpen(false));
  };
  return (
    <>
      <selectedFormContext.Provider value={{ selectedForm, setSelectedForm }}>
        <div className={styles.header}>
          <div className={styles.mainTitle}>Welcome</div>
          <div className={styles.createForm}>
            <button className={styles.createButton}>
              <span>Create New Form </span>
            </button>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.saved}>
            <div className={styles.title}>saved</div>
            {formState?.savedForms.map((form: IForm) => (
              <FormCard form={form} handleOpen={handleOpen} />
            ))}
          </div>
          <div className={styles.saved}>
            <div className={styles.title}>sent</div>
            {formState?.savedForms.map((form: IForm) => (
              <FormCard form={form} handleOpen={handleOpen} />
            ))}
          </div>
        </div>
        {/* {open && <FormMainPage handleClose={handleClose} form={formSelected} />} */}
        <Modal open={open} onClose={handleClose}>
          <FormMainPage handleClose={handleClose} form={formSelected} />
        </Modal>
      </selectedFormContext.Provider>
    </>
  );
};

export default FormIndex;
