import React, {
    Component,
} from 'react';

import {Link} from 'react-router'
import {Radio, RadioGroup} from '@blueprintjs/core'

import API from '../services/API'

import {Content, Sidebar} from '../components'

class CategoryDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: {},
            duration: 60,
            testMode: 'normal'
        };

        this.handleStartTest = this.handleStartTest.bind(this)
    }

    componentDidMount() {

        const {id} = this.props.params;
        if (id) {
            API.get(`/student/categories/${id}`).then(category => this.setState({
                category
            }))
        }

    }

    handleStartTest() {
        const {id} = this.props.params;
        API.post(`/student/categories/${id}`, {duration : this.state.duration}).then(attempt => this.props.router.push(`/attempt/${attempt._id}`))

    }


    render() {

        const {category} = this.state;

        return (
            <Content col="8">
                <div className="panel relative half-height">
                    <div className="panel-body full-height">

                        <div className="row">
                            <div className="col-sm-8">


                                <h3>
                                    <Link to="/" className="pt-button space-right">
                                        <i className="fa fa-arrow-left"/>
                                    </Link>
                                    Category: {category.name}</h3>
                                <hr/>

                                <div dangerouslySetInnerHTML={{__html: category.description}}></div>

                            </div>

                            <Sidebar col="4"
                                     style={{position: 'absolute', top: 0, right: 0, width: '30%', paddingTop: 15}}>
                                <h3>Run test</h3>

                                <div>
                                    <RadioGroup
                                        label="Test mode"
                                        onChange={(e) => this.setState({
                                            testMode: e.target.value
                                        })}
                                        selectedValue={this.state.testMode}>
                                        <Radio label="Normal" value="normal"/>
                                        <Radio label="Timed" value="time"/>
                                    </RadioGroup>

                                    {this.state.testMode === 'time' ?
                                        <label className="pt-label">Duration (in minutes)
                                            <input type="number" min="1" value={this.state.duration}
                                                   className="pt-input" onChange={(e) => this.setState({
                                                duration: e.target.value
                                            })}/>
                                        </label> : null}

                                </div>

                                <button className="pt-button pt-large pt-intent-primary"
                                        onClick={() => this.handleStartTest()}>
                                    Start test
                                </button>

                            </Sidebar>
                        </div>
                    </div>
                </div>
            </Content>
        );
    }
}


export default CategoryDetails;
