import React, { useCallback, useEffect, useReducer, useState } from "react";
import styles from "./formMainPage.module.css";
import Title from "./title/title";
import Question from "./questions/question";
import { IForm, IQuestion } from "./form";
import { FormContext, formReducer } from "./formContext";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import { updataForm } from "../httpRequests/formRequests";
import { IUser } from "../globleTypes/userTypes";
import Modal from "@mui/material/Modal";
import SendQuestionModal from "./sendQuestionModal/sendQuestionModal";

const FormMainPage = ({
  handleClose,
  form,
}: {
  handleClose: any;
  form: IForm;
}) => {
  // const formData: IForm = {
  //   id: "",
  //   title: "title",
  //   questions: [
  //     {
  //       id: uuidv4(),
  //       description: "the first question",
  //       questionsType: "text",
  //       response: "",
  //       maxRate: 0,
  //       minRate: 0,
  //     },
  //   ],
  //   timestamp: 0,
  //   endtime: 0,
  // };

  // const formStateReducer = (state: IForm, action: { type: string, param: string | number | IQuestion}) => {
  //     switch(action.type) {
  //         case "title" :
  //             state.title = typeof action.param === "string" ? action.param : state.title
  //             return state
  //         case "description" :

  //     }
  // }

  const [formState, setFormState] = useReducer(formReducer, form);
  const [formInfo, setFormInfo] = useState<IForm>();
  const [showSendModal, setShowSendModal] = useState<boolean>(false);
  const location = useLocation().state;
  useEffect(() => {
    setFormInfo(form);
    console.log(location);
    console.log(form);
  }, [formState]);

  const updateFormInfo = () => {
    updataForm(location.user._id, formInfo)
      .then(() => handleClose())
      .catch((err) => console.error(err));
  };

  const openSendModal = () => {
    setShowSendModal(true);
    console.log(showSendModal);
  };

  const closeSendModal = () => {
    setShowSendModal(false);
    handleClose();
  };

  return (
    <>
      <FormContext.Provider value={{ formState, setFormState }}>
        <div className={styles.container}>
          <div className={styles.titleContainer}>
            {formInfo?.title ? (
              <Title props={formInfo.title} />
            ) : (
              <Title props={"enter your title"} />
            )}
          </div>
          <div className={styles.questionContainer}>
            {formInfo?.questions ? <Question /> : <div>Nothing here</div>}
          </div>
          <div className={styles.bottonContainer}>
            <button onClick={() => handleClose()}>close</button>
            <button onClick={updateFormInfo}>update</button>
              <SendQuestionModal
                formID={formState.id || ""}
              />
          </div>
        </div>
      </FormContext.Provider>
    </>
  );
};

export default FormMainPage;
