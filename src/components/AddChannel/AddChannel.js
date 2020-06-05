import React from "react";
import '../AddChannel/AddChannel.scss';

const AddChannel = (props) => {
    const darkMode = props.darkMode
    const setModalVisible = props.setModalVisible
    const [channelExists, setChannelExists] = props.channelExists
    const createChannel = props.createChannel
    const [channelName, setChannelName] = props.channelName
    const setSelectedChat = props.setSelectedChat
    return(
        <div className={"screenOverlay "+(darkMode?"darkMode":"lightMode")} 
            onClick={(e) => {
                if (!document.getElementById("modalBox").contains(e.target))
                    setModalVisible(false)
            }}>
            <div className="addChannel" id="modalBox">
                <div className="modalHeader">
                    <span> Enter Channel Name </span>
                    <span className="modalClose" onClick={() => {
                        setModalVisible(false);
                        setChannelExists(false);}}>&#10006;</span>
                </div>
                <input className="channelInput modalElement" autoFocus type="text" onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                        setModalVisible(false);
                    }
                    else if (e.key === 'Enter' && channelName !== "") {
                        createChannel();
                        setSelectedChat(channelName);    
                    }else{
                        setChannelExists(false);
                    }
                    
                }} placeholder="example: aceu" onChange={(e) => setChannelName(e.target.value)} />
                <p className={channelExists ? "error" : "remove"}>Channel has already been added.</p>
                <button disabled={channelName === ''} className="done modalElement" onClick={createChannel}> Add Channel </button>
            </div>
        </div>
    )
}

export default AddChannel;