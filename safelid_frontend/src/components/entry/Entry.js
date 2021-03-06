import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import EntryNavBar from './EntryNavBar';
import Login from './Login';
import Register from './Register';
import { loadUser } from '../../actions/authActions';
import { toHomeFolder } from '../../actions/dashboardActions';

class Entry extends Component {
    componentDidMount() {
        console.log('Entry componentDidMount');
        this.props.loadUser()
            .then(() => {
                this.redirectToDashboard();
            });
    }

    componentDidUpdate() {
        console.log('Entry componentDidUpdate');
        this.redirectToDashboard();
    }

    redirectToDashboard = () => {
        if (this.props.auth.isAuthenticated) {
            this.props.toHomeFolder(this.props.history);
        }
    }

    render() {
        return (
            <div>
                <EntryNavBar />
                <Switch>
                    <div className="container-sm row mx-auto" style={{maxWidth: '500px'}}>
                        <Route path='/login' component={ Login } />
                        <Route path='/register' component={ Register } />
                    </div>
                </Switch>
            </div>
        );
    }
}

Entry.propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error,
});

export default connect(
    mapStateToProps,
    {
        loadUser,
        toHomeFolder
    }
)(Entry);