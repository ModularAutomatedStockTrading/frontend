import request from './request'

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case "ATE/posted":
            state[action.ATE._id] = action.ATE;
            return {...state};
        case "ATE/patched":
            state[action.ATE._id] = action.ATE;
            return {...state};
        case "ATE/fetched":
            state = {};
            for(const ATE of action.ATEs) state[ATE._id] = ATE;
            return state;
        case 'ATE/deleted':
            delete state[action.ATEID];
            return {...state};
        default:
            return state;
    }
}

export const fetch = (dispatch) => {
    request("GET", "/ates").then((res) => {
        dispatch({
            type : "ATE/fetched",
            ATEs : res.ATEs
        });
    });
}

export const post = (dispatch, data) => {
    request("POST", "/ates", {data}).then((res) => {
        dispatch({
            type : "ATE/posted",
            ATE : res.ATE
        });
    });
}

export const patch = (dispatch, id, data) => {
    request("PATCH", `/ATEs/${id}`, {data}).then((res) => {
        dispatch({
            type : "ATE/patched",
            ATE : res.ATE
        });
    });
}

export const deleteATE = (dispatch, id) => {
    request("DELETE", `/ATE/${id}`).then(() => {
        dispatch({
            type : "ATE/deleted",
            ATEID : id
        });
    });
}
