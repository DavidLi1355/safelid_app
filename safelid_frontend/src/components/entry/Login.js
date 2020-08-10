import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Form.css';

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
            <div className="card card-body card-format" >
                <h5 className="card-title text-center">Login</h5>
                <form noValidate onSubmit={this.onSubmit} className="">
                    <div className="card-content">
                        <label>Email or Username</label>
                        <input type="text" onChange={this.onChange} id="input" 
                            className="form-control" 
                        />
                        <span>
                            {error.input}
                        </span>
                    </div>
                    <div className="card-content">
                        <label>Password</label>
                        <input type="password" onChange={this.onChange} id="password" 
                            className="form-control" 
                        />
                        <span>
                            {error.password}
                        </span>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Login</button>
                </form>
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