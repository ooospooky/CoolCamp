import React from 'react'
import { connect } from 'react-redux'
import { signOut, signIn } from './action'

// class GoogleAuth extends React.Component{
//     state={isSignedIn:null}
//     componentDidMount(){
//         window.gapi.load('client:auth2',()=>{
//             window.gapi.client.init({
//                 clientId:"676970711437-fjp6gum28euqqr6op7ekejp4jehuaqlf.apps.googleusercontent.com",
//                 scope:'email'
//             }).then(()=>{
//                 this.auth = window.gapi.auth2.getAuthInstance();
//                 this.setState({isSignedIn:this.auth.isSignedIn.get()})
//             })
//         })
//     }
//     renderAuthButton() {
//         if(this.state.isSignedIn===null){
//             return <div>don't know if we are signed in</div>
//         }else if(this.state.isSignedIn){
//             return <div>Sign in!</div>
//         }else{
//             return <div>Not Sign in</div> 
//         }
//     }
//     render(){
//         return (
//             <div>
//             {this.renderAuthButton()}
//             </div>
//         )
//     }

// }

// export default GoogleAuth




class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                prompt:"select_account consent",
                clientId: '953062219511-qs117gs9el7orekbg1nhg2b1d4dse6fc.apps.googleusercontent.com',
                scope: "profile"
            }).then(() => {
                console.log('!!!!!',window.gapi.auth2.getAuthInstance())
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)

        

            })
        })
    }
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getBasicProfile())
        } else {
            this.props.signOut()
        }

        // this.setState({isSignedIn:this.auth.isSignedIn.get()})

    }
    onSignInClick = () => {
        this.auth.signIn()

    }
    onSignOutClick = () => {
        this.auth.signOut()
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null
        } else if (this.props.isSignedIn) {
            return (
                
                <button className="ui google plus  button" onClick={this.onSignOutClick}>
                    <i className="google icon"></i>
                    登出
                    {/* Sign Out */}
                </button>
                
                

            )
        } else {
            return (
                <button className="ui google plus button" onClick={this.onSignInClick}>
                    <i className="google icon"></i>
                    登入
                </button>
            )
        }
    }
    render() {
        console.log(this.props.auth)
        return (
            <div className="right menu">
                {this.renderAuthButton()}   
                {this.props.isSignedIn? <img class="ui mini circular image" src={this.props.auth.NN}></img>: null}
            </div>
            
        )
    }
}

const mapStateToStore = (state) => {
    return { 
        isSignedIn: state.auth.isSignedIn ,
        auth :state.auth.userProfile
    }
}

export default connect(mapStateToStore, { signIn, signOut })(GoogleAuth)