import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Tasks from './Tasks.component';
import Login from './Login.component';

class Index extends Component {
  render() {
    return (
      <Router>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">React CRUD Example</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/Tasks'} className="nav-link">Tasks</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/Login'} className="nav-link">Login</Link>
                </li>
              </ul>
            </div>
          </nav> <br/>
          <h2>Welcome to React CRUD Tutorial</h2> <br/>
          <Switch>
              <Route exact path='/tasks' component={ Tasks } />
              {/* <Route path='/edit/:id' component={ Edit } /> */}
              <Route path='/login' component={ Login } />
          </Switch>
      </Router>
    );
  }
}

export default Index;