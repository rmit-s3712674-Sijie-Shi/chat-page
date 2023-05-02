import React from "react";
import styles from "./mainpage.module.css"
import Chat from "./chat/chat";
import Setting from "./setting/setting";

const MainPage = () => {
    return (
        <div>
            <Chat/>
            <Setting/>
        </div>
    )
}

export default MainPage;