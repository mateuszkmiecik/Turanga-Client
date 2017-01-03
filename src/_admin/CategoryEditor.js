import React, {Component} from 'react'
import {Link} from 'react-router'
import CodeMirror from 'react-codemirror'
import {Switch} from '@blueprintjs/core'

import {onInputChange} from '../services/utils'
import Categories from '../services/Categories'

import {RichEditor, SideMenu, Content, Sidebar} from '../components'

const exampleTask = () => ({description: '<p>Example description</p>', query: 'SELECT field FROM table'});

class CategoryEditor extends Component {


    constructor(props) {
        super(props)

        this.state = {
            name: '',
            tasks: [],
            saved: true,
            editedDescription: '',
            selected: false,
            index: 0
        };

        this.handleCategoryNameChange = this.handleCategoryNameChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
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
                    selected: category.tasks[0],
                    editedDescription: category.tasks[0].description
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

    handleDescriptionChange(e){
        this.setState({
            editedDescription: e
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
        const {tasks, name} = this.state;

        let category = {
            name, tasks
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
        const {tasks, name} = this.state;
        let {id} = this.props.params;

        let categoryTasksMenu = (tasks || []).map((task, idx) => ({
            url: `/categories/${id}?task=${idx}`,
            text: task.description.replace(/<(?:.|\n)*?>/gm, '')
        }))

        return (
            <div className="row runner full-height">
                <SideMenu menu={categoryTasksMenu} activeIndex={this.state.index}>
                    <Link to="/" className="pt-button pt-fill space-bottom">Back to categories</Link>
                    <button className="pt-button pt-intent-primary pt-fill space-bottom" onClick={this.addNewTask}>Add
                        new task
                    </button>
                </SideMenu>


                <Content>
                    <div className="panel full-height">
                        <div className="panel-body half-height relative">
                            <label className="small-label">Task description</label>
                            {this.state.selected ? <RichEditor value={this.state.editedDescription}
                                                               onChange={this.handleDescriptionChange}/> : null }
                        </div>
                        <div className="panel-body half-height relative full-codemirror">
                            <label className="small-label">Task query</label>
                            {this.state.selected ? <CodeMirror value={(this.state.selected || {}).query}
                                                               onChange={onInputChange.call(this, 'task', 'query', true)}
                                                               options={{
                                                                   lineNumbers: true,
                                                                   mode: 'text/x-mssql'
                                                               }}/> : null }
                        </div>
                    </div>
                </Content>

                <Sidebar style={{padding: 20}}>
                    <p>
                        <button className="pt-button pt-large pt-intent-primary space-right" onClick={this.updateCategory}>Save category</button>
                        {this.state.saved ? null : 'Changes have been made.'}
                    </p>
                    <hr/>
                    <p><label>Category name:</label>
                        <input type="text"
                               className="pt-input pt-fill"
                               placeholder="Category Name"
                               onChange={this.handleCategoryNameChange}
                               value={name}/></p>

                    <div className="row">
                        <div className="col-sm-6">
                            <p><label>Category type:</label>
                                <label className="pt-control pt-radio .modifier">
                                    <input type="radio" name="docs-radio-regular"/>
                                    <span className="pt-control-indicator"/>
                                    Simple test
                                </label><label className="pt-control pt-radio .modifier">
                                    <input type="radio" name="docs-radio-regular"/>
                                    <span className="pt-control-indicator"/>
                                    Exam test
                                </label>
                            </p>
                        </div>
                        <div className="col-sm-6">
                            <label>&nbsp;</label>
                            <Switch checked={this.state.isPublic} label="Hidden" onChange={this.handlePublicChange} />
                        </div>
                    </div>
                </Sidebar>
            </div>
        )
    }

}

export default CategoryEditor