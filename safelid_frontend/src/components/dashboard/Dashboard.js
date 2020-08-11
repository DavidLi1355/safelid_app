import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardNavBar from './DashboardNavBar';
import ItemSidebar from './ItemSidebar';
import ItemContainer from './ItemContainer';
import { loadUser, logoutUser } from '../../actions/authActions';
import { toHomeFolder, getFolderContent, clearItem } from '../../actions/dashboardActions';

class Dashboard extends Component {
    componentDidMount() {
        console.log('Dashboard componentDidMount');
        this.props.loadUser()
            .then(() => {
                if (!this.props.auth.isAuthenticated) {
                    this.props.history.push('/login');
                }
                else {
                    this.props.getFolderContent();
                }
            });
    }

    componentDidUpdate(prevProps) {
        console.log('Dashboard componentDidUpdate');
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.props.getFolderContent();
        }
    }

    render() {
        const { history } = this.props;
        return (
            <div>
                <Switch>
                    <Route path='/dashboard/folder'>
                        <DashboardNavBar history={history}/>
                        <div className='container-fluid d-flex flex-column vh-100'>
                            <div className='row flex-grow'>
                                <div className='col-sm-3 col-md-2 pb-4'><ItemSidebar /></div>
                                <div className='col-sm-9 col-md-10 '><ItemContainer history={history}/></div>
                            </div>
                        </div>
                    </Route>
                    <Route path='/dashboard/file'></Route>
                    <Route path='/dashboard/setting'></Route>
                </Switch>
                
            </div>
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
        loadUser,
        logoutUser, 
        toHomeFolder,
        getFolderContent,
        clearItem
    }
)(Dashboard);