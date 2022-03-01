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

        if (!this.props.authId) return null
        if (this.props.authId.uT === camp.userId) {
            return (
                <div>
                    <Link className="ui mini right floated negative button" to={`/camp/delete/${camp.id}`}>Delete</Link>
                    <Link className="ui mini right floated grey button " to={`/camp/edit/${camp.id}`}> Edit </Link>
                </div>
            )
        }
    }
    renderList(opt) {
        return this.props.camps.map(camp => {

            let total = 0
            for (let i = 0; i < camp.comment.length; i++) {
                total += camp.comment[i].rating
            }
            let average = total / camp.comment.length
            if (camp.locationTag === opt || opt === 'all')
                return (
                    <div class="card">
                        <div className="image image-box">
                            {/* <Link to={`/camp/${camp.id}`}><img src="https://images.unsplash.com/photo-1594495894542-a46cc73e081a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80" /></Link> */}
                            <img onClick={() => history.push(`/camp/${camp.id}`)} className="ListImage" src="https://images.unsplash.com/photo-1594495894542-a46cc73e081a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80" />
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
                        {this.props.authId && this.props.authId.uT === camp.userId ? <div className="extra content">{this.renderButton(camp)}</div> : null}
                        <div class="extra content">
                            <span class="right floated">
                                {camp.locationTag ? <i style={{ backgroundColor: '#ada6a6' }} className="ui  mini tag label">{camp.locationTag}</i> : null}
                                {camp.advantageTag ? <i style={{ backgroundColor: '#ada6a6' }} className="ui  mini tag label">{camp.advantageTag}</i> : null}
                            </span>
                            {average?
                            <span>
                                <span style={{ fontSize: '20px' }}>{average.toFixed(1)}</span>/5
                            </span>
                            :'Not rated yet'}
                        </div>
                    </div>
                )

        })


    }
    renderFilter = () => {
        return (
            <div className="ui ten column centered grid mb-2">
                <button onClick={() => this.setState({ where: 'all' })} style={{ width: '60px' }} className="ui active teal button ">All</button>  &nbsp;&nbsp;&nbsp;
                <button onClick={() => this.setState({ where: 'North' })} style={{ width: '60px' }} className="ui teal button">North</button>  &nbsp;&nbsp;&nbsp;
                <button onClick={() => this.setState({ where: 'South' })} style={{ width: '60px' }} className="ui teal button ">South</button> &nbsp;&nbsp;&nbsp;
                <button onClick={() => this.setState({ where: 'East' })} style={{ width: '60px' }} className="ui teal button ">East</button> &nbsp;&nbsp;&nbsp;
                <button onClick={() => this.setState({ where: 'West' })} style={{ width: '60px' }} className="ui teal button ">West</button>
            </div>
        )
    }
    render() {
        const imgWidth =window.innerWidth;
        return (
            <div>
                {/* <button onClick={()=>console.log(window.innerWidth)} >click</button> */}
            {/* <img style={{backgroundPosition: 'center',width:'1800px', height:'100%'}} src="https://images.unsplash.com/photo-1488790881751-9068aa742b9b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1032&q=80" /> */}
                <h2 >CampList</h2>
                {this.renderFilter()}
                <div className="ui  cards three column grid">
                    {this.renderList(this.state.where)}
                </div>
                {this.props.authId ? <Link to='/camp/create/' className="ui button primary m-2 mb-5">Create Camp</Link> : null}
                
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