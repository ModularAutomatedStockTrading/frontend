import React from 'react';
import {useSelector} from 'react-redux'
import './index.css'
import {useHistory} from 'react-router-dom'
export default function Models(props){
    const models = Object.values(useSelector(state => state.model));
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
            <p style={{fontSize : "2rem", fontWeight : "700"}}>Models</p>
            {
                models.map((model, idx) => <div className={"Models-model"} key={model._id} style={{
                    height : window.screenH * 0.05,
                    width : "100%",
                    marginBottom : window.screenH * 0.01,
                }} onClick={() => {
                    history.push(`./models/edit/${model._id}`);
                }}>
                    <p>{model.name}</p>
                </div>)
            }
        </div>
    </div>
}