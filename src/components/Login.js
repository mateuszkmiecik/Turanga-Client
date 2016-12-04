import React, {Component} from 'react';
import AuthService from '../services/Auth'

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isError: false
        };

        this.handleLoginAction = this.handleLoginAction.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

    }

    render() {
        const {username, password, isError, errorMessage} = this.state;

        return (
            <div className="login">
                <h1>Turanga</h1>

                <div className="login-box">
                    <p><input type="text"
                              placeholder="Login"
                              onChange={this.handleUsernameChange}
                              value={username}/></p>
                    <p><input type="password"
                              placeholder="Password"
                              onChange={this.handlePasswordChange}
                              value={password}/></p>

                    <button onClick={this.handleLoginAction}>Login</button>
                    <button className="link">Login as guest</button>
                </div>

                {isError ? <div className="error-message">{errorMessage}</div> : null}
            </div>
        );
    }

    handleUsernameChange(e) {
        this.setState({username: e.target.value})
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value})
    }

    handleLoginAction(e) {
        e.preventDefault();
        const {username, password} = this.state;
        AuthService.authenticate({username, password}).then(profile => this.props.onSuccess(profile), err => {
            console.log(err);
            this.setState({
                isError: true,
                errorMessage: 'Invalid username or/and password.'
            })
        })
    }
}

export default Login;
