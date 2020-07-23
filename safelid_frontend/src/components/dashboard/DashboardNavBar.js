import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../format.css';


class DashboardNavBar extends Component {
    state = {
        isOpen: false
    }
    
    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen})
    }

    logout = e => {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        const {isOpen} = this.state;
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <form class="form-inline">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        </form>

                        <button class="navbar-toggler collapsed" type="button" onClick={this.toggle}>
                            <span class="navbar-toggler-icon" />
                        </button>

                        <div class={(isOpen ? "" : "collapse") + " navbar-collapse"} id="options">
                            <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                                
                                <li class="nav-item active">
                                    <a class="nav-link" href="/dashboard/setting">Setting</a>
                                </li>
                                <li class="nav-item active">
                                    <a class="nav-link" href="#" onClick={this.logout}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </nav>
            </div>
        );
    }
}

DashboardNavBar.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    {logoutUser}
)(DashboardNavBar);