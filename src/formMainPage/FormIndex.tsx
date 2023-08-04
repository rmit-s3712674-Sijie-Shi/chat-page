import React, { useEffect, useState } from "react";
import { IUser } from "../globleTypes/userTypes";
import { useLocation } from "react-router-dom";
import { getUserForms } from "../httpRequests/formRequests";
import { IForm } from "../formpage/form"
import FormCard from "./formCard/FormCard";
import styles from "./FormIndex.module.css";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import FormMainPage from "../formpage/formMainPage";

const FormIndex = () => {
  const user: IUser = useLocation().state;
  const [formState, setFormState] = useState({
    savedForms:[],
    sentForms:[]
  });
  const [error, setError] = useState();
  useEffect(() => {
    getUserForms(user.user._id)
      .then((res) => setFormState(res))
      .catch((err) => setError(err));
  },[]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
    <div className={styles.header}>
      <div className={styles.mainTitle}>Welcome</div>
      <div className={styles.createForm}>
        <button className={styles.createButton}><span>Create New Form </span></button>
      </div>
    </div>
      <div className={styles.container}>
        <div className={styles.saved}>
          <div className={styles.title}>saved</div>
        {formState?.savedForms.map((form: IForm) => (
          <FormCard form={form} handleOpen={handleOpen}/>
        ))}
        </div>
        <div className={styles.saved}>
        <div className={styles.title}>sent</div>
        {formState?.savedForms.map((form: IForm) => (
          <FormCard form={form} handleOpen={handleOpen}/>
        ))}
        </div>
      </div>
          {open && <FormMainPage handleClose={handleClose}/>}
    </>
  );
};

export default FormIndex;
