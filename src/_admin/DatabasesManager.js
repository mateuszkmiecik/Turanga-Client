import React, {Component} from 'react'
import Dropzone from 'react-dropzone'

import {Intent, Dialog, Button} from '@blueprintjs/core'

import Select from 'react-select'
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
                dbEngine: '',
                files: []
            },
            editDatabase: {
                name: '',
                url: '',
                user: '',
                password: '',
                dbEngine: '',
                files: []
            },
            dbCodes: [],
            editDialogOpen: false
        };


        this.onInputChange = this.onInputChange.bind(this);
        this.refresh = this.refresh.bind(this);
        this.addNewDatabase = this.addNewDatabase.bind(this);
        this.removeDB = this.removeDB.bind(this);
    }

    componentDidMount() {
        this.refresh();
        API.get('/dbCodes').then(dbCodes => {
            this.setState({
                dbCodes
            })
        })
    }

    refresh() {
        Databases.get().then(databases => this.setState({
            databases: databases.map(obj => ({...obj, dbEngine: {code: obj.dbEngine}}))
        }))
    }

    addNewDatabase(newDatabase) {

        let promise = Promise.resolve({});

        if (newDatabase.files.length > 0) {
            promise = API.upload(newDatabase.files)
        }

        promise.then(({filename}) => {
            let {name, url, user, password, dbEngine} = newDatabase;
            let newObj = {
                name, url, user, password, dbEngine
            };
            newObj.dbEngine = newObj.dbEngine.code;
            if (filename) {
                newObj.schemeFile = filename;
            }
            return Databases.createDB(newObj)
        }).then(() => {
            this.refresh();
            this.setState({
                newDatabase: {
                    name: '',
                    url: '',
                    user: '',
                    password: '',
                    dbEngine: '',
                    files: []
                }
            })
        });


    }

    updateDatabase(db){

        let promise = Promise.resolve({});

        if (db.files && db.files.length > 0) {
            promise = API.upload(db.files)
        }

        promise.then(({filename}) => {
            let {_id, name, url, user, password, dbEngine} = db;
            let newObj = {
                name, url, user, password, dbEngine
            };
            newObj.dbEngine = newObj.dbEngine.code;
            if (filename) {
                newObj.schemeFile = filename;
            }
            return Databases.updateDB(_id, newObj)
        }).then(() => {
            this.refresh();
            this.setState({
                editDialogOpen: false
            })
        });

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

    changeDBEngine(objectName, field, value) {
        this.setState({
            [objectName]: {
                ...this.state[objectName],
                [field]: value
            }
        })
    }

    removeDB(db) {
        Databases.deleteDB(db).then(this.refresh);
    }

    render() {

        let {databases, newDatabase, editDatabase} = this.state;
        const allCorrect = ['name', 'url', 'user', 'password', 'dbEngine'].every(field => (newDatabase[field].length > 0 || !!newDatabase[field]));

        return (

            <Content col="10">
                <div className="panel results relative full-height">
                    <div className="panel-body full-height">

                        <div className="row  full-height">
                            <div className="col-sm-8 full-height">

                                <h3>Databases</h3>
                                <hr/>

                                {databases.length > 0 ? (
                                        <table className="table table-bordered">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Url</th>
                                                <th>User</th>
                                                <th>Pass</th>
                                                <th>DB Engine</th>
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
                                                    <td>{(db.dbEngine || {}).code}</td>
                                                    <td><a href={`http://localhost:8080/static/${db.schemeFile}`}
                                                           target="_blank">{db.schemeFile}</a></td>
                                                    <td>

                                                        <button className="btn btn-xs space-right"
                                                                onClick={() => this.setState({
                                                                    editDatabase: db,
                                                                    editDialogOpen: true
                                                                })}>
                                                            <i className="fa fa-edit"/>
                                                        </button>
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
                                    <label>Name</label>
                                    <input type="text" className="pt-input pt-fill" placeholder="alias"
                                           value={editDatabase.name}
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
                                    <label>DB Engine</label>
                                    <Select multi={false} value={newDatabase.dbEngine} labelKey={"code"}
                                            onChange={dbCode => this.changeDBEngine('newDatabase', 'dbEngine', dbCode)}
                                            options={this.state.dbCodes}/>
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
                                            newDatabase.files.map(f => f.name) :
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

                <Dialog isOpen={this.state.editDialogOpen} onClose={() => this.setState({
                    editDialogOpen: false
                })}>
                    <div className="pt-dialog-body">
                        <p>
                            <label>Name</label>
                            <input type="text" className="pt-input pt-fill" placeholder="alias"
                                   value={editDatabase.name}
                                   onChange={this.onInputChange('editDatabase', 'name')}/>
                        </p>

                        <p>
                            <label>Server URL</label>
                            <input type="text" className="pt-input pt-fill" placeholder="url"
                                   value={editDatabase.url}
                                   onChange={this.onInputChange('editDatabase', 'url')}/>
                        </p>
                        <p>
                            <label>User</label>
                            <input type="text" className="pt-input pt-fill" placeholder="user"
                                   value={editDatabase.user}
                                   onChange={this.onInputChange('editDatabase', 'user')}/>
                        </p>
                        <p>
                            <label>Password</label>
                            <input type="text" className="pt-input pt-fill" placeholder="password"
                                   value={editDatabase.password}
                                   onChange={this.onInputChange('editDatabase', 'password')}/>
                        </p>
                        <p>
                            <label>DB Engine</label>
                            {JSON.stringify(editDatabase.dbEngine)}
                            <Select multi={false} value={editDatabase.dbEngine} labelKey={"code"}
                                    onChange={dbCode => this.changeDBEngine('editDatabase', 'dbEngine', dbCode)}
                                    options={this.state.dbCodes}/>
                        </p>
                        <div>
                            <label>Schema file</label>
                            <Dropzone onDrop={(acceptedFiles, rejectedFiles) => this.setState({
                                editDatabase: {
                                    ...editDatabase,
                                    files: [...acceptedFiles]
                                }
                            })} className="pt-callout space-bottom pt-intent-warning"
                                      style={{textAlign: 'center'}}>
                                {(editDatabase.files || []).length > 0 ?
                                    editDatabase.files.map(f => f.name) :
                                    <div>Try dropping some files here, or click to select files to
                                        upload.</div> }
                            </Dropzone>
                        </div>
                        <p>
                            <button className="pt-button pt-intent-primary"
                                    disabled={!allCorrect}
                                    onClick={() => this.updateDatabase(editDatabase)}>Save
                            </button>
                        </p>
                    </div>
                    <div className="pt-dialog-footer">
                        <div className="pt-dialog-footer-actions">
                            <Button text="Cancel" onClick={() => this.setState({
                                editDialogOpen: false
                            })}/>
                            <Button
                                intent={Intent.PRIMARY}
                                onClick={() => this.updateDatabase(editDatabase)}
                                text="Save"
                            />
                        </div>
                    </div>
                </Dialog>

            </Content>
        )
    }
}

export default DatabasesManager