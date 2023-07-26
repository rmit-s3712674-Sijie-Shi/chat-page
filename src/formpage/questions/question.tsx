import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./question.module.css"
import { IQuestion } from "../form";
import { FormContext } from "../formContext";
import { QuestionType } from "../form";

type QuestionsInfo = keyof(IQuestion)

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

    const changeQuestionInfo = useCallback((value: string, q: IQuestion, changedType: QuestionsInfo) => {

        let temp: IQuestion = { ...q, [changedType]: value }
        setFormState({ type: "editQuestion", question: temp })
        setQuestions(prev => {
            prev = formState.questions ? [...formState.questions] : []
            return prev
        })

    }, [formState.questions, setFormState])

    // const changeSelectedType = (event: string, q:IQuestion) => {
    //     console.log(event)
    //     setQuestions(prev => {

    //     })
    // }



    return (
        <>
            <div>
                {questions?.length ? questions.map((q) => (
                    <div className={styles.container} key={q.id}>
                        <div className={styles.question}>
                            <div className={styles.detailContainer}>
                                <input className={styles.description} value={q.description} onChange={(e) => changeQuestionInfo(e.target.value, q, "description")}></input>
                                <label >Choose an option:</label>
                                <select name="cars" id="cars" className={styles.select} onChange={(e) => changeQuestionInfo(e.target.value, q, "questionsType")}>
                                    <option value="rate">Rate</option>
                                    <option value="text">text</option>
                                </select>
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