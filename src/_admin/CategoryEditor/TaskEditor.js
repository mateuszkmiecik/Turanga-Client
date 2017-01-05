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
                DB engines:
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
                Allowed words:
            </label>

            <TagInput tags={task.allowedWords} onChange={words => onChange('allowedWords', words)} style={{marginBottom: 10}}/>

            <label className="pt-label">
                Restricted words:
            </label>

            <TagInput tags={task.restrictedWords} onChange={words => onChange('restrictedWords', words)}/>
        </div>
    </div>
)


export default TaskEditor;
