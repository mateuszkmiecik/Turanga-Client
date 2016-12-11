import React, {Component} from 'react'

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
                <div className="row">
                    <div className="col-sm-8">
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
                    <div className="col-sm-4">
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