import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
// import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
// import './react-contextmenu.css';
import { Modal } from 'react-bootstrap/';
import { renameFile, deleteFile } from '../../actions/dashboardActions';

class File extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            modalShow: false,
            modalState: '',
            renameValue: ''
        };
    }

    componentDidMount() {
        const config = { 
            responseType: 'arraybuffer',
            headers: {} 
        };
        if (this.props.auth.token) {
            config.headers['x-auth-token'] = this.props.auth.token;
        }
    
        axios.get('http://localhost:5000/dashboard/file/' + this.props.file._id, config)
            .then(res => {
                const base64 = btoa(
                    new Uint8Array(res.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                this.setState({file: "data:;base64," + base64});
            })
    }

    onRename = () => {
        const data = {
            FileID: this.props.file._id,
            name: this.state.renameValue
        };
        this.props.renameFile(data);
        this.modalToggle();
    }

    onDownload = () => {
        const config = {
            responseType: 'blob',
            headers: {} 
        };
        if (this.props.auth.token) {
            config.headers['x-auth-token'] = this.props.auth.token;
        }

        axios.get('http://localhost:5000/dashboard/file/' + this.props.file._id, config)
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', this.props.file.filename); //or any other extension
                document.body.appendChild(link);
                link.click();
                this.modalToggle();
            });
    }

    onDelete = () => {
        const data = {
            FileID: this.props.file._id
        };
        this.props.deleteFile(data);
        this.modalToggle();
    }

    cardOnClick = e => {
        e.preventDefault();
        if (e.type === 'click') {
            window.open('http://localhost:3000/dashboard/file/' + this.props.file._id);
        }
        else if (e.type === 'contextmenu') {
            console.log('card right click')
        }
    }
    
    optionOnClick = e => {
        this.setState({modalState: e.target.value})
    }

    modalToggle = () => {
        this.setState({modalShow: !this.state.modalShow}, () => {
            if (this.state.modalShow) {
                this.setState({modalState: 'option'})
            }
        });
    }

    modalBody = () => {
        switch(this.state.modalState) {
            case 'option':
                return (
                    <div>
                        <button type="button" class="btn btn-outline-primary btn-sm btn-block" value='rename' onClick={this.optionOnClick}>Rename</button>
                        <button type="button" class="btn btn-outline-primary btn-sm btn-block" onClick={this.onDownload}>Download</button>
                        <button type="button" class="btn btn-outline-danger btn-sm btn-block" value='delete' onClick={this.optionOnClick}>Delete</button>
                    </div>
                );
            case 'rename':
                return (
                    <div>
                        <label>Rename</label>
                        <input type="text" className="form-control" id="rename" onChange={(e) => {this.setState({ renameValue: e.target.value });}} onSubmit={this.onRename} />
                    </div>
                );
            case 'delete':
                return (
                    <div>
                        <button type="button" class="btn btn-outline-danger btn-sm btn-block" value='delete' onClick={this.onDelete}>Delete</button>
                    </div>
                );

        }
    }

    modalFooter = () => {
        switch(this.state.modalState) {
            case 'option':
                return (
                    <div>
                        <button type="button" class="btn btn-outline-secondary btn-sm" onClick={this.modalToggle}>Close</button>
                    </div>
                );
            case 'rename': 
                return (
                    <div>
                        <button type="button" class="btn btn-outline-primary btn-sm" value='option' onClick={this.onRename}>Rename</button>
                        <button type="button" class="btn btn-outline-secondary btn-sm" value='option' onClick={this.optionOnClick}>Back</button>
                    </div>
                );
            case 'delete': 
                return (
                    <div>
                        <button type="button" class="btn btn-outline-secondary btn-sm" value='option' onClick={this.optionOnClick}>Back</button>
                    </div>
                );
        }
    }
    

    onNotImg = (e) => {
        e.target.src = require('./file_notimg.jpg');
    }
    

    render() {
        const buttonStyle = {
            position: 'relative',
            zIndex: 2
        };
        
        return (
                <>
                    <div className="card h-100">
                        <div class="embed-responsive embed-responsive-4by3">
                            <img className="card-img-top embed-responsive-item" src={this.state.file} onError={this.onNotImg}/>
                        </div>
                            
                        <div className="card-body d-flex flex-column">
                            <p className="card-text mt-auto">{this.props.file.filename}</p>
                                <a className='stretched-link' onClick={this.cardOnClick} />
                                <a type='button' className="btn btn-outline-primary" style={buttonStyle} onClick={this.modalToggle}>Option</a>
                        </div>
                    </div>

                    <Modal show={this.state.modalShow} onHide={this.modalToggle} size='sm' centered>
                        <Modal.Body>
                            {this.modalBody()}
                        </Modal.Body>
                        <Modal.Footer>
                            {this.modalFooter()}
                        </Modal.Footer>
                    </Modal>
                </>
        );
    }
}

File.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    {
        renameFile,
        deleteFile
    }
)(File);