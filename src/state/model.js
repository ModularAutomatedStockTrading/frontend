import request from './request'

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case "posted":
            state[action.model._id] = action.model;
            return {...state};
        case "patched":
            state[action.model._id] = action.model;
            return {...state};
        case "fetched":
            state = {};
            for(const model of action.models) state[model._id] = model;
            return state;
        default:
            return state;
    }
}

export const fetch = (dispatch) => {
    request("GET", "/models").then((res) => {
        dispatch({
            type : "fetched",
            models : res.models
        });
    });
}

export const post = (dispatch, data) => {
    request("POST", "/models", {model : data}).then((res) => {
        dispatch({
            type : "posted",
            model : res.model
        });
    });
}

export const patch = (dispatch, id, data) => {
    request("PATCH", `/models/${id}`, {data}).then((res) => {
        dispatch({
            type : "patched",
            model : res.model
        });
    });
}