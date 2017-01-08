import React from 'react';

import ReactQuill from 'react-quill'
import CodeMirror from 'react-codemirror'

import TagInput from '../../components/TagInput'
import Typeahead from '../../components/Typeahead'

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
                Databases:
                <div>
                    {!!task.engineDB ?
                        <div className="pt-tag">{task.engineDB.name}</div>
                        : null }

                </div>
                <Typeahead items={databases} onValueSelect={e => onChange('engineDB', e)} renderer={db => db.name}/>
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
