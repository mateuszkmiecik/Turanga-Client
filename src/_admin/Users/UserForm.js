import React from 'react';
import {Switch, Checkbox} from '@blueprintjs/core';

import API from '../../services/API'
import EditableComponent from '../../components/EditableComponent'
import Typeahead from '../../components/Typeahead'

const initialState = {
    name: '',
    username: '',
    password: 'alamakota123',
    group: {},
    isAdmin: false,
    enableChangingPassword: false,
    possibleGroups: []
};

class UserForm extends EditableComponent {

    constructor(props) {
        super(props);

        this.state = {
            ...initialState
        };

        this.handleCreation = this.handleCreation.bind(this);
        this.findGroupsByName = this.findGroupsByName.bind(this);
        this.selectGroup = this.selectGroup.bind(this);
    }

    handleCreation() {
        const {name, username, password, isAdmin, group} = this.state;
        const newUser = {
            name, username, password, role: isAdmin ? 'ADMIN' : 'USER', group
        };
        if (!!this.props.onCreate) {
            this.props.onCreate(newUser).then(() =>
                this.setState({
                    ...initialState
                })
            );
        }
    }

    findGroupsByName(name) {
        API.post('/groups/search', {
            query: name
        }).then(res => this.setState({
            possibleGroups: res
        }));
    }

    selectGroup(gr) {
        this.setState({
            group: gr
        })
    }

    render() {
        const {name, username, enableChangingPassword, isAdmin} = this.state;

        const buttonDisabled = username.length === 0;

        return (
            <div>
                <h4>Add user</h4>

                <hr/>

                <div className="row">
                    <div className="col-sm-6">
                        <label className="pt-label">
                            Username
                            <input type="text" value={username} className="pt-input"
                                   onChange={this.onFieldChange('username')}/>
                        </label>
                        <label className="pt-label">
                            Password
                            <input type="text" disabled={!enableChangingPassword} value={this.state.password}
                                   onChange={this.onFieldChange('password')}
                                   className="pt-input"/>
                        </label>
                        <label className="pt-label">
                            <Checkbox checked={this.state.enableChangingPassword} label="change password"
                                      onChange={() => this.setState({enableChangingPassword: !enableChangingPassword})}/>
                        </label>
                    </div>
                    <div className="col-sm-6">
                        <label className="pt-label">
                            Real name
                            <input type="text" value={name} className="pt-input"
                                   onChange={this.onFieldChange('name')}/>
                        </label>
                        <label className="pt-label">
                            Group
                            <div>
                                <span className="pt-tag">{this.state.group.name || ''}</span>
                            </div>
                            <div className="space-bottom space-top">
                                <Typeahead items={this.state.possibleGroups}
                                           onValueChange={this.findGroupsByName}
                                           onValueSelect={this.selectGroup} renderer={(gr => gr.name)}
                                           placeholder="Search for groups"
                                           className="pt-fill"/>
                            </div>
                        </label>
                        <label>

                        </label>
                        <label className="pt-label">
                            <p>Type</p>
                            <Switch checked={this.state.isAdmin} label="Is admin?"
                                    onChange={() => this.setState({isAdmin: !isAdmin})}/>
                        </label>
                    </div>
                </div>

                <hr/>
                <p>
                    <button className="pt-button" disabled={buttonDisabled} onClick={this.handleCreation}>Add user
                    </button>
                </p>
            </div>
        );
    }
}

export default UserForm;
