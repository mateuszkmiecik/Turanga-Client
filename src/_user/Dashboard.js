import React, {Component} from 'react'
import API from '../services/API'
import {Link} from 'react-router'
import {Sidebar, Content} from '../components'

class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            list: [],

            // sidebar
            findExamInput: '',
            foundExams: []
        };
        this.refreshList = this.refreshList.bind(this)
        this.handleExamSearch = this.handleExamSearch.bind(this)

    }

    componentDidMount() {
        this.refreshList()
    }

    refreshList() {
        API.get('/categories').then(categories => this.setState({list: categories}))
    }

    handleExamSearch(e){
        let findExamInput = e.target.value;
        this.setState({
            findExamInput
        });
        if(findExamInput.length >= 4){
            API.post('/exams/search', {query: findExamInput}).then(exams => this.setState({
                foundExams: exams
            }))
        }
    }


    render() {
        return (
            <Content col="10">
                <div className="panel relative full-height">
                    <div className="panel-body full-height">

                        <div className="row">
                            <div className="col-sm-8">

                                <h3>Current exams</h3>

                                <p>No current exams.</p>

                                <hr/>

                                <h3>Available categories</h3>

                                {this.state.list.filter(cat => cat.tasks && cat.tasks.length > 0).map(category => (
                                    <div className="pt-card pt-elevation-0 pt-interactive" key={category._id}
                                         onClick={() => this.props.router.push(`/category/${category._id}`)}
                                         style={{marginBottom: 10, marginRight: 10, width: '40%', float: 'left'}}>
                                        <h5><Link to={`/category/${category._id}`}>{category.name}</Link></h5>
                                        <p>{category.tasks.length} exercises</p>
                                    </div>
                                ))}</div>


                            <Sidebar col="4"
                                     style={{position: 'absolute', top: 0, right: 0, width: '30%', paddingTop: 15}}>
                                <h3>Find test</h3>
                                <div className="pt-input-group .modifier">
                                    <span className="pt-icon pt-icon-search"/>
                                    <input type="text" className="pt-input" placeholder="Exam code..."
                                           value={this.state.findExamInput} onChange={this.handleExamSearch}/>
                                    <button className="pt-button pt-minimal pt-intent-primary pt-icon-arrow-right"/>
                                </div>
                                <hr/>

                                {this.state.foundExams.map((exam, idx) => (
                                    <div className="pt-card pt-elevation-0 pt-interactive" key={idx} onClick={() => this.props.router.push(`/exam/${exam._id}`)}>
                                        <h5><Link to={`/exam/${exam._id}`}>{exam.name}</Link></h5>
                                    </div>
                                ))}
                            </Sidebar>

                        </div>

                    </div>
                </div>

            </Content>
        )
    }
}

export default Dashboard