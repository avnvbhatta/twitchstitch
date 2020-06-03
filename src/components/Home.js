import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

import './Home.scss';

const Home = () => {
    const [channelName, setChannelName] = useState('nothing')
    const [streams,
        setStreams] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const addChannel = () => {
        setModalVisible(true)
    }
    const [lastId, setLastId] = useState(1)
    const createChannel = () => {
        const newStream = {
            id: lastId,
            channel: channelName
        }
        setLastId(lastId + 1)
        setStreams([...streams, newStream])
        setModalVisible(false)
    }
    const [hoveredVideo, setHoveredVideo] = useState(0)
    return (
        <div className="container">
            {modalVisible && <div className="addChannel">
                <button className="modalClose" onClick={() => setModalVisible(false)}>  X </button>
                <input className="channelInput modalElement" type="text" placeholder="stream name" onChange={(e) => setChannelName(e.target.value)} />
                <button disabled={channelName === ""} className="done modalElement" onClick={createChannel}> Add stream </button>
            </div>}
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
                        frameborder="0" allowfullscreen="true" scrolling="no" ></iframe>
                        <div className={"helper " + (hoveredVideo === stream.id ? "" : "hiddenElement")}>
                            <button className="muteChannel">Mute</button>
                            <button className="chatChannel">Chat</button>
                            <button className="closeChannel" onClick={
                                () =>{
                                    setStreams(streams.filter((e)=>(e.id !== stream.id)));
                                }
                            }>Close</button>
                        </div>
                    </div>

                ))}
            </ReactSortable>

            <div className="chatFrame">
                <div className="chatToggle">
                    <h1>BTN</h1>
                </div>
            </div>
            <button className="addStream" onClick={() => addChannel()} />
        </div>
    )
}

export default Home;