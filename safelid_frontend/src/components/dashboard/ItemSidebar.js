import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Upload.css';

import {uploadFile} from '../../actions/dashboardActions';

class ItemSidebar extends Component {
    constructor() {
        super();
        this.state = {
            current_folder: {
                id: '5f1f20ab7c884941e46b6836',
                name: 'home'
            },
            prev_folder: {
                id: 'abc',
                name: 'home'
            },
            folders: [
                {id: '1', name: 'private'},
                {id: '2', name: 'public'},
                {id: '3', name: 'school'}
            ]
        };
    }

    onUpload = e => {
        var data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('name', 'test');
        data.append('user_id', this.props.auth.user.id)
        data.append('parent_folder_id', this.state.current_folder.id);
        e.target.value = null;
        this.props.uploadFile(data);
    }


    render() {
        const rend_folder = this.state.folders.map((folder) => (
            <div key={folder.id}>
                <li className='nav-item'>
                    <a className='nav-link'>{folder.name}</a>
                </li>
            </div> 
        ));

        return (
            <>
                <label className='custom-file-upload' enctype='multipart/form-data'>
                    <input type="file" onChange={this.onUpload} />
                    Upload
                </label>

                <ul className='nav flex-column'>
                    {rend_folder}
                </ul>
            </>
        );
    }
}

ItemSidebar.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {uploadFile}
)(ItemSidebar);