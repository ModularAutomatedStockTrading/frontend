import React from 'react';
import Overview from './Overview'
import Models from './Models/index'
import CreateModel from './Models/Create'
import Trades from './Trading/Trades'
import CreateTrade from './Trading/Create'
import SidePanel from 'components/SidePanel/index.js'
import {
  Route,
  useHistory
} from "react-router-dom";
import { Badge } from 'react-bootstrap';

const screenW = window.screen.availWidth;
const screenH = window.screen.availHeight;

export default function DashBoard(props){
    return <div>
        <Route exact path={"/dashboard"}
            component={() => <Wrapper active={"Dashboard"}><Overview/></Wrapper>}
        />
        <Route exact path={"/dashboard/models"} 
            component={() => <Wrapper active={"Models"}><Models/></Wrapper>}
        />
        <Route exact path={"/dashboard/models/create"}
            component={() => <Wrapper active={"Create model"}><CreateModel/></Wrapper>}
        />
        <Route exact path={"/dashboard/trades/create"}
            component={() => <Wrapper active={"Create trade"}><CreateTrade/></Wrapper>}
        />
        <Route exact path={"/dashboard/trades"}
            component={() => <Wrapper active={"View trades"}><Trades/></Wrapper>}
        />
   </div>
}

const testMenuContent = {
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
    const history = useHistory();
    const menuContent = {
        active : props.active,
        items : [
            {
                title : "Dashboard",
                onClick : () => {
                    history.push("/dashboard")
                }
            },
            {
                title : "Models",
                onClick : () => {
                    history.push("/dashboard/models")
                },
                items : [
                    {
                        title : "Create model",
                        onClick : () => {
                            history.push("/dashboard/models/create")
                        }
                    }
                ]
            },
            {
                title : <>Trading <Badge variant="primary">Coming soon</Badge></>,
                items : [
                    {
                        title : "View trades",
                        onClick : () => {
                            history.push("/dashboard/trades")
                        },
                    },
                    {
                        title : "Create trade",
                        onClick : () => {
                            history.push("/dashboard/trades/create")
                        }
                    }
                ]
            },
            {
                title : <>Analytics <Badge variant="primary">Coming soon</Badge></>
            },
            {
                title : <>Multimodels Analytics <Badge variant="primary">Coming soon</Badge></>,
                items : [
                    {
                        title : <div style={{fontSize : "0.9rem"}}>Create multimodel <Badge variant="primary">Coming soon</Badge></div>
                    }
                ]
            }
        ]
    };
    return <div height={{
        width : "100vw",
        overflow : "hidden"
    }}>
        <div style={{
            height : "100vh",
            width : screenW * 0.2,
            boxShadow : "0px 0px 1vw 0.1vw grey",
            paddingTop : screenH * 0.02,
            overflowY : "auto",
            display : "block",
            float : "left"
        }}>
            <SidePanel data={menuContent}/>
        </div>
        <div style={{
            left : screenW * 0.2,
            height : "100vh",
            width : "-webkit-fill-available",
            overflowY : "auto",
            display : "flex"
        }}>
            {props.children}
        </div>
    </div>
}