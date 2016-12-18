import React, {Component} from 'react'
import CodeMirror from 'react-codemirror'
import TinyMCE from 'react-tinymce'

import {onInputChange} from '../services/utils'

class TaskEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            task: {
                query: '',
                description: ''
            }
        };

        this.submit = this.submit.bind(this)
    }

    submit(){
        this.props.onSubmit(this.state.task);
        this.setState({
            task: {
                query: '',
                description: ''
            }
        })
    }

    render(){
        return (
            <div className="task-editor">
                <button className="btn btn-default pull-right" onClick={this.submit}>Save</button>

                <div>
                    <label>Correct task query:</label>
                    <CodeMirror value={this.state.task.query} onChange={onInputChange.call(this, 'task', 'query', true)} options={{lineNumbers: true, mode: 'text/x-mssql'}}/>
                </div>
                <p>
                    <label>Task description:</label>
                    {/*<TinyMCE*/}
                        {/*config={{*/}
                            {/*plugins: 'autolink link image lists print preview',*/}
                            {/*toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'*/}
                        {/*}}*/}
                    {/*/>*/}
                    <textarea value={this.state.task.description} onChange={onInputChange.call(this, 'task', 'description')} className="form-control" cols="30" rows="10"/>
                </p>

            </div>
        )
    }
};

export default TaskEditor;