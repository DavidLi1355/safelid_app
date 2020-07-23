import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../format.css';

class EntryNavBar extends Component {
    state = {
        isOpen: false
    }
    
    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen})
    }
    
    render() {
        const {isOpen} = this.state;
        return (
            <div>
                <nav className="navbar fixed-top navbar-expand-sm navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">SafeLid</a>

                        <button className="navbar-toggler collapsed" type="button" onClick={this.toggle}>
                            <span className="navbar-toggler-icon" />
                        </button>

                        <div className={(isOpen ? "" : "collapse") + " navbar-collapse"} id="options">
                            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                                <li className="nav-item active">
                                <a className="nav-link" href="/login">Login</a>
                                </li>
                                <li className="nav-item active">
                                <a className="nav-link" href="/register">Register</a>
                                </li>
                            </ul>
                        </div>
                    </div>


                    
                    
                </nav>
            </div>
        );
    }
}

export default EntryNavBar;