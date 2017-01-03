import React, {Component} from 'react'

import {Content} from '../components'
import Databases from '../services/Databases'

class DatabasesManager extends Component {


    constructor(props) {
        super(props)

        this.state = {
            databases: [],
            newDatabase: {
                url: '',
                user: '',
                password: '',
                dbName: ''
            }
        };


        this.onInputChange = this.onInputChange.bind(this);
        this.refresh = this.refresh.bind(this);
        this.addNewDatabase = this.addNewDatabase.bind(this);
        this.removeDB = this.removeDB.bind(this);
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        Databases.get().then(dbs => this.setState({
            ...this.state,
            databases: dbs
        }))
    }

    addNewDatabase(db) {
        let values = Object.keys(db).map(key => db[key]);

        let allFieldsCorrect = values.every(a => !!a);

        if (allFieldsCorrect) {
            Databases.createDB(db).then(this.refresh)
        }
    }

    onInputChange(objectName, fieldName) {
        return e =>
            this.setState({
                ...this.state,
                [objectName]: {
                    ...this.state[objectName],
                    [fieldName]: e.target.value
                }
            })
    }

    removeDB(db) {
        Databases.deleteDB(db).then(this.refresh);
    }

    render() {

        let {databases, newDatabase} = this.state;

        return (
            <Content>

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="panel-title">Databases</div>
                    </div>

                    {databases.length > 0 ? (
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Url</th>
                                <th>User</th>
                                <th>Pass</th>
                                <th>dbName</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {databases.map((db, idx) => (
                                <tr key={db._id}>
                                    <td>{idx + 1}</td>
                                    <td>{db.url}</td>
                                    <td>{db.user}</td>
                                    <td>{db.password}</td>
                                    <td>{db.dbName}</td>
                                    <td>
                                        <button className="btn btn-xs" onClick={() => this.removeDB(db)}>
                                            <i className="fa fa-trash"/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="panel-body">
                            No databases added yet.
                        </div>
                    )}
                </div>


                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="panel-title">Add new database</div>
                    </div>

                    <div className="panel-body">
                        <p>
                            <input type="text" className="form-control" placeholder="url" value={newDatabase.url}
                                   onChange={this.onInputChange('newDatabase', 'url')}/>
                        </p>
                        <p>
                            <input type="text" className="form-control" placeholder="user" value={newDatabase.user}
                                   onChange={this.onInputChange('newDatabase', 'user')}/>
                        </p>
                        <p>
                            <input type="text" className="form-control" placeholder="password"
                                   value={newDatabase.password}
                                   onChange={this.onInputChange('newDatabase', 'password')}/>
                        </p>
                        <p>
                            <input type="text" className="form-control" placeholder="dbName" value={newDatabase.dbName}
                                   onChange={this.onInputChange('newDatabase', 'dbName')}/>
                        </p>
                        <p>
                            <button className="btn btn-primary" onClick={() => this.addNewDatabase(newDatabase)}>Save
                            </button>
                        </p>
                    </div>
                </div>

            </Content>
        )
    }
}

export default DatabasesManager