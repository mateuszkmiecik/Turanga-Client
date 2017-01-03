import React from 'react';

export default ({users}) => (
    <div className="row">
        <div className="col-sm-6">
            <table className="pt-table pt-fill pt-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>User role</th>
                    <th>Group</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map(u => (
                    <tr key={u._id}>
                        <td>{u.username}</td>
                        <td>{u.username}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        <div className="col-sm-6">
            <h4>Add user</h4>
        </div>
    </div>
)