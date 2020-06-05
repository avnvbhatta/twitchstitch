import React, {useState} from "react";
import '../Toggle/Toggle.scss';

const Toggle = (props) =>{
    const [darkMode, setDarkMode] = props.dark
    return(
        <div className="toggles">
            {console.log(darkMode)}
            <div className={"toggleBG " + (darkMode ? "darkModeToggleOn" : "darkModeToggleOff")} 
            onClick={() => {
                setDarkMode(!darkMode);
            }}>
                <div className={darkMode ? "darkIconToggleOn" : "darkIconToggleOff"}></div>
            </div>
            
        </div>
            
    )
}
export default Toggle