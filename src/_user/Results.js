import React, {
    Component,
} from 'react';
import {Tab, TabList, TabPanel, Tabs} from "@blueprintjs/core";

import moment from 'moment'

import API from '../services/API'
import {Content} from '../components'


class Results extends Component {


    constructor(props) {
        super(props)
        this.state = {
            exams: [],
            categories: []
        }
    }

    componentDidMount() {

        API.get('/student/attempts/ex?isFinished=true').then(exams => this.setState({
            exams
        }));
        API.get('/student/attempts/cat?isFinished=true').then(categories => this.setState({
            categories
        }));

    }


    render() {
        const {exams, categories} = this.state;
        console.log(this.props.location.query.tab)
        return (
            <Content col="10">
                <div className="panel results full-height">
                    <div className="panel-body">
                        <h3>Results</h3>

                        <Tabs>
                            <TabList className="pt-large">
                                <Tab>Categories</Tab>
                                <Tab>Exams</Tab>
                            </TabList>
                            <TabPanel>
                                {categories.map((catAttempt, i) => (
                                    <div className="pt-card pt-elevation-0 pt-interactive space-bottom" key={i}
                                         onClick={() => this.props.router.push(`/results/${catAttempt._id}`)}>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <strong>Category name</strong>
                                                <p>{catAttempt.name}</p>
                                            </div>
                                            <div className="col-sm-3">
                                                <strong>Started at</strong>
                                                <p>{moment(catAttempt.dateStarted).format("HH:mm D-M-YYYY")}</p>
                                            </div>
                                            <div className="col-sm-3">
                                                <strong>Score</strong>
                                                <p>{catAttempt.score}/{catAttempt.tasks.length}</p>
                                                <div
                                                    className="pt-progress-bar pt-intent-primary pt-no-animation">
                                                    <div className="pt-progress-meter"
                                                         style={{"width": `${100 * catAttempt.score / catAttempt.tasks.length}%`}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </TabPanel>
                            <TabPanel>
                                {exams.map((examAttempt, i) => (
                                    <div className="pt-card pt-elevation-0 pt-interactive space-bottom" key={i}
                                         onClick={() => this.props.router.push(`/results/${examAttempt._id}`)}>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <strong>Exam name</strong>
                                                <p>{examAttempt.name}</p>
                                            </div>
                                            <div className="col-sm-3">
                                                <strong>Started at</strong>
                                                <p>{moment(examAttempt.dateStarted).format("HH:mm D-M-YYYY")}</p>
                                            </div>
                                            <div className="col-sm-3">
                                                <strong>Score</strong>
                                                <p>{examAttempt.score}/{examAttempt.tasks.length}</p>
                                                <div
                                                    className="pt-progress-bar pt-intent-primary pt-no-animation">
                                                    <div className="pt-progress-meter"
                                                         style={{"width": `${100 * examAttempt.score / examAttempt.tasks.length}%`}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </Content>
        );
    }
}
export default Results;
