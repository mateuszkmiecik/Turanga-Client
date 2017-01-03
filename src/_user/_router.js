import React, {Component} from 'react'

import {Router, Route, hashHistory, IndexRoute} from 'react-router'

import UserDashboard from './Dashboard'
import Results from './Results'
import Runner from './Runner'

class AppRouter extends Component {

    render() {

        return (
            <Router history={hashHistory}>
                <Route path='/'>
                    <IndexRoute component={UserDashboard}/>
                    <Route path="results" component={Results} />
                </Route>
                <Route path="/runner/:id" component={Runner}/>

            </Router>
        )
    }
}

export default AppRouter
