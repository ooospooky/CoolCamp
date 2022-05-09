import { formValues } from 'redux-form'
import camps from '../apis/camps'
import history from '../history'
import {useState,useEffect} from 'react'

import { FETCH_CAMP, FETCH_CAMPS, CREATE_CAMP, EDIT_CAMP, DELETE_CAMP } from './type'

import {db} from '../firebase-config'
import  {collection, getDocs,setDoc, getDoc, addDoc, updateDoc, deleteDoc, doc} from 'firebase/firestore';


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
const campCollectionRef = collection(db,'camp')
export const fetchCamps = () => async dispath => {
    const data = await getDocs(campCollectionRef);
    const response =  data.docs.map((doc)=> ({...doc.data(),id:doc.id}));
    // const response = await camps.get('/camp')
    dispath({ type: FETCH_CAMPS, payload: response })
    // console.log('test for action')
}
export const createCamp = (formValue,imageData) => async (dispath, getState) => {
    // console.log(getState().auth.userProfile.sT)
    // ax:{
    // HU: "梓育"
    // Re: "戴梓育"
    // Tt: "bm414148@gmail.com"
    // YS: "戴"
    // lK: "https://lh3.googleusercontent.com/a/AATXAJyeo5WlQcrG0ney-JAPGrMjZ8o0MkEU8-vWqbJY=s96-c"
    // sT: "114821509260256156621"
    // }
    let campId= ''
    const userId = getState().auth.userProfile.fX
    // const response = await camps.post('/camp', { ...formValue,userId,"comment":[]})
    await addDoc(campCollectionRef, { ...formValue,userId,"comment":[],"imageData":imageData})
    .then((e)=>{
        campId = e.id
    })
    await setDoc(doc(db,'camp',campId),{id:campId},{ merge: true })
    const response = await getDoc(doc(db,"camp",campId))
    console.log('response!!!!!!!!',response.data())
    // console.log('FormValue',{ ...formValue,userId})
    
    dispath({ type: CREATE_CAMP, payload: response.data() })
    history.push('/')
}

export const fetchCamp = (id) => async dispath => {
    const response = await getDoc(doc(db,"camp",id))
    console.log('response',response.data().id,'id:',response.id)
    // console.log('fetchcamp',response.data())
    // const response = await camps.get(`/camp/${id}`)
    dispath({ type: FETCH_CAMP, payload: response.data()})
    // console.log('dispath done!')
}       

//PUT 通常做替換一個資源功能。
//PATCH 修改資源的部分內容。
export const editCamp = (id, formValue,imageData) => async dispath => {
    const campDoc = doc(db,'camp',id);
     await updateDoc(campDoc, formValue);
     await updateDoc(campDoc, {"imageData":imageData});
    //  console.log('form',formValue)
     const response = await getDoc(doc(db,"camp",id))
    // const response = await camps.patch(`/camp/${id}`, formValue)
    dispath({ type: EDIT_CAMP, payload: response.data() })
    history.push('/')
}
export const deleteCamp = (id) => async dispath => {
    // await camps.delete(`/camp/${id}`);
    const campDoc = doc(db,"camp",id);
    await deleteDoc(campDoc);
    dispath({ type: DELETE_CAMP, payload: id });
    history.push('/')
}
export const createComment =(campId,commentValue)=>async dispath=>{
    const campData = await getDoc(doc(db,"camp",campId)) //get camp value
   
    // const campData = await camp get(`/camp/${campId}`) //old way
    let newCampData =campData.data()
    newCampData.comment.push(commentValue);
    console.log('commentdata',newCampData)
    const campDoc = doc(db,"camp",campId);
    // console.log('campDoC',campDoc);
    await updateDoc(campDoc, JSON.parse(JSON.stringify(newCampData)) );
    console.log('it work')
   
    history.push('/')   
    history.push(`/camp/${campId}`)
    // window.location.reload()
}

export const deleteComment =async(commentId,campId)=>{
    const campData = await getDoc(doc(db,"camp",campId));
    let newCampData =campData.data()
    let commentList = newCampData.comment
    let commentIndex = commentList.indexOf( commentList.find(element => element.id===commentId) )
    newCampData.comment.splice(commentIndex,1)
    const campDoc = doc(db,"camp",campId);
    await updateDoc(campDoc, JSON.parse(JSON.stringify(newCampData)) );
    history.push('/')   
    history.push(`/camp/${campId}`)
    
}