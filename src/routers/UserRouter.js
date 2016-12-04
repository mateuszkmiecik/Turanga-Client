import React, {Component} from 'react'

import {Router, Route, hashHistory, IndexRoute} from 'react-router'

import MainLayout from '../views/MainLayout'

const UserDashboard = () => <div>Dashboard</div>;

class AppRouter extends Component {

    render() {

        return (
            <Router history={hashHistory}>
                <Route path='/' component={MainLayout}>
                    <IndexRoute component={UserDashboard}/>
                </Route>
            </Router>
        )
    }
}

export default AppRouter
