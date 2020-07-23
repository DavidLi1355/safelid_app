import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardNavBar from './DashboardNavBar';
import ItemTree from './ItemTree';
import ItemContainer from './ItemContainer';

class Dashboard extends Component {
    componentDidMount() {
        console.log('Dashboard componentDidMount');
        this.redirectToLogin();
    }

    componentDidUpdate() {
        console.log('Dashboard componentDidUpdate');
        this.redirectToLogin();
    }

    redirectToLogin = () => {
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
                <ItemTree />
                <ItemContainer />
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