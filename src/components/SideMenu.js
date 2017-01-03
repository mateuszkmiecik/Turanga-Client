import React from 'react';
import {Link} from 'react-router';

export default ({menu = [], className, children}) => (
    <div className={["col-sm-2 full-height",  className].join(' ')} style={{paddingTop: 20}}>
        {children}
        <div className="list-group">
            {menu.map((menuItem, idx) => (
                <Link key={idx} to={menuItem.url} className="list-group-item"> <i className={`fa ${menuItem.iconClass}`} /> {menuItem.text}</Link>
            ))}
        </div>
    </div>
)