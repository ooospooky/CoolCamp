import React from 'react'
import { connect } from 'react-redux';
import { fetchCamps } from '../../action'
import { Link } from 'react-router-dom'
import history from '../../history'
import './CampList.css'
class CampList extends React.Component {

    state = { where: 'all' }
    componentDidMount() {
        this.props.fetchCamps()
    }
    limitDescription(description) {
        let str = ""
        let len = description.length
        if (len > 200) {
            str = description.substring(0, 200) + '.......and more'
            return str
        } else {
            return description
        }

    }
    renderButton(camp) {

        return (
            <div>
                <Link className="ui mini right floated negative button" to={`/camp/delete/${camp.id}`}>Delete</Link>
                <Link className="ui mini right floated grey button " to={`/camp/edit/${camp.id}`}> Edit </Link>
                <Link className="ui mini right floated primary button" to={`/camp/${camp.id}`}>View</Link>

            </div>
        )
    }
    renderList(opt) {
        return this.props.camps.map(camp => {
            if (camp.locationTag === opt || opt === 'all')
                return (
                    <div class="card">
                        <div className="image image-box">
                        </div>
                        <div class="content">
                            <div class="header title"><Link style={{ color: "black" }} to={`/camp/${camp.id}`}>{camp.title}</Link></div>
                            <div class="meta">
                                <p>2 days ago</p>
                            </div>
                            <div class="description">
                                {this.limitDescription(camp.description)}
                                {/* <Link className="ui right floated primary button" to={`/camp/${camp.id}`} > View </Link> */}
                            </div>
                        </div>
                        <div className="extra content">{this.renderButton(camp)}</div>
                        <div class="extra content">
                            <span>
                            </span>
                        </div>
                    </div>
                )

        })


    }
    render() {
        const imgWidth = window.innerWidth;
        return (
            <div>
                <h2 >CampList</h2>
                <div className="ui  cards three column grid">
                    {this.renderList(this.state.where)}
                </div>
                 <Link to='/camp/create/' className="ui button primary m-2 mb-5">Create Camp</Link>
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
export default connect(mapStoreToProps, { fetchCamps })(CampList);