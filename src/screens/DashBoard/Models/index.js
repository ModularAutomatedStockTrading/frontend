import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import './index.css'
import {useHistory} from 'react-router-dom'
import {Button, Spinner} from 'react-bootstrap'
import ConfirmationPopup from 'components/ConfirmationPopup'
import {train as trainModel} from 'state/model'

export default function Models(props){
    const models = useSelector(state => state.model);
    const history = useHistory();
    const [activeModelID, setActiveModelID] = useState(null);
    const dispatch = useDispatch();
    return <>
    <ConfirmationPopup title={activeModelID ? `Confirm training of model: ${models[activeModelID].name}` : ""} show={activeModelID != null} onConfirm={() => {
        trainModel(dispatch, activeModelID);
        setActiveModelID(null);
    }} onClose={() => setActiveModelID(null)}/>
    <div style={{
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
                Object.values(models).map((model, idx) => <div style={{
                    height : window.screenH * 0.05,
                    position : "relative"
                }}>
                    <Button style={{
                        position : "absolute",
                        transform : "translate(-130%)",
                        height : "100%",
                        left : 0,
                        top : 0,
                    }} onClick={() => setActiveModelID(model._id)}>
                        {
                            model.isTraining ? <Spinner animation="border" /> : model.hasTrained ? "Trained" : "Train"
                        }
                    </Button>    
                    <div className={"Models-model"} key={model._id} style={{
                        width : "100%",
                        height : "100%",
                        marginBottom : window.screenH * 0.01,
                    }} onClick={() => {
                        history.push(`./models/edit/${model._id}`);
                    }}>
                        <p>{model.name}</p>
                    </div>
                </div>)
            }
        </div>
    </div>
    </>
}