import React, {
    Component,
} from 'react';

import moment from 'moment'

import API from '../services/API'
import {Content} from '../components'


class ResultDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            singleResult: {
                tasks: []
            },
            resultsByTaskId: {}
        }

    }

    componentDidMount() {
        const {id} = this.props.params;
        API.get(`/attempts/${id}`).then(singleResult => {

            let resultsByTaskId = singleResult.results.reduce((acc, currentResult) => {
                let previousResult = acc[currentResult.taskId];
                if(!previousResult){
                    return {...acc, [currentResult.taskId]: {...currentResult}};
                }

                if(currentResult.false || previousResult.date >= currentResult.date){
                    return acc;
                }

                return {...acc, [currentResult.taskId]: {...currentResult}};
            }, {});


            this.setState({
                singleResult,
                resultsByTaskId
            })
        })
    }

    render() {

        const {singleResult, resultsByTaskId} = this.state;

        return (
            <Content col="10">

                <div className="panel results full-height">
                    <div className="panel-body">

                        <button className="pt-button space-bottom" onClick={() => this.props.router.goBack()}>
                            <i className="fa fa-arrow-left"/> Back to results
                        </button>

                        <div className="pt-card space-bottom">
                            <div className="row">
                                <div className="col-sm-6">
                                    <strong>Category name</strong>
                                    <p>{singleResult.name}</p>
                                </div>
                                <div className="col-sm-3">
                                    <strong>Date</strong>
                                    <p>{moment(singleResult.dateStarted).format("HH:mm D-M-YYYY")}</p>
                                </div>
                                <div className="col-sm-3">
                                    <strong>Score</strong>
                                    <p>{singleResult.score}/{singleResult.tasks.length}</p>
                                    <div
                                        className="pt-progress-bar pt-intent-primary pt-no-animation">
                                        <div className="pt-progress-meter"
                                             style={{"width": `${100 * singleResult.score / singleResult.tasks.length}%`}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {singleResult.tasks.map((task, i) => {
                            let firstStyles = {};
                            if(i === 0){
                                firstStyles = {
                                    borderTop: `1px solid #ddd`,
                                    paddingTop: 15
                                }
                            };

                            let taskResult = resultsByTaskId[task.taskId] || {};


                            let style = {borderBottom: '1px solid #ddd', padding: '5px 0 15px 0', ...firstStyles};
                            return (
                                <div className="row space-bottom" key={task.taskId} style={style}>
                                    <div className="col-sm-4">
                                        <h4>{task.name}</h4>
                                        <div dangerouslySetInnerHTML={{__html: task.description}} />
                                    </div>
                                    <div className="col-sm-4">
                                        {taskResult.query ?
                                            <pre>{taskResult.query}</pre> : 'not answered' }
                                    </div>
                                    <div className="col-sm-4">
                                        {taskResult.correct ?
                                            <div className="pt-tag pt-intent-success">Correct</div>
                                            : <div className="pt-tag pt-intent-danger">Wrong</div>  }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Content>
        );
    }
}

export default ResultDetails;
