import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../format.css';

class MainNavBar extends Component {
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
                <nav class="navbar navbar-expand-sm navbar-light bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/">SafeLid</a>

                        <button class="navbar-toggler collapsed" type="button" onClick={this.toggle}>
                            <span class="navbar-toggler-icon" />
                        </button>

                        <div class={(isOpen ? "" : "collapse") + " navbar-collapse"} id="options">
                            <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                                <li class="nav-item active">
                                <a class="nav-link" href="/login">Login</a>
                                </li>
                                <li class="nav-item active">
                                <a class="nav-link" href="/register">Register</a>
                                </li>
                            </ul>
                        </div>
                    </div>


                    
                    
                </nav>
            </div>
        );
    }
}

export default MainNavBar;