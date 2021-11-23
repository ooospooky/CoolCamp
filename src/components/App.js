import React, { useEffect, useState } from 'react'
import { Router, Route, Switch, useLocation } from 'react-router-dom'

import history from '../history'
import CampList from './camps/CampList'
import CampCreate from './camps/CampCreate'
import CampDelete from './camps/CampDelete'
import CampEdit from './camps/CampEdit'
import CampShow from './camps/CampShow'
import Header from './Header'

const App = () => {
    return (
        <div>
            <Router history={history}>
                <Header style='' />
                <div className="ui container">
                    <Switch>
                        <Route exact path="/" component={CampList} />
                        <Route exact path="/camp/create" component={CampCreate} />
                        <Route exact path="/camp/edit/:id" component={CampEdit} />
                        <Route exact path="/camp/delete/:id" component={CampDelete} />
                        <Route exact path="/camp/:id" component={CampShow} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App;