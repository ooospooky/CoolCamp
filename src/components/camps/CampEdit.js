import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

import {fetchCamp,editCamp} from '../../action'
import CampForm from './CampForm'

class CampEdit extends React.Component{
    componentDidMount(){
        this.props.fetchCamp(this.props.match.params.id);
    }
    renderSubmit=(formValue)=>{
            this.props.editCamp(this.props.match.params.id,formValue)
    }
    renderButton=()=>{
        return(
            
                <button className="ui button primary mt-2" type="submit">Edit</button>
            
        )
    }
   render(){
       if(!this.props.camp) return <div>Loading</div>
       console.log(this.props.camp)
       return(
           <div>
               <h3>Edit your camp</h3>
               < CampForm onSubmit={this.renderSubmit} renderButton={this.renderButton} initialValues={{title:this.props.camp.title,description:this.props.camp.description,location:this.props.camp.location,locationTag:this.props.camp.locationTag,advantageTag:this.props.camp.advantageTag}}/>
           </div>
       )
   } 
}

const mapStateToProps=(state,ownProps)=>{
    
    // console.log('***',state)
    return{
    camp : state.camps[ownProps.match.params.id]
    }
}
export default connect(mapStateToProps,{fetchCamp,editCamp})(CampEdit) ;