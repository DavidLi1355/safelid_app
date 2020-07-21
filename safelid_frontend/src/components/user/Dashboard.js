import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserNavBar from './UserNavBar';

class Dashboard extends Component {
    logout = e => {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        if (!this.props.auth.isAuthenticated) {
            return (
                <div><Redirect to="/login" /></div>
            );
        } 
        return (
            <div>
                <UserNavBar />
                <Switch>
                    {/* <Route path='/login' component={ Login } /> */}
                </Switch>
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