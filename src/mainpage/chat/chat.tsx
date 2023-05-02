import React from "react";
import styles from "./chat.module.css"
import UserList from "./userlist/userList";
import ChatInput from "./chatinput/chatInput";
import Message from "./message/message";

const Chat = () => {
    return (
        <>
        <UserList/>
        <ChatInput/>
        <Message/>
        </>
    )
}

export default Chat;