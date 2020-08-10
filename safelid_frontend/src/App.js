import React, {Component} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Entry from './components/entry/Entry';
import Dashboard from './components/dashboard/Dashboard';

import { Provider } from 'react-redux';
import store from './store';

class App extends Component {  

  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route path='/dashboard' component={ Dashboard } />
          <Route path='/' component={ Entry } />
        </Switch>
      </Provider>
    );
  }  
}

export default withRouter(App);