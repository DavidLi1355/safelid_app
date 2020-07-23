import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardNavBar from './DashboardNavBar';

class Dashboard extends Component {
    componentDidMount() {
        console.log('dashboard componentDidMount');
        if (!this.props.auth.isAuthenticated && !this.props.auth.isLoading) {
            this.props.history.push('/login');
        }
    }

    componentDidUpdate() {
        if (!this.props.auth.isAuthenticated && !this.props.auth.isLoading) {
            this.props.history.push('/login');
        }
    }
    
    logout = e => {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        return (
            <div>
                <DashboardNavBar />
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