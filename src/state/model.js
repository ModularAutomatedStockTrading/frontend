import request from './request'

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case "model/posted":
            state[action.model._id] = action.model;
            return {...state};
        case "model/patched":
            state[action.model._id] = action.model;
            return {...state};
        case "model/fetched":
            state = {};
            for(const model of action.models) state[model._id] = model;
            return state;
        case 'model/deleted':
            delete state[action.modelID];
            return {...state};
        default:
            return state;
    }
}

export const fetch = (dispatch) => {
    request("GET", "/models").then((res) => {
        dispatch({
            type : "model/fetched",
            models : res.models
        });
    });
}

export const post = (dispatch, data) => {
    request("POST", "/models", {model : data}).then((res) => {
        dispatch({
            type : "model/posted",
            model : res.model
        });
    });
}

export const patch = (dispatch, id, data) => {
    request("PATCH", `/models/${id}`, {data}).then((res) => {
        dispatch({
            type : "model/patched",
            model : res.model
        });
    });
}

export const deleteModel = (dispatch, id) => {
    request("DELETE", `/models/${id}`).then(() => {
        dispatch({
            type : "model/deleted",
            modelID : id
        });
    });
}