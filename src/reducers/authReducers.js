
const INITAL_STATE={
    isSignedIn:null,
    userProfile:null
}

export default (state=INITAL_STATE,action)=>{
    switch (action.type){
        case "SIGN_IN":
            return {...INITAL_STATE,isSignedIn:true,userProfile:action.payload}
        case "SIGN_OUT":
            return {...INITAL_STATE,isSignedIn:false,userId:null}
        default:
            return state
    }
}