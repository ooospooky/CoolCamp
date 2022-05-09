import React from 'react'
import { Link } from 'react-router-dom'

import GoogleAuth from '../GoogleAuth'

const Header = (props) => {
    // console.log('this.props:',this.props)
    return (
        <div className="ui container  " style={{ position: props.style, top: '0' }} >
            <div className=" ui secondary pointing   large  top  menu">
                <Link to="/" className="active item ">
                    <i className="home icon " />
                    Home
                </Link>
                <Link to="/" className="item">
                    <i className="info circle icon " />
                    {/* About us */}
                    關於我們
                </Link>
                <Link to="/camp/2ZS0W1kErJ8WFeF27Oiu" className="item">
                    <i className="fire icon " />
                    {/* most popular */}
                    最受歡迎
                </Link>
                <Link to="/camp/create" className="item">
                    <i className="ui plus  icon"></i>
                    {/* Create campground */}
                    新建露營地
                </Link>
                <div className="right menu">
                    <GoogleAuth />
                </div>
            </div>
        </div>
    )
}

export default Header;