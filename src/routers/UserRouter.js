import React, {Component} from 'react'

import {Router, Route, hashHistory, IndexRoute} from 'react-router'

import UserDashboard from '../scenes/user/Dashboard'
import Runner from '../scenes/user/Runner'

import MainLayout from '../views/MainLayout'

class AppRouter extends Component {

    render() {

        return (
            <Router history={hashHistory}>
                <Route path='/' component={MainLayout}>
                    <IndexRoute component={UserDashboard}/>
                    <Route path="/runner/:id" component={Runner}/>
                </Route>
            </Router>
        )
    }
}

export default AppRouter
