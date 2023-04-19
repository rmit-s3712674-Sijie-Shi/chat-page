import React from "react";
import styles from "./login.module.css";

const Login = () => {
    return(
        <>
            <div className={styles.container}>
                <div className={styles.loginForm}>
                    <span className={styles.logo}>chAT</span>
                    <span className={styles.login}>Login</span>
                    <form>
                        <input type="email" />
                        <input type="password" />
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;