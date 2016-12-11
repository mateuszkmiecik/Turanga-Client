import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';


import './less/style.less';


ReactDOM.render(
    <App />,
    document.getElementById('root')
);
