import React, { useState } from "react";
import Axios from 'axios';
import { Image } from 'cloudinary-react'
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form'
import { createCamp } from '../../action'
import CampForm from './CampForm'
class CampCreate extends React.Component {
    state = { imageSelected: '', res: false,imageId :""}
    // const [res,setRes] = useState(false);
    // const [imageSelected,setImageSelected] = useState('');
    // uploadImage = () => {
    //     const formData = new FormData();
    //     formData.append('file', this.state.imageSelected)
    //     formData.append('upload_preset', "nhkhoxdr")
    //     Axios.post(
    //         "https://api.cloudinary.com/v1_1/dsmgwkxbl/image/upload",
    //         formData
    //     ).then((response) => {
    //         console.log(response)
    //         this.setState({res : true,imageId : response.data.public_id})
    //     })
    // }
    response = () => {
        if (this.state.res) {
            return (
                <a>Done!</a>
            )
        }
    }
    renderSubmit = (formValue) => {
        console.log('create',formValue)
        this.props.createCamp(formValue)
    }
    renderButton = () => {
        return (
            <button className="ui primary button mt-2 " >create</button>
        )
    }
    render() {

        return (
            <div >
                {/* <h3>Create new Camp!</h3>
                <div>
                    <input type="file" onChange={(event) => {
                        this.setState({imageSelected: event.target.files[0] })
                    }}></input>
                    Hey
                    <button onClick={this.uploadImage}>Upload Image</button> {this.response()}
                </div> */}
                <h3 className="mt-1">新增露營地</h3>
                <CampForm publicId={this.state.imageId} onSubmit={this.renderSubmit} renderButton={this.renderButton} />
            </div>
        )
    }
}





export default connect(null, { createCamp })(CampCreate)