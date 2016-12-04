import React  from 'react'
import {Link} from 'react-router'

import Auth from '../services/Auth'


const MainLayout = (props) => (
    <div>
        <div className="main-menu">
            <h1>Turanga</h1>
            <ul>
                <li><Link to="/">Tasks</Link></li>
                <li><Link to="/databases">Databases</Link></li>
            </ul>

        </div>
        <div className="main-app">
            <div className="clearfix">
                <button onClick={Auth.logout} className="btn btn-primary pull-right">Logout</button>
            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    </div>
);
export default MainLayout;
