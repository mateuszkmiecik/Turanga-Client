import React, {Component} from 'react';
import AuthService from '../services/Auth'
import Register from './Register'

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            registerMode: false,
            isError: false
        };

        this.handleLoginAction = this.handleLoginAction.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

    }

    render() {
        const {username, password, isError, errorMessage} = this.state;

        console.log(location.hash.endsWith('registered'));

        return (
            <div className="login">
                {location.hash.endsWith('registered') ? <p className="text-center">User registered!</p> : null}
                <div className="login-box">
                    <p><input type="text"
                              placeholder="Login"
                              onChange={this.handleUsernameChange}
                              value={username}/></p>
                    <p><input type="password"
                              placeholder="Password"
                              onChange={this.handlePasswordChange}
                              onKeyUp={(e) => {
                                  if (e.key === 'Enter') {
                                      this.handleLoginAction(e)
                                  }
                              }}
                              value={password}/></p>

                    <button onClick={this.handleLoginAction}>Login</button>
                    <button onClick={() => this.setState({
                        registerMode: !this.state.registerMode
                    })}>Register
                    </button>
                    {/*<button className="link">Login as guest</button>*/}
                </div>

                {isError ? <div className="error-message">{errorMessage}</div> : null}

                {this.state.registerMode ?
                    <Register/> : null }
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
