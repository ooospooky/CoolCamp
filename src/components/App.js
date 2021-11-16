import React, { useEffect, useState } from 'react'
import { Router, Route, Switch, useLocation } from 'react-router-dom'

import history from '../history'
import CampList from './camps/CampList'
import CampCreate from './camps/CampCreate'
import CampDelete from './camps/CampDelete'
import CampEdit from './camps/CampEdit'
import CampShow from './camps/CampShow'
import Header from './Header'
import Footer from './Footer'
import $ from 'jquery'



// class App extends React.Component {
//     renderHeader = () => {
//         if (window.location.pathname=== '/') {
//             return (
//                 <div class="" style={{ textAlign: 'center', width: window.innerWidth, height: window.innerHeight, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: 'url(https://images.unsplash.com/photo-1488790881751-9068aa742b9b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1032&q=80)' }}>
//                     {/* <div className="ui top fixed menu"  > */}
//                     <Header />
//                     {/* </div> */}
//                     <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateY(-50%)  translateX(-50%)', textAlign: 'center' }}>
//                         <span style={{ color: 'white', fontFamily: 'sans-serif', lineHeight: '100px ', textAlign: 'center' }} >
//                             <span style={{ fontSize: '35px', }}>Welcome to </span>
//                             <br />
//                             <span style={{ fontSize: '70px', }}>Cool Camp!!</span>
//                         </span>
//                     </div>
//                 </div>
//             )
//         } else {
//             return (
//                 <Header />
//             )
//         }
//     }
//     render() {
//         return (
//             <div>
//                 {/* <div className="ui container"> */}
//                 <Router history={history}>
//                     {this.renderHeader()}
//                     {/* <img style={{width: '100%',height: imgWidth }} src="https://images.unsplash.com/photo-1488790881751-9068aa742b9b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1032&q=80" /> */}
//                     <div className="ui container">
//                         <Switch>
//                             <Route exact path="/" component={CampList} />
//                             <Route exact path="/camp/create" component={CampCreate} />
//                             <Route exact path="/camp/edit/:id" component={CampEdit} />
//                             <Route exact path="/camp/delete/:id" component={CampDelete} />
//                             <Route exact path="/camp/:id" component={CampShow} />
//                         </Switch>
//                     </div>

//                 </Router>
//                 {/* </div> */}
//                 <Footer />
//             </div>
//         )
//     }
// }







const App = () => {
    const [location, setLocation] = useState(history.location);    // const imgHeight = window.innerHeight
    history.listen(location => {
        setLocation(location);
    })
    const renderHeader = () => {

        if (location.pathname === '/') {
            return (
                <div class="" style={{ textAlign: 'center', width: window.innerWidth, height: window.innerHeight, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: 'url(https://images.unsplash.com/photo-1488790881751-9068aa742b9b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1032&q=80)' }}>
                    {/* <div className="ui top fixed menu"  > */}
                    <Header  style='sticky' />
                    {/* </div> */}
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Irish+Grover&display=swap');
                        @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
                        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap');
                    </style>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateY(-50%)  translateX(-50%)', textAlign: 'center' }}>
                        <span style={{ color: 'white', fontFamily: 'Dancing Script,Lobster,Irish Grover,sans-serif', lineHeight: '100px ', textAlign: 'center' }} >
                            <span style={{ fontSize: '45px', }}>Welcome to </span>
                            <br />
                            <span style={{ fontSize: '100px', }}>Cool Camp!!</span>
                        </span>
                    </div>
                </div>
            )
        } else {
            return (
                <Header style='' />
            )
        }
    }
    // $(function () {
    //     $(window).scroll(function () {
    //         if ($(this).scrollTop() > 495) {          /* 要滑動到選單的距離 */
    //             $('.header').addClass(navStyle); 
    //             console.log('132')  /* 幫選單加上固定效果 */
    //         } else {
    //             $('.header').removeClass(navStyle); /* 移除選單固定效果 */
    //         }
    //     });
    // });
    // lineHeight: window.innerHeight.toString() + 'px'
    // function usePageViews() {
    //     let location = useLocation();
    //     useEffect(() => {
    //       console.log(location)
    //     }, [location]);
    //   }

    return (
        <div>

            {/* <div className="ui container"> */}
            <Router history={history}>
                {renderHeader()}
                {/* <img style={{width: '100%',height: imgWidth }} src="https://images.unsplash.com/photo-1488790881751-9068aa742b9b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1032&q=80" /> */}
                <div className="ui container">
                    <Switch>
                        console.log('123')
                        <Route exact path="/" component={CampList} />
                        <Route exact path="/camp/create" component={CampCreate} />
                        <Route exact path="/camp/edit/:id" component={CampEdit} />
                        <Route exact path="/camp/delete/:id" component={CampDelete} />
                        <Route exact path="/camp/:id" component={CampShow} />
                    </Switch>
                </div>

            </Router>
            {/* </div> */}
            <Footer />
        </div>
    )
}

export default App;