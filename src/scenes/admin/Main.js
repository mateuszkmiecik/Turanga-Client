import React, {
    Component,
} from 'react';

import {Link} from 'react-router'

class Main extends Component {
    render() {
        return (
            <div className="row full-height">
                <div className="col-sm-2">
                    <div className="list-group">
                        <Link to="/" className="list-group-item"> <i className="fa fa-home" /> Dashboard</Link>
                        <Link to="/categories" className="list-group-item"> <i className="fa fa-reorder" /> Categories</Link>
                        <Link to="/databases" className="list-group-item"> <i className="fa fa-database" /> Databases</Link>
                    </div>
                </div>
                <div className="col-sm-10 full-height">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Main;
