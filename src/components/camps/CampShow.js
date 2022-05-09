import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding'
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import CommentList from './CommentList';
import { fetchCamp,deleteComment } from '../../action'
import CommentCreate from './CommentCreate';
import markImage from '../../image/location_map_pin_mark_icon_148684.png'
import Rating from 'react-rating'
import {Image} from 'cloudinary-react'
import './CampShow.css'

import mapboxgl from 'mapbox-gl'
// 
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
//https://docs.mapbox.com/mapbox-gl-js/guides/install/#transpiling
//https://github.com/mapbox/mapbox-gl-js/issues/10173
//加上以上程式碼因為mapbox-gl與某些babel轉換不兼容，導致mapbox無法呈現
class CampShow extends React.Component {

    state = {loc:[121.53424836855744, 24.94326989048007]}
    componentDidMount() {
        this.props.fetchCamp(this.props.match.params.id)
        if (this.props.camp) this.getCoordinate()        
    }
    renderCarousel(){
        if(!this.props.camp.imageData || this.props.camp.imageData.length === 0){
            return(
                <>
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </>
                )
            }else{
                return this.props.camp.imageData.map((data,i)=>{
                    if(data['name'] === this.props.camp.imageData[0]['name']){
                        return <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    }else{
                        return <li data-target="#carouselExampleIndicators" data-slide-to={i}></li>
                    }
                })
            }
    }
    checkImageExist(){
        if(!this.props.camp.imageData || this.props.camp.imageData.length === 0){
            return(
                <>
                    <div class="carousel-item active">
                    {/* <Image cloudName="dsmgwkxbl" publicId="temtcbjiczlznjxri2id"></Image> */}
                        <img id="image-show" src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80" class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item ">
                        <img  id="image-show" src="https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80" class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img id="image-show" src="https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1119&q=80" class="d-block w-100" alt="..." />
                    </div>
                </>
            )
        }else{
            return this.props.camp.imageData.map((data)=>{
                if(data['name'] === this.props.camp.imageData[0]['name']){
                    return(
                        <div class="carousel-item active">
                            <img src={data['url']} class="d-block w-100" id="image-show" alt="Camp Image" />
                        </div>
                    )
                }else{
                    return(
                        <div class="carousel-item  ">
                            <img src={data['url']} class="d-block w-100" id="image-show" alt="Camp Image" />
                        </div>
                    )
                }
            })
        }
    }
    renderImage() {
        return (
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    {this.renderCarousel()}   
                    {/* check how many pic there are,render correspond Carousel */}
                </ol>
            
                <div class="carousel-inner">
                    {this.checkImageExist()}
                    {/* if user does't upload image, we give it default image */}
                </div>

                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        )
    }
    getCoordinate = async () => {
        const geocoder = mbxGeocoding({ accessToken: 'pk.eyJ1IjoiYm0xNDg5MTQ4OSIsImEiOiJja3V6Y3BwbWg3YXhzMm5vODVyYXNxNTVrIn0.khuD8odO2jANDQ1lUPNgMQ' })
        const geoData = await geocoder.forwardGeocode({
            query: this.props.camp.location || 'Taipei',
            // ?No. 8, Xinrong St. Zhongli Dist., Taoyuan City
            limit: 1
        }).send()
        // console.log('GEOCODING', geoData.body.features[0].geometry.coordinates)
        this.setState({loc:geoData.body.features[0].geometry.coordinates})
        // console.log('STATE',this.state.loc)

    }
    renderComment = () => {
        if (!this.props.camp.comment) return null
        // if(!this.props.camp.comment[1])return <CommentList title={this.props.camp.comment.title} comment={this.props.camp.comment.comment} author={this.props.camp.comment.author} />
        return this.props.camp.comment.map((comm) => {
            return (
                <CommentList    title={comm.title} comment={comm.comment} author={comm.author} img={comm.img} rating={comm.rating}  commentId={comm.id} campId={this.props.camp.id}  commentAuthorId={comm.authorId}/>
            )
        })
    }
    renderStar = () => {
        let total = 0
        for (let i = 0; i < this.props.camp.comment.length; i++) {
            total += this.props.camp.comment[i].rating
        }
        let average = total / this.props.camp.comment.length
        return (
            <div>
                <span style={{ fontSize: "50px" }}>{average.toFixed(1)}</span><span>/5</span>
                <br />
                <Rating readonly initialRating={average} style={{ "color": "green" }} emptySymbol="fa-sm far fa-star" fullSymbol="fa-sm fa fa-star" />
                <br />
                {this.props.camp.comment.length} 則留言

            </div>
        )
    }
    renderAllstar = () => {
        if (!this.props.camp.comment[0]) return (<div><h3>There is no comment yet</h3></div>)
        let bathroom = 0
        let view = 0
        for (let i = 0; i < this.props.camp.comment.length; i++) {
            bathroom += this.props.camp.comment[i].bathroomrating
            view += this.props.camp.comment[i].viewrating
        }
        let bathroomAverage = bathroom / this.props.camp.comment.length
        let viewAverage = view / this.props.camp.comment.length

        return (
            <div className="ui items">
                <br />
                <br />
                <div className="item">
                    <div className="middle aligned content">
                        <div className="dexcription">
                            {/* View Average Star: */}
                            景觀平均分數:&nbsp;&nbsp;&nbsp;
                            <Rating readonly initialRating={viewAverage} style={{ "color": "green" }} emptySymbol="fa-sm far fa-star" fullSymbol="fa-sm fa fa-star" />
                            <br />
                            {/* Bathroom Average Star: */}
                            浴廁平均分數:&nbsp;&nbsp;&nbsp;
                            <Rating readonly initialRating={bathroomAverage} style={{ "color": "green" }} emptySymbol="fa-sm far fa-star" fullSymbol="fa-sm fa fa-star" />
                        </div>

                    </div>
                    {/* <div className="ui right floated">

                        <Rating readonly initialRating={viewAverage} style={{ "color": "green" }} emptySymbol="fa-sm far fa-star" fullSymbol="fa-sm fa fa-star" />
                        <br />
                        <Rating readonly initialRating={bathroomAverage} style={{ "color": "green" }} emptySymbol="fa-sm far fa-star" fullSymbol="fa-sm fa fa-star" />
                    </div> */}
                </div>
            </div>
        )
    }
    // map for coolCamp API:AIzaSyAyxUPN_AL9aM475SmE4Occ3UPH8tROnX0 
    render() {
        const Map = ReactMapboxGl({
            accessToken:
                'pk.eyJ1IjoiYm0xNDg5MTQ4OSIsImEiOiJja3V6Y3BwbWg3YXhzMm5vODVyYXNxNTVrIn0.khuD8odO2jANDQ1lUPNgMQ'
        });
        const lng = [121.53424836855744, 24.94326989048007]
        if (!this.props.camp) return <div>Loading...</div>
     
        return (
            <div>
                {this.renderImage()}
                <div className="ui grid" style={{marginTop:10}}>
                    <div className="eight wide column">
                        <div className="ui item">
                            <div className="content">
                                {/* <div className="header">Title:{this.props.camp.title}</div> */}
                                <h3>{this.props.camp.title}</h3>
                                <div className="text-muted"><h3>簡介:</h3></div>
                                <div className="description">{this.props.camp.description}</div>
                                <div className="text-muted"><h3>注意須知:</h3></div>
                                 {/* https://simonallen.coderbridge.io/2020/07/03/replace-br/ */}
                                <div className="description"><p style={{whiteSpace:'pre-line'}}>{this.props.camp.notes} </p></div>
                            </div>
                        </div>
                    </div>

                    <div className="eight wide column">
                        <h3>{this.props.camp.location}</h3>
                        <Map
                            style="mapbox://styles/mapbox/streets-v9"
                            center={this.state.loc}
                            //前經度後尾度

                            containerStyle={{
                                height: '500px',
                                width: '100%'
                            }}
                        >
                            <Marker
                                coordinates={this.state.loc}
                                anchor="bottom">
                                <img className="ui mini image" src={markImage} />
                            </Marker>
                            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                                <Feature coordinates={this.state.loc} />
                            </Layer>
                        </Map>
                    </div>
                </div>
                {/* List Rating */}
                <div className="ui grid">
                    <div className="row">
                        <div className="two wide column"></div>
                        <div className="six wide column">{this.renderStar()}</div>
                        <div className="six wide column">{this.renderAllstar()}</div>
                        <div className="two wide column"></div>
                    </div>
                </div>
                {/* REVIEW!!!!!!!!!!! */}
                <div className="ui grid">
                    <div class="row">
                        <div class="three wide column"></div>
                        <div class="ten wide column">
                            <div className="">
                                {this.renderComment()}
                                <CommentCreate isSignedIn={this.props.isSignedIn} campId={this.props.match.params.id} author={this.props.auth} />
                            </div>

                        </div>
                        <div class="three wide column"></div>
                    </div>

                </div >
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        camp: state.camps[ownProps.match.params.id],
        auth: state.auth.userProfile,
        isSignedIn: state.auth.isSignedIn
        // auth: state.userProfile
    }
}

export default connect(mapStateToProps, { fetchCamp })(CampShow);

