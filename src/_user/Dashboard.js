import React, {Component} from 'react'
import API from '../services/API'
import {hashHistory} from 'react-router'
import {SideMenu, Sidebar, Content} from '../components'

class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            list: []
        }
        this.refreshList = this.refreshList.bind(this)
        this.runCategory = this.runCategory.bind(this)

        this.menuItems = [{
            url: '/',
            iconClass: 'fa-home',
            text: 'Dashboard'
        }, {
            url: '/results',
            iconClass: 'fa-info',
            text: 'Results'
        }]
    }

    componentDidMount() {
        this.refreshList()
    }

    refreshList() {
        API.get('/categories').then(categories => this.setState({list: categories}))
    }

    runCategory(id) {
        hashHistory.push(`/runner/${id}`)
    }

    render() {
        return (
            <div className="row full-height">
                <SideMenu menu={this.menuItems}/>
                <Content col="10">
                    <div className="panel full-height">
                        <div className="panel-body full-height">
                            <h3>Available categories</h3>

                            {this.state.list.filter(cat => cat.tasks && cat.tasks.length > 0).map(category => (
                                <div className="pt-card pt-elevation-0 pt-interactive" key={category._id}
                                     onClick={() => this.runCategory(category._id)}
                                     style={{marginBottom: 10, marginRight: 10, width: '40%'}}>
                                    <h5><a href="#"
                                           onClick={(e) => {
                                               e.preventDefault();
                                               this.runCategory(category._id)
                                           }}>{category.name}</a></h5>
                                    <p>{category.tasks.length} tasks</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </Content>
                <Sidebar style={{paddingTop: 20}}>
                    <h3>Find test</h3>
                    <div className="pt-input-group .modifier">
                        <span className="pt-icon pt-icon-search"/>
                        <input type="text" className="pt-input" placeholder="Search"/>
                        <button className="pt-button pt-minimal pt-intent-primary pt-icon-arrow-right"/>
                    </div>
                </Sidebar>
            </div>
        )
    }
}

export default Dashboard