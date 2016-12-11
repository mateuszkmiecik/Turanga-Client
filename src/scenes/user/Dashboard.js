import React, {Component} from 'react'
import Categories from '../../services/Categories'
import {hashHistory} from 'react-router'

class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            list: []
        }
        this.refreshList = this.refreshList.bind(this)
        this.runCategory = this.runCategory.bind(this)
    }

    componentDidMount(){
        this.refreshList()
    }

    refreshList() {
        Categories.getCategories().then(categories => this.setState({list: categories}))
    }

    runCategory(id) {
        hashHistory.push(`/runner/${id}`)
    }

    render(){
        return (
            <div className="row">
                <div className="col-sm-8">
                <h3>Available categories</h3>

                {this.state.list.filter(cat => cat.tasks && cat.tasks.length > 0).map(category => (
                    <div className="category" key={category._id}>
                        <button className="btn btn-primary btn-lg pull-right" onClick={() => this.runCategory(category._id)}>Start</button>

                        <h4>{category.name}</h4>
                        <p>{category.tasks.length} tasks</p>
                    </div>
                ))}
            </div>
                <div className="col-sm-4">
                    <h3>Find test</h3>
                    <input type="text" className="form-control"/>
                </div>
            </div>
        )
    }
}

export default Dashboard