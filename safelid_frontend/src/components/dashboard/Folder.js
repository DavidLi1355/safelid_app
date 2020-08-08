import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Modal } from 'react-bootstrap/';
import { renameFolder, deleteFolder, deleteFile, getFolderContentByID } from '../../actions/dashboardActions';
const folderImg = require('./folder_icon.png');

class Folder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            folder: props.folder,
            modalShow: false,
            modalState: '',
            renameValue: ''
        };
    }

    onRename = () => {
        const data = {
            FolderID: this.props.folder._id,
            name: this.state.renameValue
        };
        this.props.renamefolder(data);
        this.modalToggle();
    }

    onDelete = () => {
        const data = {
            FolderID: this.props.folder._id
        }
        this.props.deleteFolder(data);
        // this.recursiveDelete(this.props.folder._id);
        this.modalToggle();
    }

    // recursiveDelete = (folderID) => {
    //     JSONObject folderContent = new JSONObject(this.props.getFolderContentByID(folderID));
    //     const folderFolders = folderContent.getJSONArray('folders');
    //     const folderFiles = folderContent.getJSONArray('files');

    //     for (var folderNum = 0; folderNum < folderFolders.length(); folderNum++) {
    //         this.recursiveDelete(folderFolders.getJSONObject(folderNum).getString('_id'))
    //     }
    //     for (var fileNum = 0; fileNum < folderFiles.length(); fileNum++) {
    //         const fileID = folderFiles.getJSONObject(fileNum).getString('_id');
    //         const fildData = {
    //             FileID: fileID
    //         };
    //         console.log(fildData);
    //         // this.props.deleteFile(data);
    //     }


    //     const folderData = {
    //         FolderID: folderID
    //     };
    //     console.log(folderData);
    //     // this.props.deletefolder(data);
    // }

    cardOnClick = e => {
        e.preventDefault();
        if (e.type === 'click') {
            this.props.history.push('' + this.state.folder._id);
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

    modalContent = () => {
        switch(this.state.modalState) {
            case 'option':
                return (
                    <div>
                        <Modal.Body>
                            <button type="button" class="btn btn-outline-primary btn-sm btn-block" value='rename' onClick={this.optionOnClick}>Rename</button>
                            <button type="button" class="btn btn-outline-danger btn-sm btn-block" value='delete' onClick={this.optionOnClick}>Delete</button>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" class="btn btn-outline-secondary btn-sm" onClick={this.modalToggle}>Close</button>
                        </Modal.Footer>
                    </div>
                );
            case 'rename':
                return (
                    <div>
                        <Modal.Body>
                            <label>Rename</label>
                            <input type="text" className="form-control" id="rename" onChange={(e) => {this.setState({ renameValue: e.target.value });}} onSubmit={this.onRename} />
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" class="btn btn-outline-primary btn-sm" value='option' onClick={this.onRename}>Rename</button>
                            <button type="button" class="btn btn-outline-secondary btn-sm" value='option' onClick={this.optionOnClick}>Back</button>
                        </Modal.Footer>
                    </div>
                );
            case 'delete':
                return (
                    <div>
                        <Modal.Body>
                            <button type="button" class="btn btn-outline-danger btn-sm btn-block" value='delete' onClick={this.onDelete}>Delete</button>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" class="btn btn-outline-secondary btn-sm" value='option' onClick={this.optionOnClick}>Back</button>
                        </Modal.Footer>
                    </div>
                );

        }
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
                            <img className="card-img-top embed-responsive-item" src={folderImg}/>
                        </div>
                            
                        <div className="card-body d-flex flex-column">
                            <p className="card-text mt-auto">{this.props.folder.name}</p>
                            <a className='stretched-link' onClick={this.cardOnClick} />
                            <a type='button' className="btn btn-outline-primary" style={buttonStyle} onClick={this.modalToggle}>Option</a>
                        </div>
                    </div>

                    <Modal show={this.state.modalShow} onHide={this.modalToggle} size='sm' centered>
                        {this.modalContent()}
                    </Modal>
                </>
        );
    }
}

Folder.propTypes = {
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
        renameFolder, 
        deleteFolder,
        deleteFile,
        getFolderContentByID
    }
)(Folder);