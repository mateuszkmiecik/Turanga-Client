import React, {Component} from 'react'
import {Link} from 'react-router'
import CodeMirror from 'react-codemirror'
import {Switch} from '@blueprintjs/core'

import {onInputChange} from '../../services/utils'
import Categories from '../../services/Categories'

import {RichEditor, Content, Sidebar} from '../../components'

import ReactQuill from 'react-quill'

const exampleTask = () => ({description: '<p>Example description</p>', query: 'SELECT field FROM table'});

class CategoryEditor extends Component {


    constructor(props) {
        super(props)

        this.state = {
            name: '',
            tasks: [],
            saved: true,
            description: '',
            selected: false,
            index: 0
        };

        this.handleCategoryNameChange = this.handleCategoryNameChange.bind(this)
        this.handleTaskChange = this.handleTaskChange.bind(this)
        this.addNewTask = this.addNewTask.bind(this)
        this.updateCategory = this.updateCategory.bind(this)
    }

    componentDidMount() {
        const {id} = this.props.params;
        if (id) {
            Categories.getCategory(id).then(category => {
                if (!category.tasks || !category.tasks.length) {
                    category.tasks = [];
                    category.tasks.push(exampleTask());
                }
                this.setState({
                    ...category,
                    selected: category.tasks[0]
                })
            })
        }
    }

    addNewTask() {
        let newTask = exampleTask();
        this.setState({
            saved: false,
            editedDescription: newTask.description,
            tasks: [...this.state.tasks, newTask]
        })
    }

    handleCategoryNameChange(e) {
        this.setState({
            saved: false,
            name: e.target.value
        })
    }

    updateCategory() {
        const {id} = this.props.params;
        const {tasks, name, description} = this.state;

        let category = {
            name, tasks, description
        };

        Categories.updateCategory(id, category).then(() => this.setState({
            saved: true
        }));
    }

    handleTaskChange(index) {
        this.setState({
            selected: this.state.category.tasks[index],
            index: index
        })
    }

    render() {
        if (!window.onbeforeunload && !this.state.saved) {
            window.onbeforeunload = function () {
                return "You have unsaved data. Are you sure you want to proceed?"
            }
        }

        const {tasks, name} = this.state;
        let {id} = this.props.params;

        let categoryTasksMenu = (tasks || []).map((task, idx) => ({
            url: `/categories/${id}?task=${idx}`,
            text: task.description.replace(/<(?:.|\n)*?>/gm, '')
        }))

        return (
            <div className="row runner full-height">

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

                            {this.state.saved ? null : <p>Changes have been made.</p>}
                            <hr/>

                            <div className="pt-tag pt-intent-warning pull-right">
                                HIDDEN
                            </div>
                            <p>
                                <label>Category name:</label>
                                <input type="text"
                                       className="pt-input pt-fill"
                                       placeholder="Category Name"
                                       onChange={this.handleCategoryNameChange}
                                       value={name}/>

                                <Switch checked={this.state.isPublic} label="Hidden"
                                        className="pt-inline space-top"
                                        onChange={this.handlePublicChange}/>
                            </p>

                            <hr/>

                            <p>Description:</p>
                            <ReactQuill onChange={(e) => this.setState({
                                description: e,
                                pristine: false
                            })} value={this.state.description} theme="snow"/>


                        </div>

                    </div>
                </Content>

                <Sidebar col="8" style={{padding: 20}}>
                    <div className="row full-height">
                        <div className="col-sm-6">

                        </div>
                        <div className="col-sm-6">
                            <div className="panel-body half-height relative">

                                <label className="small-label">Task description</label>
                            </div>
                            <div className="panel-body half-height relative full-codemirror">
                                <label className="small-label">Task query</label>
                                {this.state.selected ?
                                    <CodeMirror value={(this.state.selected || {}).query}
                                                onChange={onInputChange.call(this, 'task', 'query', true)}
                                                options={{
                                                    lineNumbers: true,
                                                    mode: 'text/x-mssql'
                                                }}/> : null }
                            </div>
                        </div>
                    </div>
                </Sidebar>
            </div>
        )
    }

}

export default CategoryEditor