import request from 'request'
const initialState = {};
export default (state = initialState, action) => {
    switch (action.type) {
        case "posted":
            state[action.model.id] = action.model;
            return state;
        default:
            return state;
    }
}

export const post = (dispatch, data) => {
    request("model/post", data).then((res) => {
        dispatch({
            type : "posted",
            model : res.model
        });
    });
}