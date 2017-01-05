import React, {Component} from 'react';
import {Switch, Alert} from '@blueprintjs/core'

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
            duration: 90,

            // list
            examsList: []

        };

        this.findCategoriesByName = this.findCategoriesByName.bind(this)
        this.selectCategory = this.selectCategory.bind(this)
        this.selectCategory = this.selectCategory.bind(this)
        this.addExam = this.addExam.bind(this)
        this.showAlert = this.showAlert.bind(this)
        this.getExamList = this.getExamList.bind(this)
    }


    componentDidMount() {

        this.getExamList()

    }

    getExamList(){
        return API.get('/exams').then(exams => this.setState({
            examsList: exams
        }))
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

    showAlert(text) {
        this.setState({
            isAlertOpened: true,
            alertText: text
        })
    }

    selectCategory(cat) {
        if (!!this.state.selectedCategories.find(e => e._id === cat._id)) {
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

    addExam() {

        const {newExamName, categoryNameById, categoryQuestionsNumberById, timeLimit, duration} = this.state;

        const exam = {
            name: newExamName,
            categoryMap: categoryQuestionsNumberById,
            categoriesNames: categoryNameById,
            timeLimited: timeLimit
        };

        if (timeLimit) {
            exam.duration = duration;
        }

        API.post('/exams', exam).then(() => this.setState({
            newExamName: '',
            categoryNameById: {},
            selectedCategories: [],
            categoryQuestionsNumberById: {},
            timeLimit: false,
            duration: 90
        })).then(this.getExamList).catch(err => this.showAlert(err.response.body.message || 'An error occured. Please try again later.'));


    }


    render() {

        const {newExamName, categoryQuestionsNumberById, examsList} = this.state;
        const allCorrect = [newExamName, Object.keys(categoryQuestionsNumberById)].every(t => t.length > 0);


        return (
            <Content col="10">
                <div className="panel results relative full-height">
                    <div className="panel-body full-height">

                        <div className="row  full-height">
                            <div className="col-sm-8 full-height">


                                <h3>Exams</h3>


                                {examsList.map((exam, idx) => (
                                    <div className="pt-card pt-elevation-0 pt-interactive space-bottom" key={idx}>
                                        <h4>{exam.name}</h4>
                                        <div className="row">
                                            <div className="col-sm-5">
                                                <strong>Categories</strong>
                                                {Object.keys(exam.categoryMap).map((_id, idx) => (
                                                    <div key={idx}>
                                                        {exam.categoriesNames[_id]} - {exam.categoryMap[_id]} exercises
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="col-sm-3">
                                                <strong>Time limit</strong>
                                                <p>
                                                    {exam.timeLimited ? <span>{exam.duration} minutes</span> : <span>n/a</span>}
                                                </p>
                                            </div>
                                            <div className="col-sm-2">
                                                <strong>Exam code</strong>
                                                <p>
                                                    {exam.examCode}
                                                </p>
                                            </div>
                                            <div className="col-sm-2">
                                                <strong>Actions</strong>
                                                <div>
                                                    <button className="pt-button">
                                                        <i className="fa fa-trash"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}


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

                                <button disabled={!allCorrect} className="pt-button" onClick={this.addExam}>Add new
                                    exam
                                </button>


                            </Sidebar>
                        </div>

                    </div>
                </div>

                <Alert isOpen={this.state.isAlertOpened} confirmButtonText="Okay" onConfirm={() => this.setState({
                    isAlertOpened: false
                })}>
                    <p>{this.state.alertText}</p>
                </Alert>
            </Content>
        );
    }
}

export default Exams;
