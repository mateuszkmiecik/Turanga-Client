import React from 'react';
import {SideMenu} from '../components'

const menuItems = [{
    url: '/',
    text: 'Categories',
    iconClass: 'fa-reorder'
}, {
    url: '/results',
    iconClass: 'fa-tasks',
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
    </div>
);
