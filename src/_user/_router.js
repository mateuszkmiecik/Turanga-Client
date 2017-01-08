import React, {Component} from 'react'

import {Router, Route, hashHistory, IndexRoute} from 'react-router'

import UserDashboard from './Dashboard'
import Results from './Results'
import ResultDetails from './ResultDetails'
import Runner from './Runner'
import CategoryDetails from './CategoryDetails'
import ExamDetails from './ExamDetails'
import Main from './Main'

class AppRouter extends Component {

    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Main}>
                    <IndexRoute component={UserDashboard}/>
                    <Route path="results/:id" component={ResultDetails} />
                    <Route path="results" component={Results} />
                    <Route path="category/:id" component={CategoryDetails} />
                    <Route path="exam/:id" component={ExamDetails} />
                </Route>
                <Route path="/attempt/:id" component={Runner}/>

            </Router>
        )

    }
}

export default AppRouter
