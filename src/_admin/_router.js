import React, {Component} from 'react'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'

import {NotFound} from '../components'
import CategoriesManager from './CategoriesManager'
import Results from './Results'
import SingleResult from './SingleResult'
import CategoryEditor from './CategoryEditor'
import DatabaseManager from './DatabasesManager'
import Users from './Users'
import Main from './Main'

class AppRouter extends Component {

    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Main}>
                    <IndexRoute component={CategoriesManager}/>
                    <Route path="results" component={Results}/>
                    <Route path="databases" component={DatabaseManager}/>
                    <Route path="users" component={Users}/>
                </Route>
                <Route path="/categories/:id" component={CategoryEditor}/>
                <Route path="/results/:id" component={SingleResult}/>
                <Route path="*" component={NotFound}/>
            </Router>
        )
    }
}

export default AppRouter
