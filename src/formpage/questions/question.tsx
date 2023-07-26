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

    const changeQuestionInfo = useCallback((value: string | number, q: IQuestion, changedType: QuestionsInfo) => {

        let temp: IQuestion = { ...q, [changedType]: value }
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
                                <input className={styles.description} value={q.description} onChange={(e) => changeQuestionInfo(e.target.value, q, "description")}></input>
                                <label >Choose an option:</label>
                                <select name="cars" id="cars" className={styles.select} onChange={(e) => changeQuestionInfo(e.target.value, q, "questionsType")} value={q.questionsType}>
                                    <option value="rate">Rate</option>
                                    <option value="text">Text</option>
                                </select>
                                {q.questionsType === "rate" ?                                 
                                <div> 
                                    <div>Min Rate: 
                                        <input type="text" value={q.minRate} onChange={(e) => changeQuestionInfo(parseInt(e.target.value), q, "minRate")}/>                                
                                    </div>
                                    <div>
                                        Max Rate: 
                                        <input type="text" value={q.maxRate} onChange={(e) => changeQuestionInfo(parseInt(e.target.value), q, "maxRate")}/>
                                    </div>
                                    {q.maxRate < q.minRate && <div> max rate should larger than min rate</div> }
                                </div> 
                                
                                : <div>
                                    please input the detail for the response:
                                    <input type="text" value={q.response} onChange={(e) => changeQuestionInfo(e.target.value, q, "response")}/>
                                </div>}
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