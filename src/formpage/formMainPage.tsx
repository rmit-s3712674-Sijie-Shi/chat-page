import React from "react";
import styles from "./formMainPage.module.css"
import Title from "./title/title";

const FormMainPage = () => {
    return(
        <>
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <Title/>
            </div>
            <div className={styles.questionContainer}>questions</div>
            <div className={styles.bottonContainer}>
                buttons
            </div>
        </div>
        </>
    )
}

export default FormMainPage;