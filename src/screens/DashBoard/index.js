import React from 'react';
import Overview from './Overview'
import SidePanel from 'components/SidePanel'
import {
  Route,
} from "react-router-dom";

export default function DashBoard(props){
    return <div>
        <Route exact path={"/dashboard"} component={() => <Wrapper><Overview/></Wrapper>}/>
        <Route exact path={"/dashboard"} component={() => <Wrapper><Overview/></Wrapper>}/>
    </div>
}

function Wrapper(props){
    return <div>
        <div style={{
            position : "fixed",
            height : "100vh",
            width : "20vw",
            background : "lightgrey",
            boxShadow : "0px 0px 1vw 0.1vw grey"
        }}>
            <SidePanel/>
        </div>
        <div style={{
            position : "fixed",
            width : "80vw",
            height : "100vh",
            left : "20vw"
        }}>
            {props.children}
        </div>
    </div>
}