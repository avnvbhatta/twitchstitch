import React from "react"
import '../SortableStream/SortableStream.scss'
import { ReactSortable } from "react-sortablejs";
import chatIcon from "../../images/chat.png"
import closeIcon from "../../images/close.png"

const SortableStream = (props) => {
    const [streams, setStreams] = props.streams
    const [hoveredVideo, setHoveredVideo] = props.hoveredVideo
    const [chatVisible, setChatVisible] = props.chatVisible
    const [selectedChat, setSelectedChat] = props.selectedChat
    function getParentSize() {
        let length = 1
        if (streams.length>=2 && streams.length<5){
            length = 2
        }
        if(streams.length >= 5){
            length = 3
        }
        return length;
    }
    return (
        <ReactSortable
            className={"videoFrame parent" + getParentSize()}
            list={streams}
            setList={setStreams}
            name="streams"
            pull="clone"
            put={false}
            animation={400}>
            {streams.map(stream => (
                <div className="child" key={stream.channel}
                    onMouseOver={() => { setHoveredVideo(stream.channel) }}
                    onMouseLeave={() => { setHoveredVideo(0) }}
                >
                    <iframe
                        src={"https://player.twitch.tv/?channel=" + stream.channel+"&parent=twitchstitch.app&parent=twitchstitch.app"}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen={true}
                        scrolling="no"
                        muted={true}
                        title={stream.channel + "TwitchStitched"}>
                    </iframe>
                    <div className={"helper " + (hoveredVideo === stream.channel ? "hoHeight" : "noHeight")}>
                        <img src={chatIcon} className="chatChannel hoverIcon" alt="chatIcon" onClick={
                            () => {
                                if (streams.length === 1) {
                                    setChatVisible(!chatVisible);
                                }
                                else if (streams.length > 1) {
                                    if (selectedChat === stream.channel) {
                                        setChatVisible(!chatVisible);
                                    } else {
                                        setChatVisible(true);
                                    }

                                }
                                setSelectedChat(stream.channel)
                            }
                        } />
                        <img src={closeIcon} className="closeChannel hoverIcon" alt="closeIcon"
                            onClick={
                                () => {
                                    setStreams(streams.filter((e) => (e.channel !== stream.channel)));
                                    setChatVisible(false);
                                }
                            }
                        />
                    </div>
                </div>
            ))}
        </ReactSortable>
    )
}

export default SortableStream
