import model from './model'
import modelTemplate from './modelTemplate'
import trading from './trading'
import {combineReducers} from 'redux'
export default combineReducers({
    model,
    modelTemplate,
    trading
});