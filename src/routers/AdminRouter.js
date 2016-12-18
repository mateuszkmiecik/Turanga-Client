import React, {Component} from 'react'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'

import MainLayout from '../views/MainLayout'
import scenes from '../scenes/admin'

class AppRouter extends Component {

    render() {
        return (
            <Router history={hashHistory}>
                <MainLayout>
                    <Route path='/' component={scenes.Main} >
                        <IndexRoute component={scenes.Dashboard}/>
                        <Route path="databases" component={scenes.DatabasesManager}/>
                        <Route path="categories" component={scenes.CategoriesManager}/>
                    </Route>
                    <Route path="/categories/:id" component={scenes.CategoryEditor}/>
                </MainLayout>
            </Router>
        )
    }
}

export default AppRouter
