import React, { Dispatch } from "react";
import { IForm, IQuestion } from "./form";
import { v4 as uuidv4 } from 'uuid';

export const formData:IForm = {
    id: "",
    title:"title",
    questions:[{
        id: uuidv4(),
        description:"the first question",
        maxRate: 0,
        minRate: 0
    }],
    timestamp: 0,
    endtime:0
}

export const formReducer = (state: IForm, action:{type: string, title?: string, question?:IQuestion}): IForm => {
    switch(action.type) {
        case "changeTitle" :
            if(action.title) {
                state.title = action.title
                console.log("title changed: " + state.title)
            }
            return state
        case "addQuestion":
            if(state.questions) {
                const newQuestion:IQuestion = {
                    id: uuidv4(),
                    description:"the first question",
                    maxRate: 0,
                    minRate: 0   
                }
                state.questions = state.questions? [...state.questions, newQuestion] : [newQuestion]
            }
            console.log(state)
            return state
        case "editQuestion":
            if(action.question) {
                state.questions ? state.questions.map((res) => {
                    if(action.question) {
                        return res.id === action.question.id ? action.question : res
                    }
                    return state
                }) : state.questions = [action.question]
            }
            return state
            case "deleteQuestion":
                if(action.question) {
                    state.questions ? state.questions = state.questions.filter((res) => {
                        return res.id !== action.question?.id
                    }) : state.questions = []
                }
                console.log(state)
                return state
        default:
            return state
    }
}

export interface FormReducerProps {
    formState: IForm
    setFormState: Dispatch<{type: string; title?: string; question?: IQuestion;}>
}

export const FormContext = React.createContext<FormReducerProps>(
    {
        formState: formData,
        setFormState: () =>{
            throw new Error("undefined setFormState")
        }
    }
);

