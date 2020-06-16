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
                parent="twitchstitch.app"
                src={"https://www.twitch.tv/embed/" + selectedChat +"/chat?parent=twitchstitch.app&parent=twitchstitch.app"+(darkMode ? "&darkpopout":"")}>
            </iframe>}
        </div>
    )
}

export default ChatWindow