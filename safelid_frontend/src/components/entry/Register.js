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
            <div className="container row col-11 col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-body card-format">
                    <h5 className="card-title text-center">Register</h5>
                    <form noValidate onSubmit={this.onSubmit} className="form-format">
                        <div>
                            <label htmlFor="name">Name</label>
                            <input 
                                onChange={this.onChange} 
                                type="text" 
                                className="form-control" 
                                id="name" 
                            />
                            <span>
                                {error.name}
                            </span>
                        </div>
                        <div>
                            <label htmlFor="email">Email Address</label>
                            <input 
                                onChange={this.onChange} 
                                type="email" 
                                className="form-control" 
                                id="email"
                            />
                        </div>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input 
                                onChange={this.onChange} 
                                type="text" 
                                className="form-control" 
                                id="username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input 
                                onChange={this.onChange} 
                                type="password" 
                                className="form-control" 
                                id="password"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Confirm Password</label>
                            <input 
                                onChange={this.onChange} 
                                type="password" 
                                className="form-control" 
                                id="confirm_password"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
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