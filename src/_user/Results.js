import React, {
    Component,
} from 'react';
import {Tab, TabList, TabPanel, Tabs, Alert} from "@blueprintjs/core";


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
                                <div className="row">
                                    <div className="col-sm-7">
                                        {categories.map((catAttempt, i) => (
                                            <div className="pt-card pt-elevation-0 pt-interactive space-bottom" key={i}>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <strong>Category name</strong>
                                                        <p>{catAttempt.name}</p>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <strong>Date</strong>
                                                        <p>{new Date().toDateString()}</p>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <strong>Score</strong>
                                                        <p>{catAttempt.score}/{catAttempt.tasks.length}</p>
                                                        <div className="pt-progress-bar pt-intent-primary pt-no-animation">
                                                            <div className="pt-progress-meter" style={{"width": "50%"}}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="row">
                                    <div className="col-sm-7">
                                        {exams.map((examAttempt, i) => (
                                            <div className="pt-card pt-elevation-0 pt-interactive space-bottom" key={i}>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <strong>Exam name</strong>
                                                        <p>{examAttempt.name}</p>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <strong>Date</strong>
                                                        <p>{new Date().toDateString()}</p>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <strong>Score</strong>
                                                        <p>{examAttempt.score}/{examAttempt.tasks.length}</p>
                                                        <div className="pt-progress-bar pt-intent-primary pt-no-animation">
                                                            <div className="pt-progress-meter" style={{"width": `${100*examAttempt.score/examAttempt.tasks.length}%`}}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </Content>
        );
    }
}
export default Results;
