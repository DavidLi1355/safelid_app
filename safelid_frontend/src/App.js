import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Entry from './components/entry/Entry';
import Dashboard from './components/dashboard/Dashboard';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

class App extends Component {  
  componentDidMount() {
    store.dispatch(loadUser());
    // this.redirectToLogin();
  }

  componentDidUpdate() {
    store.dispatch(loadUser());
    // this.redirectToLogin();
  }

  // redirectToLogin = () => {
  //   if (!this.props.auth.isAuthenticated && !this.props.auth.isLoading) {
  //       this.props.history.push('/login');
  //   }
  // }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path='/dashboard' component={ Dashboard } />
            <Route path='/' component={ Entry } />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }  
}

// Dashboard.propTypes = {
//   auth: PropTypes.object.isRequired,
//   item: PropTypes.object.isRequired
// }

// const mapStateToProps = state => ({
//   auth: state.auth,
//   item: state.item
// });

// export default connect(
//   mapStateToProps,
//   {
//       logoutUser, 
//       toHomeFolder,
//       getFolderContent,
//       loadUser
//   }
// )(Dashboard);

export default App;