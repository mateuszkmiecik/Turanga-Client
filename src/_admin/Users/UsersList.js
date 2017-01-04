import React from 'react';
import UserForm from './UserForm'
import {Sidebar} from '../../components'

export default ({users, onCreate, onEdit, onDelete}) => (
    <div className="row">
        <div className="col-sm-7">
            <table className="table table-hover pt-fill pt-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Real name</th>
                    <th>User role</th>
                    <th>Group</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map((u, idx) => (
                    <tr key={u._id}>
                        <td>{idx+1}</td>
                        <td>{u.username}</td>
                        <td>{u.name || 'n/a'}</td>
                        <td>{u.role}</td>
                        <td>{u.group}</td>
                        <td>
                            <button className="pt-button pt-small space-right" onClick={() => onEdit(u)}>
                                <i className="fa fa-edit"/>
                            </button>
                            <button className="pt-button pt-small" onClick={() => onDelete(u)}>
                                <i className="fa fa-trash"/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        <Sidebar style={{position: 'absolute', top: 0, right: 0, width: '40%', paddingTop: 30}}>
            <UserForm onCreate={onCreate}/>
        </Sidebar>
    </div>
)