import React from 'react';
import test_qrcode from '../image/test_qrcode.png';
const Footer = () => {
    return (
        <div className="mt-5 " >
            <div style={{ width: '100%', height: '130px', backgroundColor: '#1C2331' }}>
                <div style={{ color: '#FFFFFF' }} className="container">
                    <div className="ui grid">
                    <div className="one wide column"></div>
                        <div className="five wide column" >
                            <h5>Download our App</h5>
                            &nbsp;&nbsp; &nbsp;
                            <img style={{lineHeight:'130px', height: '70px', width: '70px' }} src={test_qrcode}></img>
                        </div>
                        
                        <div style={{ textAlign: 'center' }} className="five wide column">
                            {/* <h5>Contact Us</h5> */}
                            <h5>聯絡我們</h5>
                            <div style={{textAlign:'left'}}>
                            {/* <p> <i className="home icon"/> Gongzhuan Rd. Taishan Dist., New Taipei City</p> */}
                            <p> <i className="home icon"/> 新北市泰山區工專路84號   </p>
                            <p><i className="phone icon"/>0912345678</p>
                            <p><i className="mail icon"/>bm414148@gmail.com</p>
                            </div>
                        </div>
                        <div className="two wide column"></div>
                    </div>
                </div>
            </div>
            <div style={{ width: '100%', height: '50px', backgroundColor: '#212121', textAlign: 'center' }}>
                <p style={{ color: '#9e9e9e', lineHeight: '50px' }}>@2021 CoolCamp &nbsp;  All rights reserved and Design by Johnny</p>
            </div>
        </div>
    )
}

export default Footer;