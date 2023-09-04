import React, { useEffect, useReducer, useState } from "react";
import { IUser } from "../globleTypes/userTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserForms, deleteForm } from "../httpRequests/formRequests";
import { IForm } from "../formpage/form";
import FormCard from "./formCard/FormCard";
import styles from "./FormIndex.module.css";
import Modal from "@mui/material/Modal";
import FormMainPage from "../formpage/formMainPage";
import {
  selectFormReducer,
  selectedFormContext,
  selectedFormState,
} from "../formpage/formContext";
import { v4 as uuidv4 } from "uuid";

const createRandomForm = (): IForm => {
  return {
    formId: uuidv4(),
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
};

const FormIndex = () => {
  const user: IUser = useLocation().state;
  const navigation = useNavigate();
  const [formState, setFormState] = useState({
    savedForms: [],
    sentForms: [],
  });
  const [formSelected, setFormSelected] = useState<IForm>();
  const [error, setError] = useState();
  const [open, setOpen] = React.useState(false);

  const [selectedForm, setSelectedForm] = useReducer(
    selectFormReducer,
    selectedFormState
  );

  useEffect(() => {
    if (user) {
      getUserForms(user.user._id)
        .then((res) => setFormState(res))
        .catch((err) => setError(err));
    } else {
      navigation("/");
    }
  }, []);

  const handleDelete = (form: IForm, status: string) => {
    console.log(status);
    deleteForm(user.user._id, form, status)
      .then((res) => setFormState(res))
      .catch((err) => setError(err));
  };

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
            <button
              className={styles.createButton}
              onClick={() => handleOpen(createRandomForm())}
            >
              <span>Create New Form </span>
            </button>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.saved}>
            <div className={styles.title}>saved</div>
            {formState?.savedForms.map((form: IForm) => (
              <FormCard
                key={form.id}
                form={form}
                handleOpen={handleOpen}
                handleDelete={() => handleDelete(form, "saved")}
              />
            ))}
          </div>
          <div className={styles.saved}>
            <div className={styles.title}>sent</div>
            {formState?.sentForms.map((form: IForm) => (
              <FormCard
                key={form.id}
                form={form}
                handleOpen={handleOpen}
                handleDelete={() => handleDelete(form, "sent")}
              />
            ))}
          </div>
        </div>
        {/* {open && <FormMainPage handleClose={handleClose} form={formSelected} />} */}
        {formSelected && (
          <Modal open={open} onClose={handleClose}>
            <FormMainPage handleClose={handleClose} form={formSelected} />
          </Modal>
        )}
      </selectedFormContext.Provider>
    </>
  );
};

export default FormIndex;
