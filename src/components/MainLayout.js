import React  from 'react'
import Auth from '../services/Auth'
import {hashHistory} from 'react-router'

function navigate(){
    hashHistory.push('/')
}

export default ({loggedIn, children}) => (
    <div className="full-height">
        <div className="header">
            <div className="col-sm-6">
                <h1 className="logo clickable" onClick={navigate}>Turanga</h1>
            </div>
            <div className="col-sm-6 text-right">
                {loggedIn ? <button onClick={Auth.logout} className="pt-button pt-intent-primary">Logout</button> : null }
            </div>
        </div>
        <div className="content full-height">
            {children}
        </div>
    </div>
);
