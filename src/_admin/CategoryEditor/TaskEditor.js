import React from 'react';

import ReactQuill from 'react-quill'
import CodeMirror from 'react-codemirror'

import Select from 'react-select'

import TagInput from '../../components/TagInput'

const TaskEditor = ({task, onChange, onDelete, databases}) => (
    <div className="row" style={{paddingLeft: 30}}>
        <div className="col-sm-10">
            <button className="pull-right pt-button pt-small" onClick={() => onDelete()}>
                <i className="fa fa-trash"/>
            </button>

            <label className="pt-label">
                Task name:
                <input type="text" className="pt-input" value={task.name}
                       onChange={(e) => onChange('name', e.target.value)}/>
            </label>

            <label className="pt-label">
                DB engines:
                <Select multi={true} value={task.engineDB} labelKey={"name"}
                        onChange={dbs => onChange('engineDB', dbs)} options={databases}/>
            </label>



            <label className="pt-label">
                Description:
            </label>

            <ReactQuill theme="snow" value={task.description} onChange={(e) => onChange('description', e)}/>

            <label className="pt-label">Proper query</label>
            <div
                style={{marginLeft: -30, marginBottom: 10}}>
                <CodeMirror value={task.correctQuery}
                            onChange={(e) => onChange('correctQuery', e)}
                            options={{
                                lineNumbers: true,
                                mode: 'text/x-mssql'
                            }}/>
            </div>

            <label className="pt-label">
                Required words:
            </label>

            <TagInput tags={task.requiredWords} onChange={words => onChange('requiredWords', words)} style={{marginBottom: 10}}/>

            <label className="pt-label">
                Forbidden words:
            </label>

            <TagInput tags={task.forbiddenWords} onChange={words => onChange('forbiddenWords', words)}/>
        </div>
    </div>
)


export default TaskEditor;
