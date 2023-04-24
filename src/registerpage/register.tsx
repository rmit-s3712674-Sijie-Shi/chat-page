import React from "react";
import styles from "./register.module.css";

const Register = () => {
    return(
        <>
            <div className={styles.container}>
                <div className={styles.registerForm}>
                    <span className={styles.logo}>Private Chat</span>
                    <span className={styles.registerForm}>register</span>
                    <form>
                        <input type="email" />
                        <input type="password" />
                        <input type="password" />
                        <button className={styles.registerButton}>register</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;