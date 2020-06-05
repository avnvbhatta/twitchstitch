import React from "react"
import '../Chat/Chat.scss';
import ChatTab from "../ChatTab/ChatTab";
import ChatWindow from "../ChatWindow/ChatWindow";

const Chat = (props) => {
    const [selectedChat, setSelectedChat] = props.selectedChat
    const streams = props.streams
    const darkMode = props.darkMode
    const chatVisible = props.chatVisible
    return(
        <div className={"chatFrame " + (chatVisible ? "show" : "hide")}>
            <ChatTab 
                selectedChat={[selectedChat, setSelectedChat]}
                streams={streams}
            />
            <ChatWindow 
                selectedChat={selectedChat}
                darkMode={darkMode}
            />
        </div>
    )
}

export default Chat