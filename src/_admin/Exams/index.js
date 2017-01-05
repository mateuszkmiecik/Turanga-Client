import React, {Component} from 'react';
import {Switch} from '@blueprintjs/core'

import {Content, Sidebar} from '../../components'
import API from '../../services/API'
import Typeahead from '../../components/Typeahead'

class Exams extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // form
            foundCategories: [],
            selectedCategories: [],
            newExamName: '',
            categoryNameById: {},
            categoryQuestionsNumberById: {},
            timeLimit: false,
            duration: 90

        };

        this.findCategoriesByName = this.findCategoriesByName.bind(this)
        this.selectCategory = this.selectCategory.bind(this)
        this.removeCategory = this.removeCategory.bind(this)
    }


    componentDidMount() {
        this.findCategoriesByName('Se')
    }

    findCategoriesByName(name) {
        API.post('/categories/search', {
            query: name
        }).then(res => this.setState({
            foundCategories: res
        }));
    }

    removeCategory(_id) {

        const {categoryNameById, categoryQuestionsNumberById} = this.state;
        delete categoryNameById[_id];
        delete categoryQuestionsNumberById[_id];

        this.setState({
            categoryNameById,
            categoryQuestionsNumberById
        })

    }

    selectCategory(cat) {
        if (!!this.state.selectedCategories.find(e => e._id == cat._id)) {
            return false;
        }
        this.setState({
            categoryNameById: {
                ...this.state.categoryNameById,
                [cat._id]: cat.name
            },
            categoryQuestionsNumberById: {
                ...this.state.categoryQuestionsNumberById,
                [cat._id]: 1
            }
        })
    }


    render() {

        const allCorrect = [this.state.newExamName, Object.keys(this.state.categoryQuestionsNumberById)].every(t => t.length > 0);


        return (
            <Content col="10">
                <div className="panel results relative full-height">
                    <div className="panel-body full-height">

                        <div className="row  full-height">
                            <div className="col-sm-8 full-height">


                                <h3>Exams</h3>

                                <div className="pt-card pt-elevation-0 pt-interactive space-bottom"
                                     onClick={() => this.props.router.push('/results/1')}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <strong>Categories</strong>
                                            <div>User 1 - 12 questions</div>
                                            <div>User 1 - 12 questions</div>
                                            <div>User 1 - 12 questions</div>
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

                            </div>

                            <Sidebar col="4"
                                     style={{position: 'absolute', top: 0, right: 0, width: '30%', paddingTop: 15}}>
                                <h3>Create exam</h3>

                                <hr/>

                                <label className="pt-label">
                                    Name
                                    <input type="text" className="pt-input pt-fill" value={this.state.newExamName}
                                           onChange={(e) => this.setState({
                                               newExamName: e.target.value
                                           })}/>
                                </label>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <label className="pt-label">
                                            <p>Time limit</p>
                                            <Switch checked={this.state.timeLimit} onChange={() => this.setState({
                                                timeLimit: !this.state.timeLimit
                                            })}/>
                                        </label>
                                    </div>
                                    <div className="col-sm-6">

                                        <label className="pt-label">
                                            Duration (in minutes)
                                            <input type="number" min="1" value={this.state.duration}
                                                   onChange={(e) => this.setState({
                                                       duration: e.target.value
                                                   })}
                                                   disabled={!this.state.timeLimit} className="pt-input pt-fill"/>
                                        </label>
                                    </div>
                                </div>

                                <hr/>

                                <p>Categories</p>
                                <p className="pt-callout">Search categories with input below, add them to table and set
                                    how many exercises should be taken
                                    from every category to create an exam.</p>

                                <div className="space-bottom space-top">
                                    <Typeahead items={this.state.foundCategories}
                                               onValueChange={this.findCategoriesByName}
                                               onValueSelect={this.selectCategory} renderer={(cat => cat.name)}
                                               placeholder="Search for categories"
                                               className="pt-fill"/>
                                </div>
                                <table className="table table-bordered table-striped">
                                    <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Number of questions</th>
                                        <th>#</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Object.keys(this.state.categoryQuestionsNumberById).map((_id, idx) => (
                                        <tr key={idx}>
                                            <td>{this.state.categoryNameById[_id]}</td>
                                            <td><input type="number" min={1}
                                                       value={this.state.categoryQuestionsNumberById[_id]}
                                                       onChange={(e) => this.setState({
                                                           categoryQuestionsNumberById: {
                                                               ...this.state.categoryQuestionsNumberById,
                                                               [_id]: e.target.value
                                                           }
                                                       })}
                                                       className="pt-input"/></td>
                                            <td>
                                                <button className="pt-button pt-minimal pt-icon-cross"
                                                        onClick={() => this.removeCategory(_id)}/>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                                <hr/>

                                <button disabled={!allCorrect} className="pt-button">Add new exam</button>


                            </Sidebar>
                        </div>

                    </div>
                </div>
            </Content>
        );
    }
}

export default Exams;
