import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <div className="container-sm row col-11 col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-body card-format">
                    <h5 className="card-title text-center">Login</h5>
                    <form noValidate onSubmit={this.onSubmit}>
                        <div>
                            <label htmlFor="email">Email or Username</label>
                            <input 
                                onChange={this.onChange} 
                                type="email" 
                                className="form-control" 
                                id="input" 
                            />
                            <span>
                                {error.input}
                                {error.inputnotfound}
                            </span>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input 
                                onChange={this.onChange} 
                                type="password" 
                                className="form-control" 
                                id="password" 
                            />
                            <span>
                                {error.password}
                                {error.passwordincorrect}
                            </span>
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});

export default connect(
    mapStateToProps,
    {loginUser}
)(Login);