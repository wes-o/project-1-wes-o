import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
    [key: string]: any;
}

export interface IFormState {
    reimbursement_id: number,
    reimbursement: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class EditReimbursement extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            reimbursement_id: this.props.match.params.reimbursement_id,
            reimbursement: {},
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:5000/reimbursements/${this.state.reimbursement_id}`).then(data => {
            this.setState({ reimbursement: data.data });
        })
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.patch(`http://localhost:5000/reimbursements/${this.state.reimbursement_id}`, this.state.values).then(_data => {
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        })
    }


    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.reimbursement &&
                    <div>
                        <h1> Reimbursement Management </h1>
                        <p>Please include all necessary fields</p>
                        <div>
                        <div className={"col-md-12 form-wrapper"}>
                            <h2>Edit Reimbursement</h2>

                            {submitSuccess && (
                                <div className="alert alert-info" role="alert">
                                    Reimbursement was edited successfully </div>
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

                                    <div className="form-group col-md-12">
                                        <label htmlFor="reimbursement_type"> Reimbursement Type </label>
                                        <input type="text" id="reimbursement_type" onChange={(e) => this.handleInputChanges(e)} name="reimbursement_type" className="form-control" placeholder="Enter the type of Reimbursement" />
                                    </div>

                                    <div className="form-group col-md-4 pull-right">
                                        <button className="btn btn-success" type="submit">
                                            Edit Reimbursement </button>
                                        {loading &&
                                            <span className="fa fa-circle-o-notch fa-spin" />
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(EditReimbursement);
