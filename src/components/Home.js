import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import './Home.scss';
import toggleSVG from "../images/toggle.svg";

const Home = () => {
    const [channelName, setChannelName] = useState('')
    const [streams, setStreams] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const addChannel = () => {
        setModalVisible(true)
    }
    const [selectedChat, setSelectedChat] = useState("Name1")
    const [lastId, setLastId] = useState(1)
    const createChannel = () => {
        const newStream = {
            id: lastId,
            channel: channelName
        }
        setLastId(lastId + 1)
        setStreams([...streams, newStream])
        setModalVisible(false)
        if (selectedChat === 0)
            setSelectedChat(channelName)
    }
    const [hoveredVideo, setHoveredVideo] = useState(0)
    const [chatVisible, setChatVisible] = useState(false)
    const [darkMode, setDarkMode] = useState(true)

    const addChannelDiv = <div className={"screenOverlay "+(darkMode?"darkMode":"lightMode")} onClick={(e) => {
        if (!document.getElementById("modalBox").contains(e.target))
            setModalVisible(false)
    }}>
        <div className="addChannel" id="modalBox">
            <div className="modalHeader">
                <span> Enter Channel Name </span>
                <span className="modalClose" onClick={() => setModalVisible(false)}>&#10006;</span>
            </div>
            <input className="channelInput modalElement" autoFocus type="text" onKeyDown={(e) => {
                if (e.key === 'Escape') {
                    setModalVisible(false);
                }
                else if (e.key === 'Enter') {
                    createChannel();
                }
            }} placeholder="chocoTaco" onChange={(e) => setChannelName(e.target.value)} />
            <button disabled={channelName === ""} className="done modalElement" onClick={createChannel}> Add stream </button>
        </div>
    </div>
    return (
        <React.Fragment>
            <div className={"container " + (darkMode?"darkMode":"lightMode")}>
                {modalVisible && addChannelDiv}
                <ReactSortable
                    className="videoFrame"
                    list={streams}
                    setList={setStreams}
                    name="streams"
                    pull="clone"
                    put={false}
                    animation={400}>
                    {streams.map(stream => (
                        <div className="stream" key={stream.id}
                            onMouseOver={() => { setHoveredVideo(stream.id) }}
                            onMouseLeave={() => { setHoveredVideo(0) }} >{stream.channel}
                            <iframe src={"https://player.twitch.tv/?channel=" + stream.channel}
                                width="100%" height="100%"
                                frameBorder="0" allowFullScreen={true} scrolling="no" muted={false} ></iframe>
                            <div className={"helper " + (hoveredVideo === stream.id ? "" : "hiddenElement")}>
                                <button className="muteChannel">Mute</button>
                                <button className="chatChannel"
                                    onClick={
                                        () => {
                                            setChatVisible(!chatVisible);
                                            setSelectedChat(stream.channel)
                                        }
                                    }
                                >Chat</button>
                                <button className="closeChannel" onClick={
                                    () => {
                                        setStreams(streams.filter((e) => (e.id !== stream.id)));
                                        setChatVisible(false);
                                    }
                                }>Close</button>
                            </div>
                        </div>

                    ))}
                </ReactSortable>
                <div className="toggles">
                    <div className={"toggleBG " + (darkMode ? "darkModeToggleOn" : "darkModeToggleOff")} onClick={() => {
                        setDarkMode(!darkMode);
                    }}>
                        <div className={darkMode ? "darkIconToggleOn" : "darkIconToggleOff"}></div>
                    </div>
                    <div className="chatToggle">
                        <img className={chatVisible ? "chatToggleIconOn" : "chatToggleIconOff"}
                            src={toggleSVG}
                            alt="toggle"
                            onClick={() => {
                                setChatVisible(!chatVisible);
                            }}
                        />
                    </div>
                    <button className="addStream" onClick={() => addChannel()} />
                </div>
                <div className={"chatFrame " + (chatVisible ? "show" : "hide")}>
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
                    <div className="iframeContainer">
                        {selectedChat !== "" && <iframe frameBorder="2"
                            scrolling="yes"
                            theme="dark"
                            src={"https://www.twitch.tv/embed/" + selectedChat + "/chat"}>
                        </iframe>}
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default Home;