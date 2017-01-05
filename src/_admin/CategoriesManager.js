import React from 'react'
import {Link, hashHistory} from 'react-router'
import {Alert} from '@blueprintjs/core'

import {Content} from '../components'
import EditableComponent from '../components/EditableComponent'

import Categories from '../services/Categories'

class CategoriesManager extends EditableComponent {

    constructor(props) {
        super(props)

        this.state = {
            list: [],
            listCopy: [],
            newCategoryName: '',
            filter: ''
        };

        this.handleNewCategoryNameChange = this.handleNewCategoryNameChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.createNewCategory = this.createNewCategory.bind(this)
        this.refreshList = this.refreshList.bind(this)
        this.showAlert = this.showAlert.bind(this)
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

    handleFilterChange(e) {
        const {list} = this.state;
        console.log(list.filter(task => task.name.toLowerCase().includes(e.target.value.toLowerCase())))
        this.setState({
            filter: e.target.value,
            listCopy: list.filter(task => task.name.toLowerCase().includes(e.target.value.toLowerCase()))
        })
    }

    createNewCategory() {
        let {newCategoryName} = this.state;
        if (!!newCategoryName) {
            Categories.createCategory(newCategoryName).then(this.refreshList).catch((err) => {
                this.showAlert(err.response.body.message || 'An error occured. Please try again later.');
            })
        }
    }



    showAlert(text){
        this.setState({
            isAlertOpened: true,
            alertText: text
        })
    }

    render() {
        return (
            <Content col="10">
                <div className="panel full-height">
                    <div className="panel-body">
                        <div className="row space-bottom">
                            <div className="col-sm-6">
                                <h3>Categories</h3>
                            </div>
                            <div className="col-sm-6">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Enter new category name"
                                           value={this.state.newCategoryName}
                                           onChange={this.handleNewCategoryNameChange}/>
                                    <span className="input-group-btn">
                                        <button onClick={() => this.createNewCategory()} className="btn btn-default">
                                            <i className="fa fa-plus"/> add new
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="action-bar">
                            Filter categories: <input type="text" value={this.state.filter}
                                                      onChange={this.handleFilterChange}
                                                      className="pt-input space-left space-right"
                                                      placeholder="Type to filter..."/>
                            {this.state.filter.length ?
                                <button type="button" className="pt-button pt-minimal pt-icon-cross"
                                        onClick={() => this.handleFilterChange({target: {value: ''}})}>Clear filter
                                </button> : null }
                        </div>

                        {(this.state.filter.length ? this.state.listCopy : this.state.list).map(category => (
                            <div className="pt-card pt-elevation-0 pt-interactive" key={category._id}
                                 onClick={() => hashHistory.push(`/categories/${category._id}`)}
                                 style={{marginBottom: 10, marginRight: 10, width: '40%', float: 'left'}}>
                                <h5><Link to={`/categories/${category._id}`}>{category.name}</Link></h5>
                                <p>{(category.tasks || []).length} tasks</p>
                            </div>
                        ))}
                    </div>
                </div>

                <Alert isOpen={this.state.isAlertOpened} confirmButtonText="Okay" onConfirm={() => this.setState({
                    isAlertOpened: false
                })}>
                    <p>{this.state.alertText}</p>
                </Alert>
            </Content>

        )
    }
}

export default CategoriesManager