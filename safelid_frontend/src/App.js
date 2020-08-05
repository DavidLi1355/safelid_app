import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Entry from './components/entry/Entry';
import Dashboard from './components/dashboard/Dashboard';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

class App extends Component {  

  render() {
    return (
      <Provider store={store}>
        {/* <BrowserRouter> */}
          <Switch>
            <Route path='/dashboard' component={ Dashboard } />
            <Route path='/' component={ Entry } />
          </Switch>
        {/* </BrowserRouter> */}
      </Provider>
    );
  }  
}

export default withRouter(App);