import React, {Component} from 'react';
import AuthService from '../services/Auth'
import {hashHistory} from 'react-router'

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            username: '',
            password: '',
            passwordSecond: '',
            isError: false
        };

        this.handleLoginAction = this.handleLoginAction.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSecondPasswordChange = this.handleSecondPasswordChange.bind(this);

    }

    render() {
        const {username, password, passwordSecond, name, isError, errorMessage} = this.state;

        return (
            <div className="register">
                <div className="login-box">
                    <p><input type="text"
                              placeholder="Name"
                              onChange={this.handleNameChange}
                              value={name}/></p>
                    <p><input type="text"
                              placeholder="Login"
                              onChange={this.handleUsernameChange}
                              value={username}/></p>
                    <p><input type="password"
                              placeholder="Password"
                              onChange={this.handlePasswordChange}
                              value={password}/></p>
                    <p><input type="password"
                              placeholder="Password"
                              onChange={this.handleSecondPasswordChange}
                              onKeyUp={(e) => {
                                  if (e.key === 'Enter') {
                                      this.handleLoginAction(e)
                                  }
                              }}
                              value={passwordSecond}/></p>

                    <button onClick={this.handleLoginAction}>Register</button>
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
    handleSecondPasswordChange(e) {
        this.setState({passwordSecond: e.target.value})
    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    handleLoginAction(e) {
        e.preventDefault();


        const AUTH_MESSAGES = {
            400: 'All fields are required. Try again.',
            409: 'Username is taken. Try again.',
            500: 'Something is wrong. Try again later'
        };

        const {username, password, name: displayName, passwordSecond} = this.state;
        if(!username || !password || !displayName || !passwordSecond){
            return this.setState({
                isError: true,
                errorMessage: AUTH_MESSAGES[400]
            })
        }
        if(password !== passwordSecond){
            return this.setState({
                isError: true,
                errorMessage: "Passwords do not match."
            })
        }
        AuthService.register({username, password, displayName}).then(profile => {
            hashHistory.push('/?registered');
            location.reload();
        }, err => {
            console.log(JSON.stringify());
            this.setState({
                isError: true,
                errorMessage: AUTH_MESSAGES[err.response.status] || "Unknown error."
            })
        })
    }
}

export default Register;
