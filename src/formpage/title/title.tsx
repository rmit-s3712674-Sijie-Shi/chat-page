import React, { useState, useRef, useContext, useCallback, useEffect } from "react";
import styles from "./title.module.css"
import { IForm } from "../form";
import { FormContext } from "../formContext";

const Title = ({ props } : { props:string }) => {
    //const [title, setTitle] = useState('')

    const [inputDisable, setInputDisable] = useState(true)

    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        //setTitle(props)
        console.log(props)
        ref.current!.value = props
    },[props])

    const edit = () => {
        setInputDisable((prev) => !prev)
        setTimeout(() => {
            ref.current?.focus()
        }, 0)
        changeTitle(ref.current?.value)
    }

    const { setFormState } = useContext(FormContext)

    const changeTitle = useCallback((title?: string) => {
        setFormState({type:"changeTitle", title:title})
    },[setFormState])

    return(
        <div className={styles.container}>
            <input ref={ref} disabled={inputDisable}></input>
            {inputDisable ? <img src="./edit.png" alt="edit" onClick={edit}/> : <img src="./save.png" alt="save" onClick={edit}></img>}
        </div>
        
    )
}

export default Title;