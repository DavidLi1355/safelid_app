import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Entry from './components/entry/Entry';
import Dashboard from './components/user/Dashboard';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/dashboard' component={ Dashboard } />
            <Route path='/' component={ Entry } />
          </Switch>
        </Router>
      </Provider>
    );
  }  
}

export default App;
