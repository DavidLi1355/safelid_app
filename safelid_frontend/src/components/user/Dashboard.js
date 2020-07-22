import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from '../../history';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserNavBar from './UserNavBar';

import store from '../../store';
import { loadUser } from '../../actions/authActions';

class Dashboard extends Component {
    componentDidMount() {
        // console.log(this.props.auth);
    }

    // componentDidUpdate() {
    //     if (!this.props.auth.isAuthenticated) {
    //         history.push('/login');
    //     }
    // }
    
    logout = e => {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        return (
            <div>
                {/* <Router history={history}> */}
                    <UserNavBar />
                    <Switch>
                        {/* <Route path='/login' component={ Login } /> */}
                    </Switch>
                {/* </Router> */}
            </div>
        );
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    {logoutUser}
)(Dashboard);