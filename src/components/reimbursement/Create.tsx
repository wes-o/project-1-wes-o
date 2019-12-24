import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';


export interface DateInterface extends Date {
    currentTime: Date;
}

export interface IValues {
    first_name: string,
    last_name: string,
    data_submitted: DateInterface[],
    date_resolved: string;
    status: string;
    description: string,
    reimbursement_type: number
}

export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class CreateReimbursement extends React.Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            values: [],
            first_name: '',
            last_name: '',
            data_submitted: '',
            date_resolved: '',
            status: '',
            description: '',
            reimbursement_type: '',
            loading: false,
            submitSuccess: false,
        }
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });

        const formData = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            data_submitted: this.state.date_submitted,
            date_resolved: this.state.date_resolved,
            status: this.state.status,
            description: this.state.description,
            reimbursement_type: this.state.reimbursement_type
        }

        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });

        axios.post(`http://localhost:5000/reimbursements`, formData).then(data => [
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        ]);
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div>
                <div className={"col-md-12 form-wrapper"}>
                    <h2> Create Reimbursement </h2>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Fill the form below to create a new reimbursement
                    </div>
                    )}

                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            The reimbursement was successfully submitted!
                            </div>
                    )}

                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>

                        <div className="form-group col-md-12">
                            <label htmlFor="first_name"> First Name </label>
                            <input type="text" id="first_name" onChange={(e) => this.handleInputChanges(e)} name="first_name" className="form-control" placeholder="Enter your first name" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="last_name"> Last Name </label>
                            <input type="text" id="last_name" onChange={(e) => this.handleInputChanges(e)} name="last_name" className="form-control" placeholder="Enter your last name" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="date_submitted"> Date Submitted </label>
                            <input type="date" id="date_submitted" onChange={(e) => this.handleInputChanges(e)} name="date_submitted" className="form-control" placeholder="Enter Date" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="date_resolved"> Date Resolved </label>
                            <input type="text" id="date_resolved" onChange={(e) => this.handleInputChanges(e)} name="date_resolved" className="form-control" placeholder="Enter Date.. to be resolved" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="status"> Status </label>
                            <input type="text" id="status" onChange={(e) => this.handleInputChanges(e)} name="status" className="form-control" placeholder="Enter Status" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="description"> Description </label>
                            <input type="text" id="description" onChange={(e) => this.handleInputChanges(e)} name="description" className="form-control" placeholder="Enter Description" />
                        </div>

                        <div className="form-check form-group col-md-12">
                        <label htmlFor="reimbursement_type"> Reimbursement Type </label>
                        <input type="text" id="reimbursement_type" onChange={(e) => this.handleInputChanges(e)} name="reimbursement_type" className="form-control" placeholder="Enter the type of Reimbursement" />
                            <label>Options Available: </label>
                            <select>
                                <option value="Food">Food</option>
                                <option value="Lodging">Lodging</option>
                                <option value="Travel">Travel</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit">Create Reimbursement</button>
                            {loading &&
                                <span className="fa fa-circle-o-notch fa-spin" />
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(CreateReimbursement);
