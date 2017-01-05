import React, {Component} from 'react'
import {Link} from 'react-router'

import CodeMirror from 'react-codemirror'
import API from '../services/API'
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
        API.get(`/categories/${id}`).then(category => this.setState({category}));
    }

    render() {
        let {category, queryRun} = this.state;
        let {id} = this.props.params;
        let categoryTasksMenu = (category.tasks || []).map(task => ({
            url: `/runner/${id}?task=`,
            text: task.description
        }))
        const renderCell = (key) => ((rowIndex) => <Cell>{`${queryRun.results[rowIndex][key]}`}</Cell>);
        return !category ? <div>Loading</div> : (
                <div className="row runner full-height">

                    <SideMenu menu={categoryTasksMenu} activeIndex>
                        <Link to="/" className="pt-button pt-fill space-bottom">Back to categories</Link>
                    </SideMenu>


                    <Content>
                        <div className="panel full-height">
                            <div className="panel-body">
                                <h3>{category.name}</h3>
                                <p>
                                    {(category.tasks[0] || {}).description}
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
        RunnerAPI.runQuery({query: this.state.currentQuery, correctQuery: this.state.currentTask.correctQuery}).then(result => this.setState({
            queryRun: result
        }))
    }
}

export default Runner