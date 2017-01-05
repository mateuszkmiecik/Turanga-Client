import React from 'react';

import GroupForm from './GroupForm'
import {Sidebar} from '../../components'

export default ({groups, onCreate, onDelete}) => (
    <div className="row full-height">
        <div className="col-sm-6">
            <table className="table pt-fill pt-striped">
                <thead>
                <tr>
                    <th style={{width: '30px'}}>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {groups.map((g, idx) => (
                    <tr key={g._id}>
                        <td>{idx+1}</td>
                        <td>{g.name}</td>
                        <td>{g.description}</td>
                        <td>
                            <button className="pt-button pt-small" onClick={() => onDelete(g)}>
                                <i className="fa fa-trash"/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        <Sidebar col="4" style={{position: 'absolute', top: 0, right: 0, width: '50%', paddingTop: 30}}>
            <GroupForm onCreate={onCreate}/>
        </Sidebar>
    </div>
)