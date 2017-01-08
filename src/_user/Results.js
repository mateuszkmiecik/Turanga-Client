import React, {
    Component,
} from 'react';

import API from '../services/API'

import {Content} from '../components'


class Results extends Component {


    constructor(props) {
        super(props)
        this.state = {
            results: []
        }
    }

    componentDidMount() {

        API.get('/student/attempts').then(attempts => console.log(attempts))

    }


    render() {
        return (
            <Content col="10">
                <div className="panel results full-height">
                    <div className="panel-body">
                        <h3>Results</h3>

                        <div className="pt-card pt-elevation-0 pt-interactive space-bottom"
                             onClick={() => this.props.router.push('/results/1')}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <strong>User</strong>
                                    <p>User 1</p>
                                </div>
                                <div className="col-sm-3">
                                    <strong>Date</strong>
                                    <p>{new Date().toDateString()}</p>
                                </div>
                                <div className="col-sm-3">
                                    <strong>Result</strong>
                                    <p>4/10</p>
                                    <div className="pt-progress-bar pt-intent-primary pt-no-animation">
                                        <div className="pt-progress-meter" style={{"width": '40%'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-card pt-elevation-0 pt-interactive space-bottom"
                             onClick={() => this.props.router.push('/results/2')}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <strong>User</strong>
                                    <p>User 2</p>
                                </div>
                                <div className="col-sm-3">
                                    <strong>Date</strong>
                                    <p>{new Date().toDateString()}</p>
                                </div>
                                <div className="col-sm-3">
                                    <strong>Result</strong>
                                    <p>7/10</p>
                                    <div className="pt-progress-bar pt-intent-primary pt-no-animation">
                                        <div className="pt-progress-meter" style={{"width": '70%'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-card pt-elevation-0 pt-interactive space-bottom"
                             onClick={() => this.props.router.push('/results/3')}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <strong>User</strong>
                                    <p>User 3</p>
                                </div>
                                <div className="col-sm-3">
                                    <strong>Date</strong>
                                    <p>{new Date().toDateString()}</p>
                                </div>
                                <div className="col-sm-3">
                                    <strong>Result</strong>
                                    <p>10/10</p>
                                    <div className="pt-progress-bar pt-intent-success pt-no-animation">
                                        <div className="pt-progress-meter" style={{"width": '100%'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-card pt-elevation-0 pt-interactive space-bottom"
                             onClick={() => this.props.router.push('/results/4')}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <strong>User</strong>
                                    <p>User 4</p>
                                </div>
                                <div className="col-sm-3">
                                    <strong>Date</strong>
                                    <p>{new Date().toDateString()}</p>
                                </div>
                                <div className="col-sm-3">
                                    <strong>Result</strong>
                                    <p>3/10</p>
                                    <div className="pt-progress-bar pt-intent-danger pt-no-animation">
                                        <div className="pt-progress-meter" style={{"width": '30%'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        );
    }
}
export default Results;
