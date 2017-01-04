import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';

import 'quill/dist/quill.snow.css';

import '@blueprintjs/core/dist/blueprint.css'
import '@blueprintjs/table/dist/table.css'

import './less/style.less';


import { FocusStyleManager } from "@blueprintjs/core";

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
