import React from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setShow } : { setShow:any }) => {
    const navigate = useNavigate();
    const login = () => {
        navigate("/main")
    }
    return(
        <>
            <div className={styles.container}>
                <div className={styles.loginForm}>
                    <span className={styles.logo}>Private Chat</span>
                    <span className={styles.login}>Login</span>
                    <div className={styles.form}>
                        <input type="email" placeholder="email"/>
                        <input type="password" placeholder="password"/>
                        <div className={styles.buttonContainer}>
                        <button className={styles.loginButton} onClick={login}>Login</button>
                        <button className={styles.createButton} onClick={() => setShow(false)}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;