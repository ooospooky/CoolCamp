import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form'
import {createCamp} from '../../action'
import CampForm from './CampForm'
class CampCreate extends React.Component {
    renderSubmit=(formValue)=>{
        // console.log('create',formValue)
        this.props.createCamp(formValue)
    }
    renderButton=()=>{
        return(
            <button className="ui primary button mt-2 " >Create</button>
        )
    }
    render() {
        
        return (
            <div >
                <h3>Create new Camp!</h3>
                <CampForm onSubmit={this.renderSubmit}  renderButton={this.renderButton}/>
            </div>
        )
    }
}





export default connect(null,{createCamp})(CampCreate)