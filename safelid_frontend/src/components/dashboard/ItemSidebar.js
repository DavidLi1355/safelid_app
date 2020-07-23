import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ItemSidebar extends Component {
    constructor() {
        super();
        this.state = {
            name: 'home',
            prev_folder: 'home',
            folders: [
                {id: '1', name: 'private'},
                {id: '2', name: 'public'},
                {id: '3', name: 'school'}
            ]
        };
    }

    render() {
        const rend_folder = this.state.folders.map((folder) => (
            <div key={folder.id}>
                <li className='nav-item'>{folder.name}</li>
            </div>
        ));

        return (
            <div className='sidebar-sticky'>
                <a href="#" className="btn btn-primary">upload</a>
                <ul className='nav flex-column'>
                    {rend_folder}
                </ul>
            </div>
        );
    }
}

ItemSidebar.propTypes = {

}

const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps
)(ItemSidebar);