import React, {Component} from 'react'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'

import MainLayout from '../views/MainLayout'
import scenes from '../scenes/admin'

class AppRouter extends Component {

    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={MainLayout}>
                    <IndexRoute component={scenes.CategoriesManager}/>
                    <Route path="/categories/:id" component={scenes.CategoryEditor}/>
                    <Route path="/databases" component={scenes.DatabasesManager}/>
                </Route>
            </Router>
        )
    }
}

export default AppRouter
