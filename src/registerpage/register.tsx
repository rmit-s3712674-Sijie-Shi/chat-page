import React from "react";
import styles from "./register.module.css";

const Register = ({ setShow } : { setShow:any }) => {
    return(
        <>
            <div className={styles.container}>
                <div className={styles.registerForm}>
                    <span className={styles.logo}>Private Chat</span>
                    <span className={styles.register}>Register</span>
                    <form>
                        <input type="email" placeholder="email"/>
                        <input type="password" placeholder="password"/>
                        <input type="password" placeholder="confirm password"/>
                        <div className={styles.buttonContainer}>
                        <button className={styles.createButton}>register</button>
                        <button className={styles.loginButton} onClick={() => setShow(true)}>go to login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;