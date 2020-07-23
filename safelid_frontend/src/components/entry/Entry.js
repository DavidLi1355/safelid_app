import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from './MainNavBar';
import Login from './Login';
import Register from './Register';

class Entry extends Component {
    componentDidUpdate() {
        console.log('entry componentdidupdate');
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

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
    error: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error,
});

// export default withRouter(Entry);

export default connect(
    mapStateToProps
)(Entry);
