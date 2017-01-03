import React, {Component} from 'react'
import Auth from './services/Auth'
import Login from './components/Login'

import AdminRouter from './_admin/_router'
import UserRouter from './_user/_router'

import MainLayout from './components/MainLayout'

class App extends Component {


    constructor(props) {
        super(props)

        this.state = {
            isLoaded: false,
            isLoggedIn: false,
            profile: {}
        }

        this.setUser = this.setUser.bind(this)
    }

    componentDidMount() {
        Auth.init().then(this.setUser)
    }

    setUser(profile) {
        this.setState({
            isLoggedIn: !!profile,
            isLoaded: true,
            profile: profile || {}
        })
    }

    render() {
        let renderComponent = null;

        if (!this.state.isLoaded) {
            renderComponent = <div>Loading</div>;
        }

        if (this.state.isLoaded && !this.state.isLoggedIn) {
            renderComponent = <Login onSuccess={this.setUser}/>
        }


        if (this.state.profile.role === 'ADMIN') {
            renderComponent = <AdminRouter/>
        }


        if (this.state.profile.role === 'USER') {
            renderComponent = <UserRouter/>
        }

        return <MainLayout loggedIn={this.state.isLoggedIn}>{renderComponent}</MainLayout>

    }
}


export default App;
