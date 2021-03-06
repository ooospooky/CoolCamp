import React, { useState } from "react";
import Axios from 'axios';
import { Image } from 'cloudinary-react'
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form'
import { createCamp } from '../../action'
import CampForm from './CampForm'

import {storage} from '../../firebase-config'
import {ref,uploadBytes,listAll, list, getDownloadURL, deleteObject} from 'firebase/storage'
import {v4} from 'uuid'

class CampCreate extends React.Component {
    state = { 
        uploadImage:'',
        imageUpload:null,
        imageUrls: [],
        imageData:[]   //name & url
            }
   

    response = () => {
        if (this.state.res) {
            return (
                <a>Done!</a>
            )
        }
    }
    renderSubmit = (formValue) => {
        console.log('create',formValue)
        this.props.createCamp(formValue,this.state.imageData)
    }
    renderButton = () => {
        return (
            <button className="ui primary button mt-2 " >create</button>
        )
    }
    uploadFile=()=>{
        this.setState({uploadImage:"Uploading"})
        if (this.state.imageUpload == null) return;
        this.setState({imageData:[]}) //to prevent user click upload two time, it will clean first upload data
        for(let i =0;i<this.state.imageUpload.length;i++){   //loop time depend on how many file user chose
            const imageRef = ref(storage, `images/${this.state.imageUpload[i].name + v4()}`);
            uploadBytes(imageRef, this.state.imageUpload[i]).then((snapshot) => {
                
                getDownloadURL(snapshot.ref).then((url) => {
                    // setImageUrls((prev) => [...prev, url]);
                    // this.setState({imageData:[...this.state.imageData,[snapshot.ref.name,url]]}) //firebase don't support nested array
                    this.setState({imageData:[...this.state.imageData,{"name":snapshot.ref.name,"url":url}  ]})
                    console.log('data',this.state.imageData)
                    if(i===this.state.imageUpload.length -1){
                        alert('Uploaded')
                        this.setState({uploadImage:"Done!"})
                    }
                });
            });
         }   
    }
   
    render() {
        return (
            <div >
                <h3 className="mt-1">???????????????</h3>
                <input
                    type="file"
                    multiple
                    onChange={(event) => {
                    this.setState({imageUpload:event.target.files});
                    }}
                />
                <button onClick={this.uploadFile}> Upload Image</button>
                <span>{this.state.uploadImage}</span>
                {/* <button onClick={this.deleteFile}> Delete Image</button> */}
                <CampForm publicId={this.state.imageId} onSubmit={this.renderSubmit} renderButton={this.renderButton} />
            </div>
        )
    }
}

export default connect(null, { createCamp })(CampCreate)