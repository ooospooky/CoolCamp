import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding'
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import CommentList from './CommentList';
import { fetchCamp } from '../../action'
import CommentCreate from './CommentCreate';
import markImage from '../../image/location_map_pin_mark_icon_148684.png'
import Rating from 'react-rating'

class CampShow extends React.Component {
    componentDidMount() {
        this.props.fetchCamp(this.props.match.params.id)

    }
 
    renderImage() {
        return (
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80" class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80" class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1119&q=80" class="d-block w-100" alt="..." />
                    </div>
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
        console.log('ggeo', geoData.body.features[0].geometry.coordinates)
        return (geoData.body.features[0].geometry.coordinates)
    }
    renderComment = () => {
        console.log('comm', this.props.camp.comment)
        if (!this.props.camp.comment) return null
        // if(!this.props.camp.comment[1])return <CommentList title={this.props.camp.comment.title} comment={this.props.camp.comment.comment} author={this.props.camp.comment.author} />
        return this.props.camp.comment.map((comm) => {
            return (
                <CommentList title={comm.title} comment={comm.comment} author={comm.author} img={comm.img} rating={comm.rating} />
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
                {this.props.camp.comment.length} reviews

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
        console.log(bathroomAverage)

        return (
            <div className="ui items">
                <br />
                <br />
                <div className="item">
                    <div className="middle aligned content">
                        <div className="dexcription">
                            View Average Star:
                            <br />
                            Bathroom Average Star:
                        </div>

                    </div>
                    <div className="ui right floated">

                        <Rating readonly initialRating={viewAverage} style={{ "color": "green" }} emptySymbol="fa-sm far fa-star" fullSymbol="fa-sm fa fa-star" />
                        <br />
                        <Rating readonly initialRating={bathroomAverage} style={{ "color": "green" }} emptySymbol="fa-sm far fa-star" fullSymbol="fa-sm fa fa-star" />
                    </div>
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
        const campocation = this.getCoordinate()

        return (
            <div>
                {/* <div className="ui items"> */}
                <h2> Camp detail</h2>
               
                {/* onClick={(e)=>console.log(e)}   */}
                {/* <Rating  emptySymbol="fa-lg far fa-star" fullSymbol="fa-lg fa fa-star"/> */}
                {/* {this.getCoordinate()} */}
                {this.renderImage()}
                <div class="ui two item menu">
                    <a class="item active">Editorials</a>
                    <a class="item"  >Reviews</a>
                </div>
                <div className="ui grid">
                    <div className="eight wide column">
                        <div className="ui item">
                            <div className="content">
                                {/* <div className="header">Title:{this.props.camp.title}</div> */}
                                <h3>{this.props.camp.title}</h3>
                                <div className="text-muted">Description</div>
                                <div className="description">{this.props.camp.description}</div>
                            </div>
                        </div>
                    </div>

                    <div className="eight wide column">
                        <h3>{this.props.camp.location}</h3>
                        <Map
                            style="mapbox://styles/mapbox/streets-v9"
                            center={lng}
                            //前經度後尾度

                            containerStyle={{
                                height: '500px',
                                width: '100%'
                            }}
                        >
                            <Marker
                                coordinates={lng}
                                anchor="bottom">
                                <img className="ui mini image" src={markImage} />
                            </Marker>
                            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                                <Feature coordinates={[121.53424836855744, 24.94326989048007]} />
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
    // console.log("dfdfd", state)
    return {
        camp: state.camps[ownProps.match.params.id],
        auth: state.auth.userProfile,
        isSignedIn: state.auth.isSignedIn
        // auth: state.userProfile
    }
}

export default connect(mapStateToProps, { fetchCamp })(CampShow);

