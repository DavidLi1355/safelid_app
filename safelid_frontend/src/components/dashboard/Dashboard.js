import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardNavBar from './DashboardNavBar';
import ItemSidebar from './ItemSidebar';
import ItemContainer from './ItemContainer';
import { loadUser, logoutUser } from '../../actions/authActions';
import { toHomeFolder, getFolderContent } from '../../actions/dashboardActions';

class Dashboard extends Component {
    componentDidMount() {
        console.log('Dashboard componentDidMount');
        this.redirectToLogin();
        this.props.getFolderContent();
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

    render() {
        return (
            <>
                <DashboardNavBar />
                <div className='container-fluid d-flex flex-column overflow-hidden vh-100'>
                    <div className='row flex-grow-1 overflow-hidden'>
                        <div className='col-sm-3 mh-100 py-2'><ItemSidebar /></div>
                        <div className='col-sm-9 mh-100 '><ItemContainer /></div>
                        
                    </div>
                </div>
                
            </>
        );
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    item: state.item
});

export default connect(
    mapStateToProps,
    {
        logoutUser, 
        toHomeFolder,
        getFolderContent,
        loadUser
    }
)(Dashboard);