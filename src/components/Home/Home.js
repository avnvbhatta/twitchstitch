import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import '../Home/Home.scss';
import toggleIcon from "../../images/toggle.png";
import chatIcon from "../../images/chat.png"
import closeIcon from "../../images/close.png"
import Toggle from "../Toggle/Toggle";

  const Home = () => {
      const [chatVisible, setChatVisible] = useState(false)
      const [channelName, setChannelName] = useState('')
      const [streams, setStreams] = useState([])
      const [modalVisible, setModalVisible] = useState(false)
      const [hoveredVideo, setHoveredVideo] = useState(0)
      const [darkMode, setDarkMode] = useState(true)
      const [selectedChat, setSelectedChat] = useState("Name1")
      const [lastId, setLastId] = useState(1)
      const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
      const [channelExists, setChannelExists] = useState(false);
      
      const addChannel = () => {
          setModalVisible(true)
        }
        function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        const frameWidth = !chatVisible?[width, height]: [width-350, height]
        return frameWidth
      }

    const duplicate = (s) => {
        let found = false;
        streams.map(stream => {
            if(stream.channel === s){
                found = true
            }
        })
        return found
    }
    const createChannel = () => {

        if(!duplicate(channelName)){
            setChannelExists(false);
            const newStream = {
                id: lastId,
                channel: channelName
            }
            setLastId(lastId + 1)
            setStreams([...streams, newStream])
            setModalVisible(false)
            if (selectedChat === 0)
                setSelectedChat(channelName)
        }else{
            setChannelExists(true);
        }
            
    }

    // to handle size for different screens
    // first specify height and width based on the curernt screen resolution
    // to handle weird monitors sizs (large or small)
    // specify minwidth and minheight
    // similary specify maxwidth and maxheight
    // just to make sure that the video is not distorted according to the weird size of the monitor
    // so it will be a fixed resolution in either of those cases (max / min)

    // lets say for jsut one video
    // the maxwidth is specified as 3200px
    // and maxheight is specified as 2400px
    // then as we add videos
    // we just divide these as needed

    const aspectRatio = 16/9;
    const getSize = () => {
        if (streams.length === 1){
            let widthDimensions =  windowDimensions[0] *.58;
            let heightDimensions = widthDimensions / aspectRatio;
            return {
                width: widthDimensions, 
                height: heightDimensions , 
                minWidth: 1010,
                minHeight: 1010/ aspectRatio,
                maxWidth: 1725,
                maxHeight: 1725 / aspectRatio
            }
        } else if (!chatVisible && streams.length <  5){
            let widthDimensions =  windowDimensions[0] *.45;
            let heightDimensions = widthDimensions / aspectRatio;
            return {
                width: widthDimensions, 
                height: heightDimensions , 
                minWidth: 875,
                minHeight: 875/aspectRatio,
                maxWidth: 862,
                maxHeight: 862 / aspectRatio
            }
        } else{
            let widthDimensions =  windowDimensions[0] *.33;
            let heightDimensions = widthDimensions / aspectRatio;
            return {
                width: widthDimensions, 
                height: heightDimensions ,   
                minWidth: 383,
                minHeight: 383/aspectRatio,
                maxWidth: 575,
                maxHeight: 575/aspectRatio
            }
        }
    }

    
    // addchanneldiv
    const addChannelDiv = <div className={"screenOverlay "+(darkMode?"darkMode":"lightMode")} onClick={(e) => {
        if (!document.getElementById("modalBox").contains(e.target))
            setModalVisible(false)
    }}>
        <div className="addChannel" id="modalBox">
            <div className="modalHeader">
                <span> Enter Channel Name </span>
                <span className="modalClose" onClick={() => {setModalVisible(false);setChannelExists(false);}}>&#10006;</span>
            </div>
            <input className="channelInput modalElement" autoFocus type="text" onKeyDown={(e) => {
                if (e.key === 'Escape') {
                    setModalVisible(false);
                }
                else if (e.key === 'Enter' && channelName != "") {
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
    return (
        <div>
            <div className={(streams.length === 0 ?  "logo" : "logoCondensed")}>
                <h1>twitchstitch</h1>
                <p>Watch all of your favorite Twitch streamers in one place.</p>
            </div>
            <React.Fragment>
                <div className={"container " + (darkMode?"darkMode":"lightMode")}>
                    {modalVisible && addChannelDiv}
                    {/* sortable *** */}
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
                                onMouseLeave={() => { setHoveredVideo(0) }} 
                                style = {getSize()}>
                                <iframe src={"https://player.twitch.tv/?channel=" + stream.channel}
                                    width="100%" height="100%"
                                    frameBorder="0" allowFullScreen={true} scrolling="no" muted={true} ></iframe>
                                <div className={"helper " + (hoveredVideo === stream.id ? "hoHeight" : "noHeight")}>
                                    <img src={chatIcon} className="chatChannel hoverIcon" alt="chatIcon" onClick={
                                            () => {
                                                if(streams.length === 1){
                                                    setChatVisible(!chatVisible);
                                                }
                                                else if(streams.length > 1){
                                                    if(selectedChat === stream.channel){
                                                        setChatVisible(!chatVisible);
                                                    }else{
                                                        setChatVisible(true);
                                                    }
                                                    
                                                }
                                                setSelectedChat(stream.channel)                                           
                                            }
                                        }/>
                                    <img src={closeIcon} className="closeChannel hoverIcon" alt="closeIcon" 
                                        onClick={
                                            () => {
                                                setStreams(streams.filter((e) => (e.id !== stream.id)));
                                                setChatVisible(false);
                                            }
                                        }
                                    />
                                    
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                    {/* <div className="toggles">
                        <div className={"toggleBG " + (darkMode ? "darkModeToggleOn" : "darkModeToggleOff")} onClick={() => {
                            setDarkMode(!darkMode);
                        }}>
                            <div className={darkMode ? "darkIconToggleOn" : "darkIconToggleOff"}></div>
                        </div>
                        <div className={(streams.length > 0 ? "chatToggle" : "hiddenElement")}>
                            <img className={chatVisible ? "chatToggleIconOn" : "chatToggleIconOff"}
                                src={toggleIcon}
                                alt="toggle"
                                onClick={() => {
                                    setChatVisible(!chatVisible);
                                }}
                            />
                        </div>
                        <button className="addStream " onClick={() => addChannel()} disabled={streams.length >= 6}/>
                    </div> */}
                    <Toggle dark={[darkMode, setDarkMode]}/>

                    {/* chatframe *** */}
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

                        {/* iframe *** */}
                        <div className="iframeContainer">
                            {selectedChat !== "" && <iframe frameBorder="0"
                                scrolling="yes"
                                theme="dark"
                                src={"https://www.twitch.tv/embed/" + selectedChat + "/chat"+(darkMode ? "?darkpopout":"")}>
                            </iframe>}
                        </div>
                    </div>
                </div>

            </React.Fragment>
        </div>
        
    )
}

export default Home;