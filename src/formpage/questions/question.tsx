import React from "react";
import styles from "./question.module.css"
import { IQuestion } from "../form";

const Question = (props: IQuestion)=> {
    return(
        <>
        <div>
            {props.description}
        </div>
        </>
    )
}

export default Question;