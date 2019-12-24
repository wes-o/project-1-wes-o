import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';


interface IState {
    users: any[] 
    reimbursements: any[]
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { users: [] , reimbursements: [] }
    }

    // public componentDidMount(): void {
    //     axios.get(`http://localhost:5000/users`).then(data => {
    //         this.setState({ users: data.data })
    //     });
    // }
    // public componentDidMount(): void {
    //     axios.get(`http://localhost:5000/reimbursements`).then(data => {
    //         this.setState({ reimbursements: data.data })
    //     })
    // }

    // It may be helpful to test these one at a time to isolate 'state'

    // public getUsers = () => {
    //     const data = axios.get(`http://localhost:5000/users`);
    //         return data;    
    //     //this.setState({ users: data.data });
    // }

    // public getReimbursements = () => {
    //     const data = axios.get(`http://localhost:5000/reimbursements`);
    //         return data;
    //     //this.setState({ reimbursements: data.data });
    // }

    // Perform multiple concurrent requests 
    public async componentDidMount() {
        const [firstReq, secondReq] = await Promise.all([
            axios.get(`http://localhost:5000/users`),
            axios.get(`http://localhost:5000/reimbursements`)
        ])
        this.setState({
            users: firstReq.data,
            reimbursements: secondReq.data });   
    }

    public deleteUser(id: number) {
        axios.delete(`http://localhost:5000/users/${id}`).then(_data => {
            const index = this.state.users.findIndex(user => user.id === id);
            this.state.users.splice(index, 1);
            this.props.history.push('/');
        })
    }

    public deleteReimbursement(id: number) {
        axios.delete(`http://localhost:5000/reimbursements/${id}`).then(_data => {
            const index = this.state.reimbursements.findIndex(reimbursement => reimbursement.id === id);
            this.state.reimbursements.splice(index, 1);
            this.props.history.push('/');
        })
    }

    public render() {
        const users = this.state.users;
        const reimbursements = this.state.reimbursements;
        return (
            <div>
                {users.length === 0 && (
                    <div className="text-center">
                        <p><em>No user profile available</em><br />
                            <span>Please log in to view</span>    
                        </p>
                    </div>
                )}

                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map(user =>
                                    <tr key={user.id}>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.address}</td>
                                        <td>{user.description}</td>
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <Link to={`edit/${user.id}`} className="btn btn-sm btn-outline-secondary">Edit User </Link>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteUser(user.id)}>Delete User</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div id="break"> 
                </div>

                {reimbursements.length === 0 && (
                    <div className="text-center">
                        <h3>&#9885; Reimbursement &#9885;</h3>
                        <p><em>No reimbursements available</em><br />
                            <span>Please log in to view</span>
                        </p>
                    </div>
                )}

                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Date Submitted</th>
                                    <th scope="col">Date Resolved</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Reimbursement Type</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reimbursements && reimbursements.map(r =>
                                    <tr key={r.reimbursement_id}>
                                        <td>{r.first_name}</td>
                                        <td>{r.last_name}</td>
                                        <td>{r.date_submitted}</td>
                                        <td>{r.date_resolved}</td>
                                        <td>{r.status}</td>
                                        <td>{r.description}</td>
                                        <td>{r.reimbursement_type}</td>
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "10px" }}>
                                                    <Link to={`reimbursement/edit/${r.reimbursement_id}`} className="btn btn-sm btn-outline-secondary">Edit Reimbursement </Link>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteReimbursement(r.reimbursement_id)}>Delete Reimbursement</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            
        )
    }
}
