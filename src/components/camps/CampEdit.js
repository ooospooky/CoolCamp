import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

import {fetchCamp,editCamp} from '../../action'
import CampForm from './CampForm'

import {storage} from '../../firebase-config'
import {ref,uploadBytes,listAll, list, getDownloadURL, deleteObject} from 'firebase/storage'
import {v4} from 'uuid'
import './CampEdit.css'

class CampEdit extends React.Component{
    state = {newData:this.props.camp.imageData,
        imageUpload:null,
        imageData:[] };
    componentDidMount(){
        this.props.fetchCamp(this.props.match.params.id);
    }
    renderSubmit=(formValue)=>{
            this.props.editCamp(this.props.match.params.id,formValue,this.state.newData)
    }
    renderButton=()=>{
        return  <button className="ui button primary mt-2" type="submit">修改</button>
    }
    deleteImage=(data,index)=>{
        let temp = this.state.newData   //create temp because we need to splice imageData
        const desertRef = ref(storage, `images/${data['name']}`);
        deleteObject(desertRef).then(() => {
            temp.splice(index,1)       //delete that index data
            this.setState({newData:temp})  //newData = temp after delete data
            alert('Deleted')
        })
    }
    dispalyPreImage=()=>{
        console.log('!!!',this.props.camp.imageData)
        return this.props.camp.imageData.map((data,index)=>{
            return (
                <figure className="picture-box">
                    <img src={data['url']} style={{height:'150px',width:'150px'}} className="display-img"></img>
                    <a onClick={()=>{this.deleteImage(data,index)}}  className="display-closeBtn"><span>X</span></a>
                </figure>
            )
        })
    }
    uploadFile=()=>{
        if (this.state.imageUpload == null) return;
        this.setState({imageData:[]}) //to prevent user click upload two time, it will clean first upload data
        for(let i =0;i<this.state.imageUpload.length;i++){   //loop time depend on how many file user chose
            const imageRef = ref(storage, `images/${this.state.imageUpload[i].name + v4()}`);
            uploadBytes(imageRef, this.state.imageUpload[i]).then((snapshot) => {
                alert('Uploaded')
                getDownloadURL(snapshot.ref).then((url) => {
                    this.setState({imageData:[...this.state.imageData,{"name":snapshot.ref.name,"url":url}  ]})
                    // console.log('data before concat',this.state.imageData)
                    if(i===this.state.imageUpload.length-1){  //when last time, we concat
                        this.setState({newData:[...this.state.newData,...this.state.imageData]})   
                        // console.log('after concat',this.state.newData)
                    }
                });
            });
         }
    }
   render(){
       if(!this.props.camp) return <div>Loading</div>
       return(
           <div>
               <h3 className="mt-1">修改露營地</h3>
               <input
                    type="file"
                    multiple
                    onChange={(event) => {
                    this.setState({imageUpload:event.target.files});
                    }}
                />
                <button onClick={this.uploadFile}> Upload Image</button>

               <div className="image-container">
                {this.dispalyPreImage()}
               </div>
               < CampForm onSubmit={this.renderSubmit} renderButton={this.renderButton} initialValues={{title:this.props.camp.title,description:this.props.camp.description,location:this.props.camp.location,locationTag:this.props.camp.locationTag,advantageTag:this.props.camp.advantageTag,notes:this.props.camp.notes}}/>
           </div>
       )
   } 
}

const mapStateToProps=(state,ownProps)=>{
    return{
    camp : state.camps[ownProps.match.params.id]
    }
}
export default connect(mapStateToProps,{fetchCamp,editCamp})(CampEdit) ;