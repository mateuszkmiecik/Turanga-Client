import React, {
    Component,
} from 'react';

import {Link} from 'react-router'

import API from '../services/API'

import {Content, Sidebar} from '../components'

class ExamDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exam: {}
        }

        this.handleStartTest = this.handleStartTest.bind(this)
    }

    componentDidMount() {

        const {id} = this.props.params;
        if (id) {
            API.get(`/exams/${id}`).then(exam => this.setState({
                exam
            }))
        }

    }


    handleStartTest() {
        const {id} = this.props.params;
        API.post(`/student/exams/${id}`).then(attempt => this.props.router.push(`/attempt/${attempt._id}`))

    }


    render() {

        const {exam} = this.state;

        return (
            <Content col="10">
                <div className="panel relative full-height">
                    <div className="panel-body full-height">

                        <div className="row">
                            <div className="col-sm-8">

                                <Link to="/" className="pt-button space-bottom">
                                    <i className="fa fa-arrow-left"/>
                                </Link>
                                <h3>Exam: {exam.name}</h3>

                                <p>
                                    <strong>Time limit:</strong> {exam.timeLimited ? `${exam.duration} minutes` : 'no time limit'}
                                </p>

                                <p><strong>Number of questions: </strong></p>

                            </div>

                            <Sidebar col="4"
                                     style={{position: 'absolute', top: 0, right: 0, width: '30%', paddingTop: 15}}>
                                <h3>Run test</h3>



                                <button className="pt-button pt-large pt-intent-primary" onClick={this.handleStartTest}>
                                    Start exam
                                </button>

                            </Sidebar>
                        </div>
                    </div>
                </div>
            </Content>
        );
    }
}


export default ExamDetails;
