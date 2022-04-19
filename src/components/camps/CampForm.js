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
        // console.log(this.props.publicId)
        return (
            <div>
                {/* <img src=   alt="" width="100" /> */}
                <h1>{this.props.publicId}</h1>
                <form encType="multipart/form-data" className="ui form error" onSubmit={this.props.handleSubmit(this.renderSubmit)}>
                    <Field name="title" component={this.renderInput} type="text" label="營地名稱 :" />
                    <Field name="description" label="營地描述 :" component={this.renderInput} type="text" />
                    <Field name="location" label="營地位置 :" component={this.renderInput} type="text" />
                    {/* <Field name="files" component={renderDropzoneInput} /> */}
                    {/* <input type="file" name="image" multiple /> */}
                    {/* <Field name="image" component="" /> */}
                    {/* <FileInput /> */}
                    {/* <Field name="image" component={FileInput} />  */}
                    <div>
                        <label>營地須知 :</label>
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
                        {/* <label>Select Location Tag</label> */}
                        <label>營地的位置標籤 :</label>
                        <div>
                            <Field name="locationTag" component="select">
                                <option></option>
                                <option value="北部">北部</option>
                                <option value="南部">南部</option>
                                <option value="東部">東部</option>
                                <option value="中部">中部</option>
                            </Field>
                        </div>
                    </div>
                    <div>
                        {/* <label>Choose Advantage Tag </label> */}
                        <label> 選擇營地具備的優勢 : </label>
                        <div>
                            <Field name="advantageTag" component="select">
                                <option></option>
                                <option value="景觀">景觀</option>
                                <option value="湖畔">湖畔</option>
                                <option value="小溪/河流">小溪/河流</option>
                                <option value="登山">登山</option>
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