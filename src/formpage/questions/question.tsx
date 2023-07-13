import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./question.module.css"
import { IQuestion } from "../form";
import { FormContext } from "../formContext";

const Question = () => {
    const { formState, setFormState } = useContext(FormContext)
    const [questions, setQuestions] = useState<IQuestion[] | null>()
    useEffect(() => {
        console.log(formState.questions)
        setQuestions(formState.questions)
    }, [])


    const addNewTask = useCallback(() => {
        console.log('add')
        setFormState({ type: "addQuestion" })
        setQuestions(prev => {
            prev = formState.questions ? [...formState.questions] : []
            return prev
        })
    }, [formState.questions, setFormState])

    const deleteTask = useCallback((q: IQuestion) => {
        console.log('delete')
        setFormState({ type: "deleteQuestion", question: q })
        setQuestions(prev => {
            prev = formState.questions ? [...formState.questions] : []
            return prev
        })
    }, [formState.questions, setFormState])

    const changeDescription = useCallback((string: string, q: IQuestion) => {
        let temp: IQuestion = {...q, description: string}
        setFormState({ type: "editQuestion", question: temp })
        setQuestions(prev => {
            prev = formState.questions ? [...formState.questions] : []
            return prev
        })
    }, [formState.questions, setFormState])

    return (
        <>
            <div>
                {questions?.length ? questions.map((q) => (
                    <div className={styles.container} key={q.id}>
                        <div className={styles.question}>
                            <div className={styles.detailContainer}>
                                <input  className={styles.description} value={q.description} onChange={(e) => changeDescription(e.target.value, q)}></input>
                            </div>
                            <div className={styles.deleteContainer} onClick={() => deleteTask(q)}>
                                <div className={styles.delete}>delete</div>
                        </div>
                        </div>
                    </div>
                )) : <div className={styles.noTask}>No task here, please add a new one</div>}
            </div>
            <div className={styles.addNewTask} onClick={() => addNewTask()}>
                add new task+
            </div>
        </>
    )
}

export default Question;