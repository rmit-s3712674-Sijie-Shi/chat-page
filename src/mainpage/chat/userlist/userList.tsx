import React from "react";
import styles from "./userList.module.css";
import UserCard from "../usercard/userCard";

const UserList = () => {
    return (
        <div className={styles.userlist}>
            <UserCard/>
        </div>
    )
}

export default UserList;