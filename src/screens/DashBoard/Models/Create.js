import React, {useState} from 'react';
import {Form, Button, Table} from 'react-bootstrap'
import InputOptions from 'components/InputOptions'
export default function Create(props){
    const [amountOfHiddenLayers, setAmountOfHiddenLayers] = useState(null);
    const [nodeCount, setNodeCount] = useState({
        input : 1,
        output : 1
    });
    const [inputs, setInputs] = useState({});
    return <div style={{
        width : "100%",
        height : "100%",
        overflow : ""
    }}>
        <div style={{
            width : "fit-content",
            minWidth : "40%",
            textAlign : "center",
            margin : "5vh auto"
        }}>
            <p style={{fontSize : "2rem"}}>Create model</p>
            <Form onSubmit={(e) => {
                // clear nodeCount and inputs
                e.preventDefault();
            }}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control required placeholder="Enter name" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Description" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Amount of hidden layers</Form.Label>
                    <Form.Control onChange={(e) => {
                        if(e.target.value != "") setAmountOfHiddenLayers(Math.min(e.target.value, 100));
                        else setAmountOfHiddenLayers(null);
                    }} type="number" required min="0" max="100" placeholder="Enter amount of hidden layers" value={amountOfHiddenLayers != null ? amountOfHiddenLayers : ""}/>
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
                                    if(e.target.value != "") nodeCount.input = Math.max(Math.min(e.target.value, 50), 1);
                                    else nodeCount.input = "";
                                    setNodeCount({...nodeCount});
                                }} required type="number" min="1" max="50" placeholder="Enter amount of nodes" value={nodeCount.input}/>
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
                                    if(e.target.value != "") nodeCount.output = Math.max(Math.min(e.target.value, 50), 1);
                                    else nodeCount.output = "";
                                    setNodeCount({...nodeCount});
                                }} required type="number" min="1" max="50" placeholder="Enter amount of nodes" value={nodeCount.output}/>
                            </td>
                        </tr>
                    </tbody>
                </Table>

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
                                                {inputs[i] ? inputs[i] : "choose input"}
                                                <InputOptions onPick={(val) => {
                                                    inputs[i] = val;
                                                    setInputs(inputs);
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

                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        </div>
    </div>
}