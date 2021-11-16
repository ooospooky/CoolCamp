import { combineReducers } from "redux";
import campReducers from './campReducers'
import authReducers from './authReducers'
import {reducer as formReducer} from 'redux-form'
export default combineReducers({
    camps: campReducers,
    auth : authReducers,
    form : formReducer,

})