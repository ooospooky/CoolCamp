import React from 'react'
import Rating from 'react-rating'
class CommentList extends React.Component {
    render() {
        return (
            <div class="ui comments ">
                <div class="comment">
                    <a class="avatar">
                        <img src={this.props.img || null}/>
                    </a>
                    <div class="content">
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

export default CommentList