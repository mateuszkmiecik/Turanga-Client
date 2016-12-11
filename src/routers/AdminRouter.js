import React, {Component} from 'react'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'

import AdminLayout from '../views/AdminLayout'
import scenes from '../scenes/admin'

class AppRouter extends Component {

    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={AdminLayout}>
                    <IndexRoute component={scenes.CategoriesManager}/>
                    <Route path="/categories/:id" component={scenes.CategoryEditor}/>
                    <Route path="/databases" component={scenes.DatabasesManager}/>
                </Route>
            </Router>
        )
    }
}

export default AppRouter
