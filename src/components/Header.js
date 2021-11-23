import React from 'react'
import { Link } from 'react-router-dom'

import GoogleAuth from '../GoogleAuth'

const Header = (props) => {
    return (
        <div className="ui container  " style={{ position: props.style, top: '0' }} >
            <div className=" ui secondary pointing   large  top  menu">
                <Link to="/" className="active item ">
                    <i className="home icon " />
                    Home
                </Link>
                <div className="right menu">
                    {/* <GoogleAuth /> */}
                    Login
                </div>
            </div>
        </div>
    )
}

export default Header;