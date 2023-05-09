import React, { useReducer, useState } from "react";
import styles from "./register.module.css";
import axios from "axios";

const reducer = (state: {email: string, password: string, confirmPassword?: string}, action: {type: string, parameter: string}) => {
    switch(action.type) {
        case "email":
            state.email = action.parameter;
            return state
        case "password":
            state.password = action.parameter;
            return state
        case "confirmPassword":
            state.confirmPassword = action.parameter;
            return state
        default:
            console.log("wrong action")
            return state
    }
}

const userData = {
    email: "",
    password: "",
    confirmPassword: ""
}



const Register = ({ setShow } : { setShow:any }) => {

    //const [user, setUser] = useState({email: "", password:""}) 
    //const [checkPassword, setCheckPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [user, dispatch] = useReducer(reducer, userData)
    const register = () => {
        let reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        setErrorMessage("")
        console.log(errorMessage)
        if(user.email === ""|| user.password ===""|| user.confirmPassword ==="") {
            setErrorMessage("lack of parameter")
        } else if (user.password !== user.confirmPassword) {
            setErrorMessage("passwords don't match")
        } else if(user.password.length < 8) {
            setErrorMessage("password too short")
        } else if(!reg.test(user.email)){
            setErrorMessage("email in invalid")
        } else {
            axios.post("http://localhost:3001/createuser", {
                email: user.email,
                password: user.password
            }).then((res) => {
                if(res.status !== 201){
                    setErrorMessage(res.data)
                } else {
                    setShow(true)
                }
            }).catch((err) => {
                setErrorMessage(err.response.data)
            })
        }
    }
    return(
        <>
            <div className={styles.container}>
                <div className={styles.registerForm}>
                    <span className={styles.logo}>Private Chat</span>
                    <span className={styles.register}>Register</span>
                    <div className={styles.form}>
                        <input type="email" placeholder="email" onChange={(e) =>{dispatch({type: "email", parameter:e.target.value})}}/>
                        <input type="password" placeholder="password" onChange={(e) =>{dispatch({type: "password", parameter:e.target.value})}}/>
                        <input type="password" placeholder="confirm password" onChange={(e) =>{dispatch({type: "confirmPassword", parameter:e.target.value})}}/>
                        <div style={{color: "red"}}>{errorMessage}</div>
                        <div className={styles.buttonContainer}>
                        <button className={styles.createButton} onClick={() => register()}>register</button>
                        <button className={styles.loginButton} onClick={() => setShow(true)}>go to login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;