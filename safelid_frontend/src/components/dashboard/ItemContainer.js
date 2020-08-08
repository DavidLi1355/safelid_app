import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import File from './File';
import Folder from './Folder';

import { getFolderContent } from '../../actions/dashboardActions';

class ItemContainer extends Component {

    render() {
        const { files, folders } = this.props.item;
        const { history } = this.props;
        console.log(rend_files)
        console.log(files)


        var rend_folders = null;
        if (folders != null) {
            rend_folders = folders.map((folder) => (
                <div className='col-sm-6 col-md-3 p-2' key={folder._id + 'folder'} >
                    <Folder folder={folder} history={history}/>
                </div> 
                
            ));
        }
        else {
            rend_folders = (<div></div>)
        }

        var rend_files = null;
        if (files != null) {
            rend_files = files.map((file) => (
                <div className='col-sm-6 col-md-3 p-2' key={file._id + 'file'} >
                    <File file={file} history={history}/>
                </div> 
                
            ));
        }
        else {
            rend_files = (<div></div>)
        }
        
        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href=''>Home</a></li>
                    </ol>
                </nav>
                <div className='container-fluid'>
                    <div className='row flex-grow-1 '>
                        {rend_folders}
                    </div>
                    <div className='row flex-grow-1 '>
                        {rend_files}
                    </div>
                </div>  
            </>
        );
    }
}

ItemContainer.propTypes = {
    item: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    item: state.item
});

export default connect(
    mapStateToProps,
    {getFolderContent}
)(ItemContainer);