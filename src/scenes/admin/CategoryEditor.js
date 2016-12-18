import React, {Component} from 'react'

import c from 'classnames'
import {Link} from 'react-router'

import Categories from '../../services/Categories'
import TaskEditor from '../../components/TaskEditor'


class CategoryEditor extends Component {


    constructor(props) {
        super(props)

        this.state = {
            category: {
                name: '',
                tasks: []
            }
        };

        this.handleCategoryNameChange = this.handleCategoryNameChange.bind(this)
        this.addNewTask = this.addNewTask.bind(this)
    }

    componentDidMount() {
        const {id} = this.props.params;
        if (id) {
            Categories.getCategory(id).then(category => this.setState({
                category: {
                    ...this.state.category,
                    ...category
                }
            }))
        }
    }

    handleCategoryNameChange(e) {
        this.setState({
            category: {
                ...this.state.category,
                name: e.target.value
            }
        })
    }

    addNewTask(task) {
        const {id} = this.props.params;

        let category = {
            ...this.state.category,
            tasks: [...this.state.category.tasks, task]
        };

        Categories.updateCategory(id, category).then(() => this.setState({
            category
        }));
    }

    render() {
        const {category} = this.state;
        return (
            <div>
                <div className="row runner full-height">
                    <div className="col-sm-2">
                        <Link to="/categories" className="btn btn-block btn-default space-bottom">Back to Categories</Link>
                        <div className="task-list list-group">
                            {category.tasks.map((task, idx) => (
                                <a key={idx}
                                   className={c({"list-group-item": true, "active": idx === 0})}>{task.description}</a>
                            ))}
                        </div>
                    </div>

                    <div className="col-sm-5 full-height">
                        <h3>Category Details</h3>
                        <p><label>Category name:</label>
                            <input type="text"
                                   className="form-control"
                                   placeholder="Category Name"
                                   onChange={this.handleCategoryNameChange}
                                   value={category.name}/></p>

                        <div className="panel panel-default">
                            <div className="panel-heading">Category tasks</div>


                            {!category.tasks.length ? (
                                    <div className="panel-body">
                                        <p>No tasks yet.</p>
                                    </div>
                                ) : (
                                    <table className="table table-bordered">
                                        <tbody>
                                        {category.tasks.map((t, idx) => {
                                            return <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>
                                                    <pre>{t.query}</pre>
                                                </td>
                                                <td>
                                                    {t.description}
                                                </td>
                                            </tr>
                                        })}
                                        </tbody>
                                    </table>
                                )}

                        </div>


                    </div>
                    <div className="col-sm-5 full-height">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">
                                    Add new task

                                </h3>
                            </div>
                            <div className="panel-body">
                                <TaskEditor onSubmit={this.addNewTask}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default CategoryEditor