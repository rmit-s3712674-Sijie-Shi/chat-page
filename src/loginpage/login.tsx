import React, { useReducer } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
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
}

const Login = ({ setShow } : { setShow:any }) => {
    const [user, dispatch] = useReducer(reducer, userData)
    const navigate = useNavigate();
    const login = () => {
        axios.post("http://localhost:3001/login", {       
        email: user.email,
        password: user.password
    }).then(() => navigate("/main"))
     .catch(err => console.error(err))
    }
    return(
        <>
            <div className={styles.container}>
                <div className={styles.loginForm}>
                    <span className={styles.logo}>Private Chat</span>
                    <span className={styles.login}>Login</span>
                    <div className={styles.form}>
                        <input type="email" placeholder="email" onChange={(e) =>{dispatch({type: "email", parameter:e.target.value})}}/>
                        <input type="password" placeholder="password" onChange={(e) =>{dispatch({type: "password", parameter:e.target.value})}}/>
                        <div className={styles.buttonContainer}>
                        <button className={styles.loginButton} onClick={() => login()}>Login</button>
                        <button className={styles.createButton} onClick={() => setShow(false)}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;