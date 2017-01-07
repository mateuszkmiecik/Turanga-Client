import React, {Component} from 'react'
import {Link} from 'react-router'
import {Dialog} from '@blueprintjs/core'

import CodeMirror from 'react-codemirror'
import API from '../services/API'
import c from 'classnames'
import RunnerAPI from '../services/Runner'

import {SideMenu, Content, Sidebar} from '../components'


import {Table, Column, Cell} from '@blueprintjs/table'


class Runner extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentQuery: '',
            category: {
                description: '',
                tasks: []
            },
            currentTask: {},
            queryRun: null
        };
        this.handleQuerySend = this.handleQuerySend.bind(this)
    }

    componentDidMount() {
        let {id} = this.props.params;
        window.onbeforeunload = function () {
            return true;
        };
        // API.get(`/categories/${id}`).then(category => this.setState({category}));
    }

    componentWillUnmount() {
        window.onbeforeunload = null;
    }


    render() {
        let {category, queryRun} = this.state;

        let {params: {id: attemptId}, location: {query}} = this.props;
        const renderCell = (key) => ((rowIndex) => <Cell>{`${queryRun.results[rowIndex][key]}`}</Cell>);

        return !category ? <div>Loading</div> : (
                <div className="row runner full-height">


                    <Content col="6">
                        <div className="panel relative full-height" style={{padding: '20px 20px 20px 270px'}}>
                            <div className="panel-body">
                                <div className="exercises-list full-height">
                                    <button className="pt-button pt-intent-primary" onClick={this.addNewTask}>
                                        Finish test
                                    </button>

                                    <div className="list full-height">
                                        <Link to={`/attempt/${attemptId}?task=1`}
                                              className={c({"exercise-entry": true, "active": query.task == 1})}>
                                            <span className="number">1</span>
                                            Task 1
                                        </Link>

                                        <Link to={`/attempt/${attemptId}?task=2`}
                                              className={c({"exercise-entry": true, "active": query.task == 2})}>
                                            <span className="number">2</span>
                                            Task 2
                                        </Link>
                                    </div>

                                </div>

                                <h3>TEST</h3>
                                <p>
                                    Example exercise description: Lorem ipsum dolor sit amet, consectetur adipisicing
                                    elit. Amet eveniet hic minus quidem soluta! Aliquam corporis cumque cupiditate
                                    eligendi eos esse minima, necessitatibus optio, quas quisquam sequi ut! A, quisquam.
                                </p>
                                <hr/>
                                <p>
                                    Allowed words:
                                </p>

                                <p>
                                    Restricted words:
                                </p>

                                <p>
                                    Scheme file:
                                    <a href="#">scheme.pdf</a>
                                </p>
                            </div>
                        </div>
                    </Content>

                    <Sidebar>
                        <div className="half-height task-query" style={{margin: '0 -15px'}}>
                            <CodeMirror
                                onChange={(e) => this.setState({
                                    currentQuery: e
                                })}
                                options={{lineNumbers: true, mode: 'text/x-mssql'}}/>
                            <div className="panel-footer">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <button className="pt-button pull-right" onClick={this.handleQuerySend}>
                                            Run query
                                        </button>
                                        {queryRun ? ( queryRun.correct ?
                                                <span className="pt-tag pt-intent-success">Correct</span> :
                                                <span className="pt-tag pt-intent-danger">Wrong</span> ) : null  }


                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="half-height" style={{paddingBottom: 20}}>

                            <div className="panel panel-success full-height">
                                {queryRun && queryRun.results.length ?
                                    <Table numRows={queryRun.results.length}>
                                        {Object.keys(queryRun.results[0]).map((key, idx) => (
                                            <Column name={key} key={idx} renderCell={renderCell(key)}/>
                                        ))}
                                    </Table>
                                    : (
                                        <div className="pt-non-ideal-state padding-top">
                                            <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
                                                <span className="pt-icon pt-icon-heat-grid"/>
                                            </div>
                                            <h4 className="pt-non-ideal-state-title">No results</h4>
                                            <div className="pt-non-ideal-state-description">
                                                Run query to show results.
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>

                    </Sidebar>
                </div>
            )
    }

    handleQuerySend() {
        RunnerAPI.runQuery({
            query: this.state.currentQuery,
            correctQuery: this.state.currentTask.correctQuery
        }).then(result => this.setState({
            queryRun: result
        }))
    }
}

export default Runner