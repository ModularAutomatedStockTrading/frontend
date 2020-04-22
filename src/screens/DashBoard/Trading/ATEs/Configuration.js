import React, {useState, useRef} from 'react';
import ConfigurationWrapper from 'components/ConfigurationWrapper'

import {Form, Button, Table, ToggleButtonGroup, ToggleButton, ListGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import StatePicker from 'components/StatePicker'

export default props => <ConfigurationWrapper 
    getEntity={(state, id) => state.ates[id]}
    entityName={"ATE"}
    ConfigurationComponent={Configuration}
    editTitle={"Edit ATE (automatic trading engine)"}
    createTitle={"Create ATE (automatic trading engine)"}
/>

const Configuration = props => {
    const ATE = props.ATE;
    const getTrainedModels = state => {
        const res = {};
        for(const id in state.model){
            if(state.model[id].hasTrained){
                res[id] = state.model[id];
            }
        }
        return res;
    }
    const [modelValue, setModelValue] = useState(null);

    const model = useSelector(state => modelValue && modelValue.value ? state.model[modelValue.value] : null);

    const refs = {
        name : useRef(null),
        description : useRef(null)
    };

    return (
    <Form>
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control ref={refs.name} required defaultValue={ATE ? ATE.name : ""} placeholder="Enter name" />
        </Form.Group>

        <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control ref={refs.description} as="textarea" defaultValue={ATE ? ATE.description : ""} placeholder="Enter description" />
        </Form.Group>
        {!ATE && <Form.Group>
            <Form.Label>Create ATE from: </Form.Label>
            <StatePicker value={modelValue} onPick={(val) => setModelValue(val)} getEntities={getTrainedModels}/>
        </Form.Group>}
        <h4>ATE bid trigger</h4>
        <ListGroup>
            {model ? model.outputs.map((output, idx) => <ListGroup.Item key={idx}>
                    <div style={{width : "47%", marginRight : "3%", display : "inline-block", textAlign : "right"}}>
                        <Form.Label>{output.label}</Form.Label>
                    </div>
                    <div style={{width : "50%", display : "inline-block", textAlign : "left"}}>
                        <ToggleButtonGroup type="radio" name="options" defaultValue={"unset"}>
                            <ToggleButton value={"false"}>False</ToggleButton>
                            <ToggleButton value={"unset"}>Unset</ToggleButton>
                            <ToggleButton value={"true"}>True</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </ListGroup.Item>
            ) : <p>Choose a model</p>}
        </ListGroup>
        <br/>
        <h4>ATE sell trigger</h4>
        <ListGroup>
            {model ? model.outputs.map((output, idx) => <ListGroup.Item key={idx}>
                    <div style={{width : "47%", marginRight : "3%", display : "inline-block", textAlign : "right"}}>
                        <Form.Label>{output.label}</Form.Label>
                    </div>
                    <div style={{width : "50%", display : "inline-block", textAlign : "left"}}>
                        <ToggleButtonGroup type="radio" name="options" defaultValue={"unset"}>
                            <ToggleButton value={"false"}>False</ToggleButton>
                            <ToggleButton value={"unset"}>Unset</ToggleButton>
                            <ToggleButton value={"true"}>True</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </ListGroup.Item>
            ) : <p>Choose a model</p>}
        </ListGroup>
        <br/>
        <Button type={"submit"}>
            Create
        </Button>
    </Form>
    )
}