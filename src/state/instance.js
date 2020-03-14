import request from './request'

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case "instance/posted":
            state[action.instance._id] = action.instance;
            return {...state};
        case "instance/patched":
            state[action.instance._id] = action.instance;
            return {...state};
        case "instance/fetched":
            state = {};
            for(const instance of action.instances) state[instance._id] = instance;
            return state;
        case 'instance/deleted':
            delete state[action.instanceID];
            return {...state};
        default:
            return state;
    }
}

export const fetch = (dispatch) => {
    request("GET", "/instances").then((res) => {
        dispatch({
            type : "instance/fetched",
            instances : res.instances
        });
    });
}

export const post = (dispatch, data) => {
    request("POST", "/instances", {data}).then((res) => {
        dispatch({
            type : "instance/posted",
            instance : res.instance
        });
    });
}

export const patch = (dispatch, id, data) => {
    request("PATCH", `/instances/${id}`, {data}).then((res) => {
        dispatch({
            type : "instance/patched",
            instance : res.instance
        });
    });
}

export const deleteInstance = (dispatch, id) => {
    request("DELETE", `/instances/${id}`).then(() => {
        dispatch({
            type : "instance/deleted",
            instanceID : id
        });
    });
}