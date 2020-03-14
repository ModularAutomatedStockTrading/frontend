import React from 'react';
import {useSelector} from 'react-redux'
import './index.css'
import {useHistory} from 'react-router-dom'
export default function Instances(props){
    const instances = Object.values(useSelector(state => state.instance));
    const history = useHistory();
    return <div style={{
        width : "100%",
        height : "100%"
    }}>
        <div style={{
            width : "fit-content",
            minWidth : "50%",
            textAlign : "center",
            margin : "5vh auto"
        }}>
            <p style={{fontSize : "2rem", fontWeight : "700"}}>Instances</p>
            {
                instances.map((instance, idx) => <div className={"Instances-instance"} key={instance._id} style={{
                    height : window.screenH * 0.05,
                    width : "100%",
                    marginBottom : window.screenH * 0.01,
                }} onClick={() => {
                    history.push(`./instances/edit/${instance._id}`);
                }}>
                    <p>{instance.name}</p>
                </div>)
            }
        </div>
    </div>
}