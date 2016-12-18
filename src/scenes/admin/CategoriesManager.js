import React, {Component} from 'react'
import {Link} from 'react-router'

import Categories from '../../services/Categories'

class CategoriesManager extends Component {


    constructor(props) {
        super(props)

        this.state = {
            list: [],
            newCategoryName: ''
        };

        this.handleNewCategoryNameChange = this.handleNewCategoryNameChange.bind(this)
        this.createNewCategory = this.createNewCategory.bind(this)
        this.refreshList = this.refreshList.bind(this)
    }

    componentDidMount() {
        this.refreshList()
    }

    refreshList() {
        Categories.getCategories().then(categories => this.setState({list: categories}))
    }

    handleNewCategoryNameChange(e) {
        this.setState({newCategoryName: e.target.value})
    }

    createNewCategory() {
        let {newCategoryName} = this.state;
        if (!!newCategoryName) {
            Categories.createCategory(newCategoryName).then(this.refreshList)
        }
    }

    render() {
        return (
            <div className="panel full-height">
                <div className="panel-body">
                    <div className="row space-bottom">
                        <div className="col-sm-6">
                            <h3>Categories</h3>
                        </div>
                        <div className="col-sm-6">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Enter new category name"
                                       value={this.state.newCategoryName} onChange={this.handleNewCategoryNameChange}/>
                                <span className="input-group-btn">
                            <button onClick={() => this.createNewCategory()} className="btn btn-default">
                                <i className="fa fa-plus"/> add new
                            </button>
                            </span>
                            </div>
                        </div>
                    </div>

                    <div className="boxes-list">
                        {this.state.list.map(b => (
                            <div key={b._id} className="box">
                                <Link to={`/categories/${b._id}`} className="edit btn btn-default"><i className="fa fa-edit"/>
                                    Edit</Link>
                                <h3>{b.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        )
    }
}

export default CategoriesManager