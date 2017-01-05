import React, {Component} from 'react'
import Dropzone from 'react-dropzone'

import {Content, Sidebar} from '../components'
import Databases from '../services/Databases'
import API from '../services/API'

class DatabasesManager extends Component {


    constructor(props) {
        super(props)

        this.state = {
            databases: [],
            newDatabase: {
                name: '',
                url: '',
                user: '',
                password: '',
                dbName: '',
                files: []
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
        Databases.get().then(databases => this.setState({
            databases
        }))
    }

    addNewDatabase(newDatabase) {

        if(newDatabase.files.length > 0){
            API.upload(newDatabase.files).then(({filename}) => {

                let {name, url, user, password, dbName} = newDatabase;
                return Databases.createDB({
                    name, url, user, password, dbName, schemeFile: filename
                })
            }).then(this.refresh);
        }

    }

    onInputChange(objectName, fieldName) {
        return e =>
            this.setState({
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
        const allCorrect = ['name', 'url', 'user', 'password', 'dbName'].every(field => newDatabase[field].length > 0);

        return (

            <Content col="10">
                <div className="panel results relative full-height">
                    <div className="panel-body full-height">

                        <div className="row  full-height">
                            <div className="col-sm-8 full-height">

                                <h3>Databases</h3>


                                {databases.length > 0 ? (
                                        <table className="table table-bordered">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Url</th>
                                                <th>User</th>
                                                <th>Pass</th>
                                                <th>dbName</th>
                                                <th>Scheme file</th>
                                                <th/>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {databases.map((db, idx) => (
                                                <tr key={db._id}>
                                                    <td>{idx + 1}</td>
                                                    <td>{db.name}</td>
                                                    <td>{db.url}</td>
                                                    <td>{db.user}</td>
                                                    <td>{db.password}</td>
                                                    <td>{db.dbName}</td>
                                                    <td><a href={`http://localhost:8080/static/${db.schemeFile}`} target="_blank">{db.schemeFile}</a></td>
                                                    <td>
                                                        <button className="btn btn-xs"
                                                                onClick={() => this.removeDB(db)}>
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


                            <Sidebar col="4"
                                     style={{position: 'absolute', top: 0, right: 0, width: '30%', paddingTop: 15}}>
                                <h3>Add new database</h3>


                                <p>
                                    <label>Alias</label>
                                    <input type="text" className="pt-input pt-fill" placeholder="alias"
                                           value={newDatabase.name}
                                           onChange={this.onInputChange('newDatabase', 'name')}/>
                                </p>

                                <p>
                                    <label>Server URL</label>
                                    <input type="text" className="pt-input pt-fill" placeholder="url"
                                           value={newDatabase.url}
                                           onChange={this.onInputChange('newDatabase', 'url')}/>
                                </p>
                                <p>
                                    <label>User</label>
                                    <input type="text" className="pt-input pt-fill" placeholder="user"
                                           value={newDatabase.user}
                                           onChange={this.onInputChange('newDatabase', 'user')}/>
                                </p>
                                <p>
                                    <label>Password</label>
                                    <input type="text" className="pt-input pt-fill" placeholder="password"
                                           value={newDatabase.password}
                                           onChange={this.onInputChange('newDatabase', 'password')}/>
                                </p>
                                <p>
                                    <label>Database name</label>
                                    <input type="text" className="pt-input pt-fill" placeholder="dbName"
                                           value={newDatabase.dbName}
                                           onChange={this.onInputChange('newDatabase', 'dbName')}/>
                                </p>
                                <div>
                                    <label>Schema file</label>
                                    <Dropzone onDrop={(acceptedFiles, rejectedFiles) => this.setState({
                                        newDatabase: {
                                            ...newDatabase,
                                            files: [...acceptedFiles]
                                        }
                                    })} className="pt-callout space-bottom pt-intent-warning"
                                              style={{textAlign: 'center'}}>
                                        {newDatabase.files.length > 0 ?
                                            newDatabase.files.map(f => f.name):
                                            <div>Try dropping some files here, or click to select files to
                                                upload.</div> }
                                    </Dropzone>
                                </div>
                                <p>
                                    <button className="pt-button pt-intent-primary"
                                            disabled={!allCorrect}
                                            onClick={() => this.addNewDatabase(newDatabase)}>Save
                                    </button>
                                </p>
                            </Sidebar>
                        </div>
                    </div>
                </div>

            </Content>
        )
    }
}

export default DatabasesManager