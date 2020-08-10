import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { changeName } from '../../actions/dashboardActions'
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../format.css';
import { Modal } from 'react-bootstrap/';
import axios from 'axios';


class DashboardNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            modalShow: false,
            modalState: '',
            renameValue: '',
            oldPasswordValue: '',
            newPasswordValue: ''
        };
    }
    
    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen})
    }

    logout = e => {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push('/login');
    }

    onInputChange = (e) => {
        this.setState({ [e.target.id] : e.target.value });
    }

    settingOnClick = e => {
        this.setState({modalState: e.target.value});
    }

    modalToggle = () => {
        this.setState({modalShow: !this.state.modalShow}, () => {
            if (this.state.modalShow) {
                this.setState({modalState: 'setting'})
            }
        });
    }

    onChangeName = () => {
        const data = {
            name: this.state.renameValue
        }
        this.props.changeName(data);
        this.modalToggle();
    }


    onChangePassword = () => {
        console.log('changing password')

        const config = { headers: {} };
        if (this.props.auth.token) {
            config.headers['x-auth-token'] = this.props.auth.token;
        }

        const data = {
            oldPassword: this.state.oldPasswordValue,
            newPassword: this.state.newPasswordValue
        }

        axios.post('http://localhost:5000/dashboard/changePassword', data, config)
            .then(res => {
                this.setState({modalState: 'changePasswordSuccess'});
            })
            .catch(err => {
                this.setState({modalState: 'changePasswordFail'});
            });
    }

    modalContent = () => {
        switch(this.state.modalState) {
            case 'setting':
                return (
                    <div>
                        <Modal.Body>
                            <button type="button" className="btn btn-outline-primary btn-sm btn-block" value='name' onClick={this.settingOnClick}>Change name</button>
                            <button type="button" className="btn btn-outline-primary btn-sm btn-block" value='password' onClick={this.settingOnClick}>Change password</button>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={this.modalToggle}>Close</button>
                        </Modal.Footer>
                    </div>
                );
            case 'name':
                return (
                    <div>
                        <Modal.Body>
                            <label>New name</label>
                            <input type="text" className="form-control" id="renameValue" onChange={this.onInputChange} onSubmit={this.onChangeName} />
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-outline-secondary btn-sm" value='setting' onClick={this.settingOnClick}>Back</button>
                            <button type="button" className="btn btn-outline-primary btn-sm" value='option' onClick={this.onChangeName}>Change name</button>
                        </Modal.Footer>
                    </div>
                );

            case 'password':
                return (
                    <div>
                        <Modal.Body>
                            <label>Current password</label>
                            <input type="password" className="form-control" id="oldPasswordValue" onChange={this.onInputChange} onSubmit={this.onChangePassword} />
                            <label>New password</label>
                            <input type="password" className="form-control" id="newPasswordValue" onChange={this.onInputChange} onSubmit={this.onChangePassword} />
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-outline-secondary btn-sm" value='setting' onClick={this.settingOnClick}>Back</button>
                            <button type="button" className="btn btn-outline-primary btn-sm" value='option' onClick={this.onChangePassword}>Change password</button>
                        </Modal.Footer>
                    </div>
                );
            case 'changePasswordSuccess':
                return (
                    <div>
                        <Modal.Body>
                            <label>Successfully changed password</label>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={this.modalToggle}>Close</button>
                        </Modal.Footer>
                    </div>
                );
            case 'changePasswordFail':
                return (
                    <div>
                        <Modal.Body>
                            <label>Fail to change password, either current password not correct or new password not valid</label>
                        </Modal.Body>
                        <Modal.Footer>
                        <button type="button" className="btn btn-outline-secondary btn-sm" value='password' onClick={this.settingOnClick}>Back</button>
                        </Modal.Footer>
                    </div>
                );
            default:
                return (<div></div>);
        }
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
                                        <a className="nav-link" onClick={this.modalToggle} style={{cursor: 'pointer'}}>Setting</a>
                                    </li>
                                    <li className="nav-item active">
                                        <a className="nav-link" onClick={this.logout} style={{cursor: 'pointer'}}>Logout</a>
                                    </li>
                                </ul>
                            </div>
                        {/* </div> */}
                    </div>
                    
                </nav>


                <Modal show={this.state.modalShow} onHide={this.modalToggle} size='sm' centered>
                    {this.modalContent()}
                </Modal>
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
    {
        logoutUser,
        changeName
    }
)(DashboardNavBar);