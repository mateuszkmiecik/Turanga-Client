import React, {
    Component,
} from 'react';
import moment from 'moment'

import {Content} from '../../components'

import API from '../../services/API'


class Results extends Component {


    constructor(props) {
        super(props)
        this.state = {
            attempts: []
        }
    }

    componentDidMount() {
        API.get('/attempts').then(attempts => this.setState({attempts}))
    }

    render() {
        return (
            <Content col="10">
                <div className="panel results full-height">
                    <div className="panel-body">
                        <h3>Results</h3>

                        {this.state.attempts.map((catAttempt, i) => (
                            <div className="pt-card pt-elevation-0 pt-interactive space-bottom" key={i}
                                 onClick={() => this.props.router.push(`/results/${catAttempt._id}`)}>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <strong>{!!catAttempt.catId ? "Category name" : "Exam name"}</strong>
                                        <p>{catAttempt.name}</p>
                                    </div>
                                    <div className="col-sm-3">
                                        <strong>User</strong>
                                        <p>{catAttempt.user.name}</p>
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
                    </div>
                </div>
            </Content>
        );
    }
}
export default Results;
