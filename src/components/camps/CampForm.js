import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form'
import { createCamp } from '../../action'
import Dropzone from "react-dropzone";

// import fetch from 'node-fetch';
import DropdownList from "react-widgets/DropdownList";
import axios from 'axios'
import camps from '../../apis/camps'

class CampCreate extends React.Component {


    renderSubmit = (formValue) => {
        this.props.onSubmit(formValue)
    }
    renderError({ meta }) {
        if (meta.error && meta.touched) {
            return (
                <div className="ui error message">
                    <p>{meta.error}</p>
                </div>
            )
        }
    }
    renderInput = (formValues) => {
        // console.log('value', formValues)
        return (
            <div>
                <label>{formValues.label}</label>
                <input type={formValues.type} {...formValues.input} />

                {this.renderError(formValues)}
            </div>
        )
    }
    render() {

        return (
            <div>
                {/* <img src=   alt="" width="100" /> */}

                <form encType="multipart/form-data" className="ui form error" onSubmit={this.props.handleSubmit(this.renderSubmit)}>
                    <Field name="title" component={this.renderInput} type="text" label="Enter Title" />
                    <Field name="description" label="Enter Description" component={this.renderInput} type="text" />
                    {this.props.renderButton()}
                    {/* <button className="ui floated button primary mt-2" type="submit">Create</button> */}
                </form>

            </div>
        )
    }
}

const validate = formValues => {
    const errors = {}
    if (!formValues.title) errors.title = "You must Enter Title"
    if (!formValues.description) errors.description = "You must Enter a  Description"
    if (!formValues.location) errors.location = "Need to Enter a Location"
    return errors
}

const ReduxForm = reduxForm({
    form: 'campCreate',
    validate
})(CampCreate);



export default connect(null, { createCamp })(ReduxForm)