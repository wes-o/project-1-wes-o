import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import Home from './components/Home';
import CreateUser from './components/user/Create';
import EditUser from './components/user/Edit';
import CreateReimbursement from './components/reimbursement/Create';
import EditReimbursement from './components/reimbursement/Edit';


class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to={'/'}> Home </Link>
            </li>
            <li>
              <Link to={'/create'}> Create User </Link>
            </li>
            <li>
              <Link to={'/reimbursement'}> Create Reimbursement </Link>
            </li>
          </ul>
        </nav>
        <h2>&#9885; Dashboard &#9885;</h2>
  
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/create'} exact component={CreateUser} />
          <Route path={'/edit/:id'} exact component={EditUser} />
          <Route path={'/reimbursement'} exact component={CreateReimbursement} />
          <Route path={'/reimbursement/edit/:reimbursement_id'} exact component={EditReimbursement} />
        </Switch>

        <address>
          <strong>
            <em>Expense Reimbursement System</em>
          </strong>
          <p>
            <abbr title="UI">User Interface</abbr>
          </p>
        </address>

        <div>
          <footer className="footer">
            <div>
              Wes Oler Copyright &copy; 2019
            <p>Created and Maintained by <a href="https://github.com/wes-o">Wes O</a></p>
            </div>
          </footer>
        </div>

      </div>
    );
  }
}

export default withRouter(App);
