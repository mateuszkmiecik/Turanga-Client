import React from 'react';
import {SideMenu} from '../components'

const menuItems = [{
    url: '/',
    text: 'Dashboard',
    iconClass: 'fa-home'
}, {
    url: '/results',
    iconClass: 'fa-tasks',
    text: 'Results'
}];

export default ({children}) => (
    <div className="row full-height">
        <SideMenu menu={menuItems}/>
        {children}
    </div>
);
