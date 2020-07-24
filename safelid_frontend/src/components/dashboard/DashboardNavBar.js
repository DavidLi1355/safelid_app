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
            <>
                <nav className="navbar fixed-top navbar-expand-sm navbar-light bg-light">
                    <div className="container-fluid">
                        {/* <div className='row'> */}
                            <form className="form-inline">
                                <input className="form-control mr-sm" type="search" placeholder="Search" aria-label="Search" />
                            </form>

                            <button className="navbar-toggler collapsed" type="button" onClick={this.toggle}>
                                <span className="navbar-toggler-icon" />
                            </button>

                            <div className={(isOpen ? "" : "collapse") + " navbar-collapse"} id="options">
                                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/dashboard/setting">Setting</a>
                                    </li>
                                    <li className="nav-item active">
                                        <a className="nav-link" href="#" onClick={this.logout}>Logout</a>
                                    </li>
                                </ul>
                            </div>
                        {/* </div> */}
                    </div>
                    
                </nav>
            </>
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