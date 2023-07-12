import React, { useCallback, useEffect, useReducer, useState } from "react";
import styles from "./formMainPage.module.css"
import Title from "./title/title";
import Question from "./questions/question";
import { IForm, IQuestion } from "./form";
import {FormContext, formReducer} from "./formContext";

const FormMainPage = () => {
    const formData:IForm = {
        id: "",
        title:"title",
        questions:[{
            id: "0",
            description:"the first question",
            maxRate: 0,
            minRate: 0
        }],
        timestamp: 0,
        endtime:0
    }

    const [formState, setFormState] = useReducer(formReducer, formData)
    const [formInfo, setFormInfo] = useState<IForm>()
    useEffect(() => {
        setFormInfo(formState);
    }, [formState])

    return(
        <>
        <FormContext.Provider value={{ formState, setFormState }}>
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                {formInfo?.title ? <Title props={formInfo.title}/> : <Title props={"enter your title"}/>}
            </div>
            <div className={styles.questionContainer}>
                {formState?.questions ? 
                    <Question/>

                : <div>Nothing here</div>}

            </div>
            <div className={styles.bottonContainer}>
                buttons
            </div>
        </div>
        </FormContext.Provider>
        </>
    )
}

export default FormMainPage;