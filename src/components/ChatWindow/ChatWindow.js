import React from "react"
import '../ChatWindow/ChatWindow.scss';

const ChatWindow = (props) => {
    const selectedChat = props.selectedChat
    const darkMode = props.darkMode
    return(
        <div className="iframeContainer">
            {selectedChat !== "" && <iframe frameBorder="0" title="chatIFrame"
                scrolling="yes"
                theme="dark"
                src={"https://www.twitch.tv/embed/" + selectedChat + "/chat"+(darkMode ? "?darkpopout":"")}>
            </iframe>}
        </div>
    )
}

export default ChatWindow