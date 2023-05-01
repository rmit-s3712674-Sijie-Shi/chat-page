import React from "react";
import styles from "./register.module.css";

const Register = ({ setShow } : { setShow:any }) => {
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
                        <button className={styles.registerButton} onClick={() => setShow(true)}>go to login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;