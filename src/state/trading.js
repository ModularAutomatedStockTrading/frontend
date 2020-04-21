import request from './request'

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case "trading/gotModelInputs":
            return {
                ...state,
                modelInputs : action.inputs
            }
        case "trading/gotModelOutputs":
            return {
                ...state,
                modelOutputs : action.outputs
            }
        default:
            return state;
    }
}

export const fetchModelInputs = (dispatch) => {
    request("GET", "/trading-api/inputs").then((res) => {
        dispatch({
            type : "trading/gotModelInputs",
            inputs : res.inputs
        });
    });
}

export const fetchModelOutputs = (dispatch) => {
    request("GET", "/trading-api/outputs").then((res) => {
        dispatch({
            type : "trading/gotModelOutputs",
            outputs : res.outputs
        });
    });
}