import React,{useEffect} from 'react'
import { connect } from 'react-redux';
import { fetchCamps } from '../../action'
import { Link } from 'react-router-dom'
import history from '../../history'
import './CampList.css'

import {db} from '../../firebase-config'
import  {collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from 'firebase/firestore';

const campCollectionRef = collection(db,'camp')
class CampList extends React.Component {
    
    state = { where: 'all', firecamp:[]}
    componentDidMount() {
        this.props.fetchCamps();
        const getCamp = async()=>{
            const data = await getDocs(campCollectionRef);
            console.log("DOC",data.docs)
            // setCamp(data.docs.map((doc)=> ({...doc.data(),id:doc.id})));
            this.setState({ firecamp: data.docs.map((doc)=> ({...doc.data()})) })
            console.log('firebase',this.state.firecamp)
          }
        getCamp();
          
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
        // if (!this.props.authId) return null
        // console.log('USER_ID:',this.props.authId.fx)
        if (this.props.authId.fX === camp.userId) {
            return (
                <div>
                    <Link className="ui mini right floated negative button" to={`/camp/delete/${camp.id}`}>刪除</Link>
                    <Link className="ui mini right floated grey button " to={`/camp/edit/${camp.id}`}> 修改 </Link>
                </div>
            )
        }
    }
    renderList(opt) {
        return this.props.camps.map(camp => {
            let campLocationTag  = camp.locationTag;
            let total = 0
            for (let i = 0; i < camp.comment.length; i++) {
                total += camp.comment[i].rating
            }
           
            //set cover Image src
            let imagedisplay = '';
            if(!camp.imageData || camp.imageData.length === 0){
                imagedisplay ="https://images.unsplash.com/photo-1594495894542-a46cc73e081a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
            }else{
                imagedisplay = camp.imageData[0]['url']
            }
            ////////////////////
            let average = total / camp.comment.length
            if (camp.locationTag === opt || opt === 'all' )

         
                return (
                    <div class="card">
                        <div className="image image-box">
                            {/* <Link to={`/camp/${camp.id}`}><img src="https://images.unsplash.com/photo-1594495894542-a46cc73e081a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80" /></Link> */}
                            <img onClick={() => history.push(`/camp/${camp.id}`)} className="ListImage" src={imagedisplay}  style={{height:'250px'}}/>
                        </div>
                        <div class="content">
                            <div class="header title"><Link style={{ color: "black" }} to={`/camp/${camp.id}`}>{camp.title}</Link></div>
                            <div class="meta">
                                {/* <p>2 days ago</p> */}
                                <p>2 天前發布</p>
                            </div>
                            <div class="description">
                                {this.limitDescription(camp.description)}
                                {/* <Link className="ui right floated primary button" to={`/camp/${camp.id}`} > View </Link> */}
                            </div>
                        </div>
                        {this.props.authId && this.props.authId.fX === camp.userId ? <div className="extra content">{this.renderButton(camp)}</div> : null}
                        <div class="extra content">
                            <span class="right floated">
                                {camp.locationTag ? <i style={{ backgroundColor: '#ada6a6' }} className="ui  mini tag label">{camp.locationTag}</i> : null}
                                {camp.advantageTag ? <i style={{ backgroundColor: '#ada6a6' }} className="ui  mini tag label">{camp.advantageTag}</i> : null}
                            </span>
                            {average?
                            <span>
                                <span style={{ fontSize: '20px' }}>{average.toFixed(1)}</span>/5
                            </span>
                            :'Not rated yet'
                            // :"還未有評分"
                            }
                        </div>
                    </div>
                )

        })


    }
    renderFilter = () => {
        return (
            <div className="ui ten column centered grid mb-2"style={{marginTop:15}}>
                <button onClick={() => this.setState({ where: 'all' })} style={{ width: '60px' }} className="ui active teal button ">全部</button>  &nbsp;&nbsp;&nbsp;
                <button onClick={() => this.setState({ where: '北部' })} style={{ width: '60px' }} className="ui teal button">北部</button>  &nbsp;&nbsp;&nbsp;
                <button onClick={() => this.setState({ where: '南部' })} style={{ width: '60px' }} className="ui teal button ">南部</button> &nbsp;&nbsp;&nbsp;
                <button onClick={() => this.setState({ where: '東部' })} style={{ width: '60px' }} className="ui teal button ">東部</button> &nbsp;&nbsp;&nbsp;
                <button onClick={() => this.setState({ where: '中部' })} style={{ width: '60px' }} className="ui teal button ">中部</button>
            </div>
        )
    }
    render() {
        return (
            <div>
                {this.renderFilter()}
                <div className="ui  cards three column grid">
                    {this.renderList(this.state.where)}
                </div>
                {this.props.authId ? <Link to='/camp/create/' className="ui button primary m-3 mb-5">新增露營地</Link> : null}
                
          
            </div>
        )
    }
}
const mapStoreToProps = (state, ownProps) => {
    return {
        camps: Object.values(state.camps),
        authId: state.auth.userProfile,
        isSignedIn: state.auth.isSignedIn
    }
}
export default connect(mapStoreToProps, { fetchCamps })(CampList);