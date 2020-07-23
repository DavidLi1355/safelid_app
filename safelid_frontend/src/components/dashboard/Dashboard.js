import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardNavBar from './DashboardNavBar';
import ItemSidebar from './ItemSidebar';
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
            <>
                <DashboardNavBar />
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-sm-3 sidebar sticky-sidebar'><ItemSidebar /></div>
                        <div className='col-sm-9'><ItemContainer /></div>
                        
                    </div>
                </div>
                
            </>
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