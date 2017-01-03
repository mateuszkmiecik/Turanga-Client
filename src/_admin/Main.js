import React from 'react';
import {SideMenu, Sidebar} from '../components'

const menuItems = [{
    url: '/',
    text: 'Dashboard',
    iconClass: 'fa-home'
}, {
    url: '/results',
    iconClass: 'fa-reorder',
    text: 'Results'
}, {
    url: '/databases',
    iconClass: 'fa-database',
    text: 'Databases'
}, {
    url: '/users',
    iconClass: 'fa-users',
    text: 'Users'
}];

export default ({children}) => (
    <div className="row full-height">
        <SideMenu menu={menuItems}/>
        {children}
        {/*<Sidebar style={{padding: '20px'}}>*/}
            {/*<h3>Quick actions</h3>*/}

        {/*</Sidebar>*/}
    </div>
);
