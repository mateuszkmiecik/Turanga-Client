import React, {Component} from 'react'

import CodeMirror from 'react-codemirror'
import Categories from '../../services/Categories'
import RunnerAPI from '../../services/Runner'

import c from 'classnames'
import {onInputChange} from '../../services/utils'

import {Table, Column, Cell} from '@blueprintjs/table'


class Runner extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentQuery: '',
            queryRun: null
        }
        this.handleQuerySend = this.handleQuerySend.bind(this)
    }

    componentDidMount() {
        let {id} = this.props.params;
        Categories.getCategory(id).then(category => this.setState({category}))
    }

    render() {
        let {category, queryRun} = this.state;
        const renderCell = (key) => ((rowIndex) => <Cell>{`${queryRun.results[rowIndex][key]}`}</Cell>);
        return !category ? <div>Loading</div> : (
            <div className="row runner full-height">

                <div className="col-sm-2">

                    <div className="task-list list-group">
                        {category.tasks.map((task, idx) => (
                            <a key={idx} className={c({"list-group-item": true, "active": idx === 0})}>{task.description}</a>
                        ))}
                    </div>

                </div>

                <div className="col-sm-5 full-height">

                    <div className="task-content panel full-height">
                        <div className="panel-body">
                            <h3>{category.name}</h3>
                            <p>
                                {category.tasks[0].description}
                            </p>
                        </div>
                    </div>

                </div>

                <div className="col-sm-5 full-height">

                    <div className="half-height margin-half-height task-query">
                        <div className="panel full-height">
                            <CodeMirror
                                options={{lineNumbers: true, mode: 'text/x-mssql'}}/>
                            <div className="panel-footer">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <button className="pt-button pull-right" onClick={this.handleQuerySend}>
                                            Run query
                                        </button>
                                        {/*{JSON.stringify(queryRun)}*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="half-height">

                        <div className="panel panel-success full-height">
                            {queryRun ?
                                <Table numRows={queryRun.results.length}>
                                    {Object.keys(queryRun.results[0]).map((key, idx) => (
                                        <Column name={key} key={idx} renderCell={renderCell(key)}/>
                                    ))}
                                </Table>
                                : (
                                <div className="pt-non-ideal-state padding-top">
                                    <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
                                        <span className="pt-icon pt-icon-heat-grid"></span>
                                    </div>
                                    <h4 className="pt-non-ideal-state-title">No results</h4>
                                    <div className="pt-non-ideal-state-description">
                                        Run query to show results.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    handleQuerySend() {
        RunnerAPI.runQuery(this.state.query).then(result => this.setState({
            queryRun: result
        }))
    }
}

export default Runner