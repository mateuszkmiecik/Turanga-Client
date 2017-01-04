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
        this.receiveGroups = this.receiveGroups.bind(this);

        this.receiveUsers = this.receiveUsers.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    componentDidMount(){
        this.receiveGroups();
        this.receiveUsers();
    }

    dispatch(event) {
        this.setState(reducer(event, this.state));
    }

    createGroup(group){
        if(!group.name){
            return false;
        }

        console.log(group)
    }

    receiveGroups(){
        this.dispatch({
            type: actions.RECEIVE_GROUPS
        });

        API.get('/groups').then(groups => this.dispatch({
            type: actions.RECEIVE_GROUPS,
            groups
        }))
    }

    createUser(user){
        if(!user.username || !user.password){
            return false;
        }

        return API.post('/users', user).then(this.receiveUsers).catch(() => {
            this.showAlert(`User ${user.username} already exists.`);
        });
    }
    receiveUsers(){
        this.dispatch({
            type: actions.REQUEST_USERS
        });

        API.get('/users').then(users => this.dispatch({
            type: actions.RECEIVE_USERS,
            users
        }));
    }


    showAlert(text){
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
                                <UsersList users={users} onCreate={this.createUser} onEdit={this.editUser} onDelete={this.deleteUser} />
                            </TabPanel>
                            <TabPanel>
                                <GroupsList groups={groups} onCreate={this.createGroup} />
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