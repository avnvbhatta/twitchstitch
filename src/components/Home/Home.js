import React, { useState } from "react";
import '../Home/Home.scss';
import Toggle from "../Toggle/Toggle";
import AddChannel from "../AddChannel/AddChannel";
import Chat from "../Chat/Chat";
import SortableStream from "../SortableStream/SortableStream";


const Home = () => {
    /* All of the states required by the app */
    const [chatVisible, setChatVisible] = useState(false)
    const [channelName, setChannelName] = useState('')
    const [streams, setStreams] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [hoveredVideo, setHoveredVideo] = useState(0)
    const [darkMode, setDarkMode] = useState(true)
    const [selectedChat, setSelectedChat] = useState("Name1")
    const [channelExists, setChannelExists] = useState(false);

    const addChannel = () => {
        setModalVisible(true)
    }

    const duplicate = (s) => {
        let found = false;
        streams.map(stream => {
            if (stream.channel === s) {
                found = true
            }
        })
        return found
    }
    const createChannel = () => {
        if (!duplicate(channelName)) {
            setChannelExists(false);

            let channels = channelName.trim().split(",");
            channels = channels.filter(channel => channel.length > 0 && channel.replace(/ /g,'') !=='');
            let channelArray = []
            channels.forEach(channel =>{
                const newStream = {
                    channel: channel.trim()
                }
                channelArray.push(newStream)
            })
            
            let finalArray = [...streams, ...channelArray]
            setStreams(finalArray.splice(0,6))
            setModalVisible(false)
            if (selectedChat === 0)
                setSelectedChat(channelName)
                setChannelName('')
        } else {
            setChannelExists(true);
        }


    }



    return (
        <div>
            <div className={(streams.length === 0 ? "logo" : "logoCondensed")}>
                <h1>twitchstitch</h1>
                <p>Watch all of your favorite Twitch streamers in one place.</p>
            </div>
            <React.Fragment>
                <div className={"container " + (darkMode ? "darkMode" : "lightMode")}>
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