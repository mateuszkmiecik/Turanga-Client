import React, {Component} from 'react';
import {Tab, TabList, TabPanel, Tabs} from "@blueprintjs/core";

import API from '../../services/API'
import {Content} from '../../components'

import UsersList from './UsersList'
import reducer, * as actions from './reducer'

class index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fetching: false,
            users: []
        };

        this.dispatch = this.dispatch.bind(this)
    }

    componentDidMount(){
        this.dispatch({
            type: actions.REQUEST_USERS
        });

        API.get('/users').then(users => this.dispatch({
            type: actions.RECEIVE_USERS,
            users
        }))

    }

    dispatch(event) {
        this.setState(reducer(event, this.state));
    }

    render() {
        const {users} = this.state;

        return (
            <Content col="10">
                <div className="panel full-height">
                    <div className="panel-body">
                        <Tabs>
                            <TabList className="pt-large">
                                <Tab>Users</Tab>
                                <Tab>Groups</Tab>
                            </TabList>
                            <TabPanel>
                                <UsersList users={users} />
                            </TabPanel>
                            <TabPanel>
                                Groups panel
                            </TabPanel>
                        </Tabs>

                    </div>
                </div>
            </Content>
        );
    }
}
export default index;
