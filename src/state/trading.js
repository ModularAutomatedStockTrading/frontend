import request from './request'

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case "trading/gotModelInputs":
            return {
                modelInputs : action.inputs
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