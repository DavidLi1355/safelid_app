import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from './MainNavBar';
import Login from './Login';
import Register from './Register';

class Entry extends Component {
    render() {
        if (this.props.auth.isAuthenticated) {
            return (
                <div><Redirect to="/dashboard" /></div>
            );
        }
        
        return (
            <div>
                <MainNavBar />
                <Switch>
                    <Route path='/login' component={ Login } />
                    <Route path='/register' component={ Register } />
                </Switch>
            </div>
        );
    }
}

Entry.propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});

export default connect(
    mapStateToProps
)(Entry);
