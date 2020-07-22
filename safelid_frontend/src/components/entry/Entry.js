import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import history from '../../history';
import store from '../../store';
import { loadUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from './MainNavBar';
import Login from './Login';
import Register from './Register';

class Entry extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            history.push('/dashboard');
        }
    }
    
    // componentDidUpdate() {
    //     if (this.props.auth.isAuthenticated) {
    //         history.push('/dashboard');
    //     }
    // }

    render() {        
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
    error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});

export default connect(
    mapStateToProps
)(Entry);
