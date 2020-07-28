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
                id: 'abc',
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
        
        // const temp = {
        //     data: data,
        //     folder: this.state.current_folder.id
        // }

        // data.append('folder', this.state.current_folder.id);
        this.props.uploadFile(temp);
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
                <label className='custom-file-upload'>
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

}

const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps,
    {uploadFile}
)(ItemSidebar);