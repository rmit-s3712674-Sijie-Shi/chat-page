import React from "react";
import styles from "./userCard.module.css"

const UserCard = () => {
    return (
        <>
            <div className={styles.usercard}> 
                <img className={styles.avatar} src="https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg" alt="avatar" /> 
                <div className={styles.user}>usercard</div>
            </div>

            <div className={styles.usercard}> 
                <img className={styles.avatar} src="https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg" alt="avatar" /> 
                <div className={styles.user}>usercard2</div>
            </div>
        </>
    )
}

export default UserCard;