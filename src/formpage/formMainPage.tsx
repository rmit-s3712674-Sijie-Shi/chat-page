import React, { useCallback, useEffect, useReducer, useState } from "react";
import styles from "./formMainPage.module.css"
import Title from "./title/title";
import Question from "./questions/question";
import { IForm, IQuestion } from "./form";
import {FormContext, formReducer} from "./formContext";
import { v4 as uuidv4 } from 'uuid';
import { useLocation  } from "react-router-dom";

const FormMainPage = ({handleClose} : {handleClose:any}) => {
    const formData:IForm = {
        id: "",
        title:"title",
        questions:[{
            id: uuidv4(),
            description:"the first question",
            questionsType: "text",
            response: "",
            maxRate: 0,
            minRate: 0
        }],
        timestamp: 0,
        endtime:0
    }

    const [formState, setFormState] = useReducer(formReducer, formData)
    const [formInfo, setFormInfo] = useState<IForm>()
    const location = useLocation()
    useEffect(() => {
        setFormInfo(formState);
        console.log(location.state)
    }, [formState])

    return(
        <>
        <FormContext.Provider value={{ formState, setFormState }}>
        <div className={styles.container}>
        <div className={styles.bottonContainer}>
                <button onClick={handleClose}>handleClose</button>
            </div>
            <div className={styles.titleContainer}>
                {formInfo?.title ? <Title props={formInfo.title}/> : <Title props={"enter your title"}/>}
            </div>
            <div className={styles.questionContainer}>
                {formState?.questions ? 
                    <Question/>

                : <div>Nothing here</div>}

            </div>
        </div>
        </FormContext.Provider>
        </>
    )
}

export default FormMainPage;

