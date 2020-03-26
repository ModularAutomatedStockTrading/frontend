import React, {useState} from 'react';
import {useSelector} from 'react-redux'
import './index.css'
import {useHistory} from 'react-router-dom'
import {Button, Spinner} from 'react-bootstrap'
import ConfirmationPopup from 'components/ConfirmationPopup'

export default function Models(props){
    const models = Object.values(useSelector(state => state.model));
    const history = useHistory();
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    return <>
    <ConfirmationPopup title={"Confirm training start"} show={showConfirmPopup} onConfirm={() => {
        //
    }} onClose={() => setShowConfirmPopup(false)}/>
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
                models.map((model, idx) => <div style={{
                    height : window.screenH * 0.05,
                    position : "relative"
                }}>
                    <Button style={{
                        position : "absolute",
                        transform : "translate(-130%)",
                        height : "100%",
                        left : 0,
                        top : 0,
                    }} onClick={() => setShowConfirmPopup(true)}>
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