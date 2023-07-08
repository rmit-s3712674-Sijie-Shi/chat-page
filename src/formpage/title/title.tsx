import React, { useState, useRef } from "react";
import styles from "./title.module.css"

const Title = () => {
    const [title, setTitle] = useState("Title")
    const [inputDisable, setInputDisable] = useState(true)
    const ref = useRef<HTMLInputElement>(null);
    const edit = () => {
        console.log(title)
        setInputDisable((prev) => !prev)
        setTimeout(() => {
            ref.current?.focus()
        }, 100)
    }
    return(
        <div className={styles.container}>
            <input ref={ref} value={title} onChange={(e) => setTitle(e.target.value)} disabled={inputDisable}></input>
            {inputDisable ? <img src="./edit.png" alt="edit" onClick={edit}/> : <img src="./save.png" alt="save" onClick={edit}></img>}
        </div>
        
    )
}

export default Title;