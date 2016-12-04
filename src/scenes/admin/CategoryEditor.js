import React, {Component} from 'react'

import Categories from '../../services/Categories'

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

    render() {
        const {category} = this.state;
        return (
            <div>
                <div className="row">
                    <div className="column">
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
                                <table className="table">...</table>
                            )}

                        </div>


                    </div>
                    <div className="column">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">
                                    Add new task
                                    <button className="btn btn-default btn-xs pull-right">Save</button>
                                </h3>
                            </div>
                            <div className="panel-body">

                                <p>
                                    <label>Correct task query:</label>
                                    <textarea className="form-control" cols="30" rows="10"/>
                                </p>
                                <p>
                                    <label>Task description:</label>
                                    <textarea className="form-control" cols="30" rows="10"/>
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default CategoryEditor