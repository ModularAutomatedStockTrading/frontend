import React from 'react';
import Overview from './Overview'
import Models from './Models/index'
import ModelConfiguration from './Models/Configuration'
import Instances from './Instances'
import InstanceConfiguration from './Instances/Configuration'
import Trades from './Trading/Trades'
import Trading from './Trading'
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
        <Route path={"/dashboard/models/edit/:id"}
            component={() => <Wrapper><ModelConfiguration {...props}/></Wrapper>}
        />
        <Route exact path={"/dashboard/models/create"}
            component={() => <Wrapper active={"+ Create model"}><ModelConfiguration/></Wrapper>}
        />


        <Route exact path={"/dashboard/instances"} 
            component={() => <Wrapper active={"Instances"}><Instances/></Wrapper>}
        />
        <Route path={"/dashboard/instances/edit/:id"}
            component={() => <Wrapper><InstanceConfiguration {...props}/></Wrapper>}
        />
        <Route exact path={"/dashboard/instances/create"}
            component={() => <Wrapper active={"+ Create instance"}><InstanceConfiguration/></Wrapper>}
        />


        <Route exact path={"/dashboard/trading"}
            component={() => <Wrapper active={"Trading"}><Trading/></Wrapper>}
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
                        title : "+ Create model",
                        onClick : () => {
                            history.push("/dashboard/models/create")
                        }
                    }
                ]
            },
            {
                title : "Instances",
                onClick : () => {
                    history.push("/dashboard/instances")
                },
                items : [
                    {
                        title : "+ Create instance",
                        onClick : () => {
                            history.push("/dashboard/instances/create")
                        }
                    }
                ]
            },
            {
                title : "Trading",
                onClick : () => {
                    history.push("/dashboard/trading")
                },
                items : [
                    {
                        title : <>View trades <Badge variant="primary">Coming soon</Badge></>,
                    },
                    {
                        title : <>Create trade <Badge variant="primary">Coming soon</Badge></>,
                    }
                ]
            },
            {
                title : <>Analytics <Badge variant="primary">Coming soon</Badge></>
            },
            {
                title : <>Multimodels <Badge variant="primary">Coming soon</Badge></>,
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