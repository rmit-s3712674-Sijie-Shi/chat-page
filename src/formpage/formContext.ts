import React, { Dispatch } from "react";
import { IForm, IQuestion } from "./form";

export const formData:IForm = {
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

export const newQuestion: IQuestion ={
    id: "0",
    description:"the first question",
    maxRate: 0,
    minRate: 0
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
                state.questions = state.questions? [...state.questions, newQuestion] : [newQuestion]
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

