import React, { useState } from "react";
import '../Home/Home.scss';
import Toggle from "../Toggle/Toggle";
import AddChannel from "../AddChannel/AddChannel";
import Chat from "../Chat/Chat";
import SortableStream from "../SortableStream/SortableStream";


  const Home = () => {
      {/* All of the states required by the app */}
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

    return (
        <div>
            <div className={(streams.length === 0 ?  "logo" : "logoCondensed")}>
                <h1>twitchstitch</h1>
                <p>Watch all of your favorite Twitch streamers in one place.</p>
            </div>
            <React.Fragment>
                <div className={"container " + (darkMode?"darkMode":"lightMode")}>
                    {modalVisible && 
                    <AddChannel 
                        darkMode={darkMode}
                        setModalVisible={setModalVisible}
                        setSelectedChat={setSelectedChat}
                        createChannel={createChannel}
                        channelName={[channelName, setChannelName]}
                        channelExists={[channelExists, setChannelExists]}
                    
                    />}
                    <SortableStream 
                        streams={[streams, setStreams]}
                        hoveredVideo={[hoveredVideo, setHoveredVideo]}
                        chatVisible={[chatVisible, setChatVisible]}
                        selectedChat={[selectedChat, setSelectedChat]}
                        getSize={getSize}
                    />
                    
                    <Toggle 
                        dark={[darkMode, setDarkMode]} 
                        chatVisible={[chatVisible, setChatVisible]}
                        numStreams={streams.length}
                        addChannel={addChannel}
                    />

                    <Chat 
                        selectedChat={[selectedChat, setSelectedChat]} 
                        streams={streams}
                        darkMode={darkMode}
                        chatVisible={chatVisible}
                    />
                    
                </div>

            </React.Fragment>
        </div>
        
    )
}

export default Home;