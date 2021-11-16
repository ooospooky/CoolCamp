import { formValues } from 'redux-form'
import camps from '../apis/camps'
import history from '../history'

import { FETCH_CAMP, FETCH_CAMPS, CREATE_CAMP, EDIT_CAMP, DELETE_CAMP } from './type'


export const signIn = (userProfile) => {
    return {
        type: "SIGN_IN",
        payload: userProfile
    }
}
export const signOut = () => {
    return {
        type: "SIGN_OUT"
    }
}

export const fetchCamps = () => async dispath => {
    const response = await camps.get('/camp')
    dispath({ type: FETCH_CAMPS, payload: response.data })
    // console.log('test for action')
}
export const createCamp = (formValue) => async (dispath, getState) => {
    // console.log(getState().auth.userProfile.sT)
    // ax:{
    // HU: "梓育"
    // Re: "戴梓育"
    // Tt: "bm414148@gmail.com"
    // YS: "戴"
    // lK: "https://lh3.googleusercontent.com/a/AATXAJyeo5WlQcrG0ney-JAPGrMjZ8o0MkEU8-vWqbJY=s96-c"
    // sT: "114821509260256156621"
    // }
    const userId = getState().auth.userProfile.uT
    console.log('userId',userId)
    const response = await camps.post('/camp', { ...formValue,userId,"comment":[]})
    console.log('response',response)    
    dispath({ type: CREATE_CAMP, payload: response.data })
    history.push('/')
}

export const fetchCamp = (id) => async dispath => {
    const response = await camps.get(`/camp/${id}`)
    dispath({ type: FETCH_CAMP, payload: response.data })
}
export const editCamp = (id, formValue) => async dispath => {
    const response = await camps.patch(`/camp/${id}`, formValue)
    dispath({ type: EDIT_CAMP, payload: response.data })
    history.push('/')
}
export const deleteCamp = (id) => async dispath => {
    await camps.delete(`/camp/${id}`);
    dispath({ type: DELETE_CAMP, payload: id });
    history.push('/')
}
export const createComment =(campId,commentValue)=>async dispath=>{
    const campData = await camps.get(`/camp/${campId}`)
    console.log('before push',campData.data.comment)
    if(!campData.data.comment){
        campData.data.comment = commentValue
    }else{
        campData.data.comment.push(commentValue)
    }
    // campData.data.comment.push(commentValue)
    // console.log('after push',campData.data.comment)
    const response = await camps.patch(`/camp/${campId}`,{"comment":campData.data.comment})
    // dispath({ type:"CREATE_COMMENT",payload:response.data})
    // const response = await camps.get(`camp/${campId}`)
    // console.log('work',response)
    // history.push(`/camp/${campId}`)
    // history.go(0)
    window.location.reload()
}