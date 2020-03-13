import React, {useState, useRef} from 'react';
import {Form, Button, Table} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import InputOptions from 'components/InputOptions'
import OutputOptions from 'components/OutputOptions'
import {useHistory} from "react-router-dom";
import {post} from 'state/model'
export default function Create(props){
    const dispatch = useDispatch();
    const history = useHistory();
    const [amountOfHiddenLayers, setAmountOfHiddenLayers] = useState(null);
    const [nodeCount, setNodeCount] = useState({
        input : 1,
        output : 1
    });
    const [inputs, setInputs] = useState({});
    const [outputs, setOutputs] = useState({});
    const refs = {
        name : useRef(null),
        description : useRef(null)
    };
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
            <p style={{fontSize : "2rem", fontWeight : "700"}}>Create model</p>
            <Form onSubmit={(e) => {
                e.preventDefault();
                const inputRes = [];
                const outputRes = [];
                const nodeCountRes = [];
                for(let i = 1; i <= nodeCount.input; i++) inputRes.push(inputs[i].value);
                for(let i = 1; i <= nodeCount.output; i++) outputRes.push(outputs[i].value);
                for(let i = 1; i <= amountOfHiddenLayers; i++) nodeCountRes.push(nodeCount[i]);
                const body = {
                    inputs : inputRes,
                    outputs : outputRes,
                    amountOfInputNodes : nodeCount.input,
                    amountOfOutputNodes : nodeCount.output,
                    amountOfHiddenLayerNodes : nodeCountRes,
                    amountOfHiddenLayers,
                    name : refs.name.current.value,
                    description : refs.description.current.value
                }
                post(dispatch, body);
                history.push("/dashboard/models");
            }}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={refs.name} required defaultValue="" placeholder="Enter name" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref={refs.description} as="textarea" defaultValue="" placeholder="Description" />
                </Form.Group>

                <Form.Label>Input layer configuration</Form.Label>
                <Table striped bordered hover>
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
                                                <InputOptions value={inputs[i]} onPick={(val) => {
                                                    inputs[i] = val;
                                                    setInputs({...inputs});
                                                }}/>
                                            </td>
                                        </tr>
                                    );
                                }
                                return res;
                            })()
                        }
                    </tbody>
                </Table>

                <Form.Label>Output layer configuration</Form.Label>
                <Table striped bordered hover>
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
                                                <OutputOptions value={outputs[i]} onPick={(val) => {
                                                    outputs[i] = val;
                                                    setOutputs({...outputs});
                                                }}/>
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
                    <Form.Label>Amount of hidden layers</Form.Label>
                    <Form.Control onChange={(e) => {
                        if(e.target.value != "") setAmountOfHiddenLayers(Math.min(e.target.value, 10));
                        else setAmountOfHiddenLayers(null);
                    }} type="number" required min="0" max="10" placeholder="Enter amount of hidden layers" value={amountOfHiddenLayers != null ? amountOfHiddenLayers : ""}/>
                </Form.Group>

                <Form.Label>Layer configuration</Form.Label>
                <Table striped bordered hover>
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
                                <Form.Control onChange={(e) => {
                                    if(e.target.value != "") nodeCount.input = Math.max(Math.min(e.target.value, 10), 1);
                                    else nodeCount.input = "";
                                    setNodeCount({...nodeCount});
                                }} required type="number" min="1" max="10" placeholder="Enter amount of nodes" value={nodeCount.input}/>
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
                                                <Form.Control onChange={(e) => {
                                                    if(e.target.value != "") nodeCount[i] = Math.max(Math.min(e.target.value, 300), 1);
                                                    else nodeCount[i] = "";
                                                    setNodeCount({...nodeCount});
                                                }} required type="number" min="1" max="300" placeholder="Enter amount of nodes" value={nodeCount[i] ? nodeCount[i] : ""}/>
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
                                <Form.Control onChange={(e) => {
                                    if(e.target.value != "") nodeCount.output = Math.max(Math.min(e.target.value, 10), 1);
                                    else nodeCount.output = "";
                                    setNodeCount({...nodeCount});
                                }} required type="number" min="1" max="10" placeholder="Enter amount of nodes" value={nodeCount.output}/>
                            </td>
                        </tr>
                    </tbody>
                </Table>

                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        </div>
    </div>
}