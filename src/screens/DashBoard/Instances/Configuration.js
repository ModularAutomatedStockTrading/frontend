import React, {useState, useRef} from 'react';
import {Form, Button, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import InputOptions from 'components/InputOptions'
import OutputOptions from 'components/OutputOptions'
import {useHistory, useParams} from "react-router-dom";
import {post, patch, deleteInstance} from 'state/instance'
import {Spinner} from 'react-bootstrap'
import ModelPicker from 'components/ModelPicker'

export default function ConfigurationWrapper(props){

    const { id : instanceID } = useParams();

    const instance = useSelector(state => instanceID ? state.instance[instanceID] : null);

    return <div style={{
        width : "100%",
        height : "100%",
    }}>
        <div style={{
            width : "fit-content",
            minWidth : "50%",
            textAlign : "center",
            margin : "5vh auto"
        }}>
            <p style={{fontSize : "2rem", fontWeight : "700"}}>{instanceID ? "Edit instance" :  "Create instance"}</p>
            {(instanceID && !instance) && <Spinner animation="border" variant="primary" />}
            {(!instanceID || instance) && <Configuration instance={instance}/>}
        </div>
    </div>
}

const Configuration = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const instance = props.instance;
    
    const [amountOfHiddenLayers, setAmountOfHiddenLayers] = useState(instance ? instance.amountOfHiddenLayers : null);
    
    const [model, setModel] = useState(null);

    console.log(instance)
    
    const [nodeCount, setNodeCount] = useState(() => {
        const res = {
            input : instance ? instance.amountOfInputNodes : 1,
            output : instance ? instance.amountOfOutputNodes : 1
        }
        if(instance){
            for(let i = 1; i <= instance.amountOfHiddenLayers; i++){
                res[i] = instance.amountOfHiddenLayerNodes[i-1];
            }
        }
        return res;
    });

    const [inputs, setInputs] = useState(() => {
        if(!instance) return {};
        const res = {};
        for(let i = 0; i < instance.amountOfInputNodes; i++){
            res[i + 1] = instance.inputs[i];
        }
        return res;
    });

    const [outputs, setOutputs] = useState(() => {
        if(!instance) return {};
        const res = {};
        for(let i = 0; i < instance.amountOfOutputNodes; i++){
            res[i + 1] = instance.outputs[i];
        }
        return res;
    });

    const refs = {
        name : useRef(null),
        description : useRef(null)
    };

    return  <Form onSubmit={(e) => {
                e.preventDefault();
                const body = {
                    name : refs.name.current.value,
                    description : refs.description.current.value
                }
                if(instance) patch(dispatch, instance._id, body);
                else post(dispatch, {
                    ...body,
                    modelID : model.value
                });
                history.push("/dashboard/instances");
            }}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={refs.name} required defaultValue={instance ? instance.name : ""} placeholder="Enter name" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref={refs.description} as="textarea" defaultValue={instance ? instance.description : ""} placeholder="Description" />
                </Form.Group>

                {!instance && <Form.Group>
                    <Form.Label>Create instance from: </Form.Label>
                    <ModelPicker value={model} onPick={(val) => setModel(val)}/>
                </Form.Group>}

                {instance && <><Form.Label>Input layer</Form.Label>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Node #</th>
                            <th>Input</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (() => {
                                const res = [];
                                for(let i = 1; i <= nodeCount.input; i++){
                                    res.push(
                                        <tr key={i}>
                                            <td>Node {i}</td>
                                            <td>
                                                {inputs[i].label}
                                            </td>
                                        </tr>
                                    );
                                }
                                return res;
                            })()
                        }
                    </tbody>
                </Table>

                <Form.Label>Output layer</Form.Label>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Node #</th>
                            <th>Output</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (() => {
                                const res = [];
                                for(let i = 1; i <= nodeCount.output; i++){
                                    res.push(
                                        <tr key={i}>
                                            <td>Node {i}</td>
                                            <td>
                                                {outputs[i].label}
                                            </td>
                                        </tr>
                                    );
                                }
                                return res;
                            })()
                        }
                    </tbody>
                </Table>

                <Form.Group >
                    <Form.Label>Amount of hidden layers: {amountOfHiddenLayers}</Form.Label>
                </Form.Group>

                <Form.Label>Layer configuration</Form.Label>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Layer</th>
                            <th># of nodes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Input</td>
                            <td>
                                {nodeCount.input}
                            </td>
                        </tr>
                        {
                            (() => {
                                const res = [];
                                for(let i = 1; i <= amountOfHiddenLayers; i++){
                                    res.push(
                                        <tr key={i}>
                                            <td>Hidden layer {i}</td>
                                            <td>
                                                {nodeCount[i]}
                                            </td>
                                        </tr>
                                    );
                                }
                                return res;
                            })()
                        }
                        <tr>
                            <td>Output</td>
                            <td>
                                {nodeCount.output}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                </>}

                <Button variant="primary" type="submit">
                    {instance ? "Save" : "Create"}
                </Button>

                {instance && <Button style={{marginLeft : "10%"}} variant="danger" onClick={() => {
                    deleteInstance(dispatch, instance._id);
                    history.push("/dashboard/instances");
                }}>
                    Delete
                </Button>}
            </Form>
}