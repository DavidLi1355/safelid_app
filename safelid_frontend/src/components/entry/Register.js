import React, { Component } from "react";
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Form.css';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            username: "",
            password: "",
            confirm_password: "",
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
    
        const userData = {
            name: this.state.name,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            confirm_password: this.state.confirm_password,
        };
    
        this.props.registerUser(userData, this.props.history);
    };

    render() {
        const { error } = this.props;
        
        return (
            <div className="card card-body card-format">
                <h5 className="card-title text-center">Register</h5>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="card-content">
                        <label>Name</label>
                        <input type="text" onChange={this.onChange} id="name" 
                            className="form-control" 
                        />
                        <span>
                            {error.name}
                        </span>
                    </div>
                    <div className="card-content">
                        <label>Email Address</label>
                        <input type="email" onChange={this.onChange} id="email"
                            className="form-control" 
                        />
                        <span>
                            {error.email}
                        </span>
                    </div>
                    <div className="card-content">
                        <label>Username</label>
                        <input type="text" onChange={this.onChange} id="username"
                            className="form-control" 
                        />
                        <span>
                            {error.username}
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
                    <div className="card-content">
                        <label>Confirm Password</label>
                        <input type="password" onChange={this.onChange} id="confirm_password"
                            className="form-control" 
                        />
                        <span>
                            {error.confirm_password}
                        </span>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Register</button>
                </form>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});

export default connect(
    mapStateToProps,
    {registerUser}
)(Register);