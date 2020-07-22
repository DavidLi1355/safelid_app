import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Redirect, BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from '../user/Dashboard';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            input: "",
            password: "",
            errors: {}
        };
    }
    
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            input: this.state.input,
            password: this.state.password
        };
    
        this.props.loginUser(userData);
    };

    render() {
        const { error } = this.props;

        return (
            <div class="container-sm row col-11 col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-body card-format my-4">
                    <h5 class="card-title text-center">Login</h5>
                    <form noValidate onSubmit={this.onSubmit}>
                        <div>
                            <label for="email">Email address</label>
                            <input 
                                onChange={this.onChange} 
                                type="email" 
                                class="form-control" 
                                id="input" 
                            />
                        </div>
                        <span>
                            {error.input}
                            {error.inputnotfound}
                        </span>
                        <div>
                            <label for="password">Password</label>
                            <input 
                                onChange={this.onChange} 
                                type="password" 
                                class="form-control" 
                                id="password" 
                            />
                        </div>
                        <span>
                            {error.password}
                            {error.passwordincorrect}
                        </span>
                        <button type="submit" class="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});

export default connect(
    mapStateToProps,
    {loginUser}
)(Login);