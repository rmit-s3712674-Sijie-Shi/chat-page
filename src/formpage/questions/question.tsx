import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./question.module.css"
import { IQuestion } from "../form";
import { FormContext } from "../formContext";

const Question = ()=> {
    const { formState, setFormState } = useContext(FormContext)
    const [questions, setQuestions] = useState<IQuestion[]|null>()
    useEffect(() => {
        console.log(formState.questions)
        setQuestions(formState.questions)
    }, [])
    

    const addNewTask = useCallback(() => {
        setFormState({type:"addQuestion"})
        setQuestions(prev => {
            prev = formState.questions ? [...formState.questions] : []
            console.log(prev)
            return prev
        })
    }, [formState.questions, setFormState])

    return(
        <>
        <div>
            {questions?.length? questions.map((q, index) => (
                <>
                <div className={styles.container}>
                <div key={q.id + index} className={styles.question}>{q.description}</div>
                <div className={styles.delete}>delete</div>
                </div>
                </>
            )) : <div className={styles.noTask}>No task here, please add a new one</div>}
        </div>
        <div className={styles.addNewTask} onClick={() => addNewTask()}>
            add new task+
        </div>
        </>
    )
}

export default Question;