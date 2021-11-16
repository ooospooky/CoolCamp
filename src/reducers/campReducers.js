import _ from 'lodash'

import { FETCH_CAMP,FETCH_CAMPS,CREATE_CAMP,DELETE_CAMP,EDIT_CAMP} from '../action/type';

export default (state={},action)=>{
    switch(action.type){
        case FETCH_CAMPS:
            return {...state,..._.mapKeys(action.payload,'id')};
        case CREATE_CAMP:
            return {...state,[action.payload.id]:action.payload}
        case FETCH_CAMP:
            return {...state,[action.payload.id]:action.payload}
        case EDIT_CAMP:
            return {...state,[action.payload.id]:action.payload}
        case DELETE_CAMP:
            return _.omit(state,action.payload)
        case "CREATE_COMMENT":
            return {...state,[action.payload.id.comment]:action.payload.comment}
        default:
            return state
    }
}