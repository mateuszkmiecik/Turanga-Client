import React, {Component} from 'react'
import {Link} from 'react-router'

import CodeMirror from 'react-codemirror'
import API from '../services/API'
import c from 'classnames'
import RunnerAPI from '../services/Runner'


import {Table, Column, Cell} from '@blueprintjs/table'


class Runner extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentQuery: '',
            attempt: {
                _id: {},
                description: '',
                tasks: []
            },
            currentTask: {},
            queryRun: null
        };
        this.handleQuerySend = this.handleQuerySend.bind(this)
        this.finishAttempt = this.finishAttempt.bind(this)
    }

    componentDidMount() {
        let {id} = this.props.params;
        API.get(`/student/attempts/${id}`).then(attempt => {
            this.props.router.push(`/attempt/${id}?task=${attempt.tasks[0].taskId}`);
            this.setState({attempt})
        }).catch(() => this.props.router.push('/'));
    }

    finishAttempt() {
        let {id} = this.props.params;
        API.put(`/student/attempts/${id}/finish`).then(attempt => {
            this.props.router.push("/");
        })
    }

    render() {
        let {attempt, queryRun} = this.state;
        let {params: {id: attemptId}, location: {query}} = this.props;

        let currentTask = attempt.tasks.find(task => task.taskId === query.task) || {};
        const renderCell = (key) => ((rowIndex) => <Cell>{`${queryRun.results[rowIndex][key]}`}</Cell>);

        return (
            <div className="row runner relative full-height" style={{padding: '20px 20px 20px 270px'}}>

                <div className="exercises-list full-height">
                    <button className="pt-button pt-intent-primary" onClick={this.finishAttempt}>
                        Finish test
                    </button>

                    <div className="list full-height">
                        {attempt.tasks.map((task, idx) => (
                            <Link to={`/attempt/${attemptId}?task=${task.taskId}`} key={task.taskId}
                                  className={c({"exercise-entry": true, "active": query.task === task.taskId})}>
                                <span className="number">{idx + 1}</span>
                                {task.name}
                            </Link>
                        ))}
                    </div>

                </div>

                <div className="panel full-height">
                    <div className="panel-body  flexbox-parent full-height" style={{padding: 0}}>

                        <div className="desc" style={{height: 100, padding: 10}}>
                            <h3>{currentTask.name}</h3>
                            <div dangerouslySetInnerHTML={{__html: currentTask.description}}/>
                        </div>
                        <div className="flexbox-item-grow fill-area">
                            <div style={{width: '100%'}}>
                                <div className="row half-height task-query"
                                     style={{padding: 0, border: '1px solid #ddd', borderWidth: '1px 0'}}>
                                    <div className="col-sm-9 full-height" style={{borderRight: '1px solid #ddd'}}>
                                        <CodeMirror
                                            onChange={(e) => this.setState({
                                                currentQuery: e
                                            })}
                                            options={{lineNumbers: true, mode: 'text/x-mssql'}}/>
                                        <div className="panel-footer">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <button className="pt-button pt-intent-primary space-right pull-right"
                                                            onClick={this.handleQuerySend}>
                                                        Run query
                                                    </button>
                                                    {queryRun ? ( queryRun.correct ?
                                                                <span
                                                                    className="pt-tag pt-intent-success space-right">Correct</span> :
                                                                <span className="pt-tag pt-intent-danger space-right">Wrong</span>
                                                        ) : null  }

                                                    {queryRun ? <span>{queryRun.errorMessage}</span> : null  }


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3" style={{paddingRight: 30, padding: 15}}>

                                        {currentTask.requiredWords && currentTask.requiredWords.length > 0 ?
                                            <p>
                                                <label>Required words:</label>
                                                {currentTask.requiredWords.map(word => (
                                                    <span className="pt-tag" key={word.id}>{word.text}</span>
                                                ))}

                                            </p> : null }
                                        {currentTask.forbiddenWords && currentTask.forbiddenWords.length > 0 ?
                                            <p>
                                                <label>Forbidden words:</label>
                                                {currentTask.forbiddenWords.map(word => (
                                                    <span className="pt-tag" key={word.id}>{word.text}</span>
                                                ))}

                                            </p> : null }
                                        {currentTask.engineDB ?
                                            <p>
                                                <label>Database:</label>
                                                <p>{currentTask.engineDB[0].name}</p>
                                                <label>SQL Dialect:</label>
                                                <p>{currentTask.engineDB[0].dbEngine}</p>
                                                <label>Scheme file:</label>
                                                <a href={`http://localhost:8080/static/${currentTask.engineDB[0].schemeFile}`}
                                               target="_blank">{currentTask.engineDB[0].schemeFile}</a>
                                            </p>
                                            : null }
                                    </div>


                                </div>
                                <div className="half-height" style={ {padding: 10} }>
                                    <div className="panel panel-success full-height">
                                        {queryRun && queryRun.results.length ?
                                            <Table numRows={queryRun.results.length}>
                                                {Object.keys(queryRun.results[0]).map((key, idx) => (
                                                    <Column name={key} key={idx} renderCell={renderCell(key)}/>
                                                ))}
                                            </Table>
                                            : (
                                            <div className="pt-non-ideal-state padding-top">
                                                <div
                                                    className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
                                                    <span className="pt-icon pt-icon-heat-grid"/>
                                                </div>
                                                <h4 className="pt-non-ideal-state-title">No results</h4>
                                                <div className="pt-non-ideal-state-description">
                                                    Run query to show results.
                                                </div>
                                            </div>
                                        )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    handleQuerySend() {
        let {id} = this.props.params;

        API.get(`/student/attempts/${id}`).then(result => {
            if (result.finished) {
                API.put(`/student/attempts/${id}/finish`).then(() => {
                    alert("You can not continue on this attempt.");
                    this.props.router.push('/');
                });
            } else {
                let {location: {query}} = this.props;
                let currentTask = this.state.attempt.tasks.find(task => task.taskId === query.task) || {};
                RunnerAPI.runQuery({
                    query: this.state.currentQuery,
                    attId: this.state.attempt._id,
                    id: currentTask.taskId
                }).then(result => this.setState({
                    queryRun: result
                }))
            }
        })
    }
}

export default Runner