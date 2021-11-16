import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import _ from 'lodash'
import { createComment } from '../../action'
import { v4 as uuidv4 } from 'uuid';
import Rating from 'react-rating'
class CommentCreate extends React.Component {
    renderSubmit = (value) => {
        console.log(this.props)
        // console.log('submit', value)
        const commentId = uuidv4()
        const Tvalue = value
        const formValue = { ...Tvalue, id: commentId, author: this.props.author.Re,img:this.props.author.oK}
        // console.log(value.push({aurthId:"11231"}))
        // console.log(formValue)
        this.props.createComment(this.props.campId, formValue)
    }   
    changeRate(name, value) {
        this.props.change(name, value) // function provided by redux-form
    }
    render() {
        if(!this.props.isSignedIn) return(<div style={{textAlign:'center'}}><h3>Login and Leave comment!</h3></div>)
        return (
            <div>
                <form className="ui form" onSubmit={this.props.handleSubmit(this.renderSubmit)} >
                    <div style={{textAlign:"center"}}>
                    <label id="comment"><h2  className="">Leave a comment!</h2></label>
                    </div>
                    <br />
                    <label id="rating" >Total Star:</label>
                    <Rating   emptySymbol="fa-2x far fa-star" fullSymbol="fa-2x fa fa-star" onChange={(value) => { this.changeRate("rating", value) } } />
                    <Field name="rating" type="hidden" component="input" />
                    <br />
                    <label id="veiwrating" >View:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;</label>
                    <Rating   emptySymbol="fa-2x far fa-star" fullSymbol="fa-2x fa fa-star"    onChange={(value) => { this.changeRate("viewrating", value) } } />
                    <Field name="viewrating" type="hidden" component="input" />
                    <br/>
                    <label id="bathroomrating" >Bathroom:</label>
                    <Rating   emptySymbol="fa-2x far fa-star" fullSymbol="fa-2x fa fa-star"    onChange={(value) => { this.changeRate("bathroomrating", value) } } />
                    <Field name="bathroom" type="hidden" component="input" />
                    <Field name="comment" component="textarea" type="textarea"></Field>
                    <button className="ui primary button m-2" type="submit" >Comment</button>
                </form>
            </div>
            
        )
    }
}

const ReduxForm = reduxForm({
    form: 'CommentCreate'
})(CommentCreate);

// const mapStateToProps = (state,ownProps) =>{
//     // console.log(state.camps[ownProps.match.params.id])
//     console.log(ownProps)
//     return {
//         // camp : state.camps[ownProps.match.params.id]
//     }
// }

export default connect(null, { createComment })(ReduxForm);