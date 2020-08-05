import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import File from './File';

import { getFolderContent } from '../../actions/dashboardActions';

class ItemContainer extends Component {



    render() {
        const { files } = this.props.item
        var rend_files
        if (files != null) {
            rend_files = files.map((file) => (
                <File file={file}/>
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