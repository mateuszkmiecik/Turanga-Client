import React, {Component} from 'react'
import Auth from './services/Auth'
import Login from './components/Login'

import AdminRouter from './routers/AdminRouter'
import UserRouter from './routers/UserRouter'


console.log(fetch)
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
        if (!this.state.isLoaded) {
            return <div>Loading</div>;
        }

        if (!this.state.isLoggedIn) {
            return <Login onSuccess={this.setUser}/>
        }


        if (this.state.profile.role === 'ADMIN') {
            return <AdminRouter/>
        }


        if (this.state.profile.role === 'USER') {
            return <UserRouter type="abc"/>
        }

    }
}


export default App;
