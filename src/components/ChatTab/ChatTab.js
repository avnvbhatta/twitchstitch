import React from "react"
import '../ChatTab/ChatTab.scss';

const ChatTab = (props) => {
    const streams = props.streams
    const [selectedChat, setSelectedChat] = props.selectedChat
    return(
        <div>
            <ul className="chatTabs">
                {streams.map(stream => (
                    <li key={stream.id} 
                    className={selectedChat === stream.channel ? "selectedTab" : ""}
                    onClick={() => {
                        setSelectedChat(stream.channel);
                    }}
                    >{stream.channel}</li>
                ))}
            </ul>
        </div>
    )
}

export default ChatTab