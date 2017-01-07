import React, {Component} from 'react';
import {Tab, TabList, TabPanel, Tabs, Alert} from "@blueprintjs/core";

import API from '../../services/API'
import {Content} from '../../components'

import UsersList from './UsersList'
import GroupsList from './GroupsList'
import reducer, * as actions from './reducer'

class index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fetching: {
                users: false,
                groups: false
            },
            users: [],
            groups: []
        };

        this.dispatch = this.dispatch.bind(this);
        this.showAlert = this.showAlert.bind(this);

        this.createGroup = this.createGroup.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.receiveGroups = this.receiveGroups.bind(this);

        this.receiveUsers = this.receiveUsers.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    componentDidMount() {
        this.receiveGroups();
        this.receiveUsers();
    }

    dispatch(event) {
        this.setState(reducer(event, this.state));
    }

    createGroup(group) {
        if (!group.name) {
            return false;
        }

        return API.post('/groups', group).then(this.receiveGroups).catch(() => {
            this.showAlert(`Group ${group.name} already exists.`);
        });
    }

    deleteGroup(group) {
        return API.delete(`/groups/${group._id}`).then(() => {
            this.receiveGroups()
            this.receiveUsers()
        })
    }


    receiveGroups() {
        this.dispatch({
            type: actions.REQUEST_GROUPS
        });

        API.get('/groups').then(groups => this.dispatch({
            type: actions.RECEIVE_GROUPS,
            groups
        }))
    }


    createUser(user) {
        if (!user.username || !user.password) {
            return false;
        }

        return API.post('/users', user).then(this.receiveUsers).catch(() => {
            this.showAlert(`User ${user.username} already exists.`);
        });
    }

    deleteUser(user) {
        return API.delete(`/users/${user._id}`).then(this.receiveUsers).catch(() => {
            this.showAlert('User can not delete himself.');
        })
    }

    receiveUsers() {
        this.dispatch({
            type: actions.REQUEST_USERS
        });

        API.get('/users').then(users => this.dispatch({
            type: actions.RECEIVE_USERS,
            users
        }));
    }


    showAlert(text) {
        this.setState({
            isAlertOpened: true,
            alertText: text
        })
    }

    render() {
        const {users, groups} = this.state;

        return (
            <Content col="10">
                <div className="panel full-height">
                    <div className="panel-body full-height relative">
                        <Tabs className="full-height">
                            <TabList className="pt-large">
                                <Tab>Users</Tab>
                                <Tab>Groups</Tab>
                            </TabList>
                            <TabPanel>
                                <UsersList users={users} onCreate={this.createUser} onDelete={this.deleteUser}/>
                            </TabPanel>
                            <TabPanel>
                                <GroupsList groups={groups} onCreate={this.createGroup} onDelete={this.deleteGroup}/>
                            </TabPanel>
                        </Tabs>

                    </div>
                </div>
                <Alert isOpen={this.state.isAlertOpened} confirmButtonText="Okay" onConfirm={() => this.setState({
                    isAlertOpened: false
                })}>
                    <p>{this.state.alertText}</p>
                </Alert>
            </Content>
        );
    }
}
export default index;
