import React from "react";
import '../Toggle/Toggle.scss';
import toggleIcon from "../../images/toggle.png";

const Toggle = (props) =>{
    const [darkMode, setDarkMode] = props.dark
    const [chatVisible, setChatVisible] = props.chatVisible
    const numStreams = props.numStreams
    const addChannel = props.addChannel
    return(
        <div className="toggles">
            <div className={"toggleBG " + (darkMode ? "darkModeToggleOn" : "darkModeToggleOff")} 
            onClick={() => {
                setDarkMode(!darkMode);
            }}>
                <div className={darkMode ? "darkIconToggleOn" : "darkIconToggleOff"}></div>
            </div>
            <div className={(numStreams > 0 ? "chatToggle" : "hiddenElement")}>
                <img className={chatVisible ? "chatToggleIconOn" : "chatToggleIconOff"}
                    src={toggleIcon}
                    alt="toggle"
                    onClick={() => {
                        setChatVisible(!chatVisible);
                    }}
                />
            </div>
            <button className="addStream " onClick={addChannel} disabled={numStreams >= 6}/>
            
        </div>
            
    )
}
export default Toggle