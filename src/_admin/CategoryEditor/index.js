import React, {Component} from 'react'
import {Link} from 'react-router'
import {Switch} from '@blueprintjs/core'
import c from 'classnames'
import ReactQuill from 'react-quill'
import uuid from 'uuid'

import API from '../../services/API'

import {Content, Sidebar} from '../../components'

import TaskEditor from './TaskEditor'


const exampleTask = () => ({
    taskId: uuid.v4(),
    name: 'Example exercise',
    description: '<p>Example description</p>',
    query: 'SELECT field FROM table'
});

class CategoryEditor extends Component {


    constructor(props) {
        super(props)

        this.state = {
            name: '',
            tasks: [],
            saved: true,
            hidden: false,
            description: '',
            selectedTaskIndex: -1,
            quillEditors: {}
        };

        this.addNewTask = this.addNewTask.bind(this)
        this.changeTaskAtSelectedIndex = this.changeTaskAtSelectedIndex.bind(this)
        this.updateCategory = this.updateCategory.bind(this)
    }

    componentDidMount() {
        let {params: {id}, location: {query}} = this.props;

        window.onbeforeunload = null;

        if (id) {
            API.get(`/categories/${id}`).then(category => {
                const {tasks} = category;

                let newState = {
                    ...category
                };
                let obj = (tasks || []).find(e => e.taskId === query.task);

                if (!!obj) {
                    newState.selectedTaskIndex = tasks.indexOf(obj);
                }

                this.setState(newState)
            })
        }
    }

    componentWillUnmount() {
        window.onbeforeunload = null;
    }


    addNewTask() {
        let newTask = exampleTask();
        let newTaskList = [...this.state.tasks, newTask];
        this.props.router.push(`/categories/${this.props.params.id}?task=${newTask.taskId}`);
        this.setState({
            saved: false,
            editedDescription: newTask.description,
            tasks: newTaskList,
            selectedTaskIndex: newTaskList.length - 1
        })
    }

    updateCategory() {
        const {id} = this.props.params;
        const {tasks, name, description, hidden} = this.state;

        let category = {
            name, tasks, description, hidden
        };

        API.put(`/categories/${id}`, category).then(() => {
            window.onbeforeunload = null;
            this.setState({
                saved: true
            })
        });
    }


    changeTaskAtSelectedIndex(field, value){
        let {tasks, selectedTaskIndex: idx} = this.state;
        let beforePart = tasks.slice(0,idx), afterPart = tasks.slice(idx+1, tasks.length);
        let changedTask = tasks[idx];
        changedTask[field] = value;
        this.setState({
            saved: false,
            tasks: [...beforePart, {...changedTask}, ...afterPart]
        })
    }


    render() {

        if (!window.onbeforeunload && !this.state.saved) {
            window.onbeforeunload = function () {
                return "You have unsaved data. Are you sure you want to proceed?"
            }
        }

        const {tasks, name, selectedTaskIndex} = this.state;
        let {params: {id}, location: {query}} = this.props;


        return (
            <div className="row full-height">

                <Content col="4">
                    <div className="panel full-height">
                        <div className="panel-body full-height">

                            <p>
                                <button className="pull-right pt-button pt-large">
                                    <i className="fa fa-ellipsis-v"/>
                                </button>

                                <Link to="/" className="pt-large pt-button space-right">
                                    <i className="fa fa-arrow-left"/>
                                </Link>
                                <button className="pt-button pt-large pt-intent-primary space-right"
                                        onClick={this.updateCategory}>Save category
                                </button>
                            </p>

                            <hr/>

                            {this.state.hidden ? <div className="pt-tag pt-intent-warning pull-right">
                                    HIDDEN
                                </div> : null }
                            <p>
                                <label>Category name:</label>
                                <input type="text"
                                       className="pt-input pt-fill"
                                       placeholder="Category Name"
                                       onChange={(e) => this.setState({
                                           saved: false,
                                           name: e.target.value
                                       })}
                                       value={name}/>

                                <Switch checked={this.state.hidden} label="Hidden"
                                        className="pt-inline space-top"
                                        onChange={(e) => this.setState({
                                            saved: false,
                                            hidden: !this.state.hidden
                                        })}/>
                            </p>

                            <hr/>

                            <p>Description:</p>
                            <ReactQuill onChange={(e) => this.setState({
                                description: e,
                                quillEditors: {
                                    ...this.state.quillEditors,
                                    catDesc: true
                                },
                                saved: !this.state.quillEditors['catDesc'] || false
                            })} value={this.state.description} theme="snow"/>


                        </div>

                    </div>
                </Content>

                <Sidebar col="8" style={{padding: '20px 20px 20px 270px'}}>
                    <div className="exercises-list full-height">
                        <button className="pt-button pt-intent-primary" onClick={this.addNewTask}>
                            Add new exercise
                        </button>

                        <div className="list full-height">
                            {tasks.map((t, idx) => (
                                <Link to={`/categories/${id}?task=${t.taskId}`} onClick={() => this.setState({
                                    selectedTaskIndex: idx,
                                    quillEditors: {},
                                    saved: true
                                })} className={c({"exercise-entry": true, "active": query.task === t.taskId})}
                                      key={idx}>
                                    <span className="number">{idx + 1}</span>
                                    {t.name}
                                </Link>
                            ))}
                            {tasks.length === 0 ? <p style={{padding: '0 10px'}}><i className="fa fa-arrow-up"/> Add new exercise</p> : null}
                        </div>

                    </div>
                    <div className="relative full-height">

                        {this.state.selectedTaskIndex < 0 ? 'Select task from list on the left.' : <TaskEditor task={tasks[selectedTaskIndex]} onChange={this.changeTaskAtSelectedIndex}/>}
                    </div>
                </Sidebar>
            </div>
        )
    }

}

export default CategoryEditor