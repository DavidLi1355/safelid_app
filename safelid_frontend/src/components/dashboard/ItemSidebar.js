import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Upload.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap/'

import { uploadFile, createFolder } from '../../actions/dashboardActions';

class ItemSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            folderName: ''
        };
    }

    onUpload = e => {
        var data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('user_id', this.props.auth.user.id)
        data.append('parent_folder_id', this.props.item.current_folder._id);
        e.target.value = null;
        this.props.uploadFile(data);
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onCreateFolder = e => {
        var name = 'test';
        var parent_folder_id = this.props.item.current_folder._id;
        var data = {
            'parent_folder_id': parent_folder_id,
            'name': name
        }
        this.props.createFolder(data);
    }
    
    createFolderToggle = () => {
        this.setState({modalShow: !this.state.modalShow});
        if (!this.state.modalShow) {
            console.log('clearing foldername')
            this.setState({folderName: ''});
        }
    }

    createFolderSubmit = () => {
        console.log(this.state.folderName);
        this.createFolderToggle();
    }



    render() {
        // this.props.getFolderContent();
        const { folders } = this.props.item
        var rend_folder
        if (folders != null) {
            rend_folder = folders.map((folder) => (
                <div key={folder._id + 'folder'}>
                    <li className='nav-item'>
                        <a className='nav-link'>{folder.name}</a>
                    </li>
                </div> 
            ));
        }
        else {
            rend_folder = (<div></div>)
        }
        
        return (
            <>
                <label className='custom-file-upload' enctype='multipart/form-data'>
                    <input type="file" onChange={this.onUpload} />
                    Upload File
                </label>

                <Button variant="primary" onClick={this.createFolderToggle}>
                    New Folder
                </Button>
                <Modal show={this.state.modalShow} onHide={this.createFolderToggle} size='sm' centered>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label>New Folder</label>
                                <input type="text" className="form-control" id="folderName" onChange={this.onChange} onSubmit={this.createFolderSubmit} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.createFolderToggle} variant="outline-secondary">Close</Button>
                        <Button onClick={this.createFolderSubmit} variant="outline-primary">Create</Button>
                    </Modal.Footer>
                </Modal>

                <ul className='nav flex-column'>
                    {rend_folder}
                </ul>
            </>
        );
    }
}

ItemSidebar.propTypes = {
    auth: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    item: state.item
});

export default connect(
    mapStateToProps,
    {
        uploadFile
    }
)(ItemSidebar);