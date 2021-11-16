import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form'
import { createCamp } from '../../action'
import Dropzone from "react-dropzone";
import { FileInput } from "./FileInput";
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
                    <Field name="location" label="Enter Location" component={this.renderInput} type="text" />
                    {/* <Field name="files" component={renderDropzoneInput} /> */}
                    {/* <input type="file" name="image" multiple /> */}
                    {/* <Field name="image" component="" /> */}
                    {/* <FileInput /> */}
                    {/* <Field name="image" component={FileInput} />  */}
                    <div>
                        <label>Notes</label>
                        <div>
                            <Field name="notes" component="textarea" />
                        </div>
                    </div>

                    {/* <label>Select Location Tag</label>

                    <div>
                        <label><Field name="loaction" component="input" type="radio" value="" /> I don't need tag </label> &nbsp;
                        <label><Field name="loaction" component="input" type="radio" value="north" /> North</label>&nbsp;
                        <label><Field name="loaction" component="input" type="radio" value="south" /> South</label>&nbsp;
                        <label><Field name="loaction" component="input" type="radio" value="east" /> East</label>&nbsp;
                        <label><Field name="loaction" component="input" type="radio" value="west" /> West</label>
                    </div>
                    <label>Choose Advantage Tag</label>
                    <div>
                        <label><Field name="advantage" component="input" type="radio" value="" /> I don't need tag </label> &nbsp;
                        <label><Field name="advantage" component="input" type="radio" value="view" /> North</label>&nbsp;
                        <label><Field name="advantage" component="input" type="radio" value="" /> South</label>&nbsp;
                        <label><Field name="advantage" component="input" type="radio" value="east" /> East</label>&nbsp;
                        <label><Field name="advantage" component="input" type="text" value="west" /></label>
                    </div> */}


                    <div>
                        <label>Select Location Tag</label>
                        <div>
                            <Field name="locationTag" component="select">
                                <option></option>
                                <option value="North">North</option>
                                <option value="South">South</option>
                                <option value="East">East</option>
                                <option value="West">West</option>
                            </Field>
                        </div>
                    </div>
                    <div>
                        <label>Choose Advantage Tag </label>
                        <div>
                            <Field name="advantageTag" component="select">
                                <option></option>
                                <option value="View">View</option>
                                <option value="Lake">Lake</option>
                                <option value="Stream">Stream</option>
                                <option value="Hiking">Hiking</option>
                            </Field>
                        </div>
                    </div>


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