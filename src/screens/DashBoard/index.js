import React from 'react';
import Overview from './Overview'
import SidePanel from 'components/SidePanel/index.js'
import {
  Route,
} from "react-router-dom";

const screenW = window.screen.availWidth;
const screenH = window.screen.availHeight;

export default function DashBoard(props){
    return <div>
        <Route exact path={"/dashboard"} component={() => <Wrapper><Overview/></Wrapper>}/>
    </div>
}

const menuContent = {
    items : [
        {
            title : "test1",
            onClick : () => {
                console.log("test1")
            },
            items : [
                {
                    title : "test1_1",
                    onClick : () => {
                        console.log("test1_1")
                    }
                },
                {
                    title : "test1_2"
                }
            ],
        },
        {
            title : "test2",
            items : [
                {
                    title : "test2_1"
                },
                {
                    title : "test2_2",
                    items : [
                        {
                            title : "test2_2_1",
                            onClick : () => {
                                console.log("test2_2_1")
                            }
                        }
                    ]
                },
                {
                    title : "test2_3"
                }
            ]
        }
    ]
};

function Wrapper(props){
    return <div height={{
        height : "100vh",
        width : "100vw",
        position : "relative",
        overflow : "hidden"
    }}>
        <div style={{
            position : "absolute",
            height : "100%",
            width : screenW * 0.2,
            boxShadow : "0px 0px 1vw 0.1vw grey",
            overflowY : "auto"
        }}>
            <SidePanel data={menuContent}/>
        </div>
        <div style={{
            position : "absolute",
            left : screenW * 0.2,
            height : "100%",
            width : window.innerWidth - screenW * 0.2,
            overflowY : "auto"
        }}>
            {props.children}
        </div>
    </div>
}