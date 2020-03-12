import React from 'react';
import './index.css';
const screenW = window.screen.availWidth;
const screenH = window.screen.availHeight;
export default function SidePanel(props){
    const data = props.data;
    const elements = [];
    const recursiveBuildElements = (items, depth) => {
        for(let i = 0; i < items.length; i++){
            const item = items[i];
            elements.push(<Item title={item.title} depth={depth} onClick={item.onClick}/>);
            if(item.items) recursiveBuildElements(item.items, depth + 1);
        }
    }
    if(data && data.items) recursiveBuildElements(data.items, 1);
    return <div style={{
        height : "100%",
        width : "100%",
        background : "lightgrey"
    }}>
        {elements}
    </div>
}

const Item = (props) => {
    return <div style={{
        width : "97%",
        height : screenH * 0.05,
        padding : "0.5vh 0px 0.5vh 3%",
    }}>
        <div 
            className={"SidePanel-item" + (props.onClick ? " SidePanel-item-clickable" : "")} 
            onClick={props.onClick}
        >
            <p style={{
                position : "absolute",
                top : 0, bottom : 0, margin : "auto",
                height : "fit-content",
                left : `${10 * props.depth}%`,
                fontSize : "1.2rem",
                fontWeight : "700",
                userSelect: "none"
            }}>
                {props.title}
            </p>
        </div>
    </div>
}