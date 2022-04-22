import React from 'react'
import { connect } from 'react-redux';
import Rating from 'react-rating'
import { deleteComment } from '../../action'
import './CommentList.css'
class CommentList extends React.Component {
    calldeleteComment=(commentId,campId)=>{
        deleteComment(commentId,campId)
    }
    renderDeleteButton(){
        if(!this.props.authId) return;
        if(this.props.authId.fX === this.props.commentAuthorId){
            return(
                <button class="closeBtn" onClick={()=>{this.calldeleteComment(this.props.commentId,this.props.campId)}} >X</button>
            )
        }
    }
    render() {
        return (
            <div class="ui comments ">
                <div class="comment">
                    <a class="avatar">
                        <img src={this.props.img || null}/>
                    </a>
                    <div  class="content">
                        {this.renderDeleteButton()}
                        {/* <button class="closeBtn" onClick={()=>{this.calldeleteComment(this.props.commentId,this.props.campId)}} >X</button> */}
                        <a class="author">{this.props.author}</a>
                        <div class="metadata">
                            <div class="date">1 天前</div>
                            <div class="rating">
                            <Rating readonly initialRating={this.props.rating} style={{"color":"black"}} emptySymbol="fa-sm far fa-star" fullSymbol="fa-sm fa fa-star" />
                            </div>
                        </div>
                        <div class="text">
                            {this.props.comment}
                        </div>
                    </div>
                </div>
            </div>



        )
    }
}
const mapStoreToProps = (state, ownProps) => {
    console.log()
    return {
        camps: Object.values(state.camps),
        authId: state.auth.userProfile,
        isSignedIn: state.auth.isSignedIn
    }
}
export default connect(mapStoreToProps, { deleteComment})(CommentList);
// export default CommentList