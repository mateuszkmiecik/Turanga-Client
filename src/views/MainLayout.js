import React  from 'react'

import Auth from '../services/Auth'

const MainLayout = (props) => (
    <div>
        <div className="header">
            <div className="col-sm-6">
                <h1 className="logo">Turanga</h1>
            </div>
            <div className="col-sm-6 text-right">
                <button onClick={Auth.logout} className="btn btn-primary">Logout</button>
            </div>
        </div>
        <div className="content">
            {props.children}
        </div>
    </div>
);
export default MainLayout;
