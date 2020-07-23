import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Item from './Item';
import 'bootstrap/dist/css/bootstrap.min.css';

class ItemContainer extends Component {
    constructor() {
        super();
        this.state = {
            name: 'home',
            prev_folder: 'home',
            folders: [
                {id: '1', name: 'private'},
                {id: '2', name: 'public'},
                {id: '3', name: 'school'}
            ],
            files: [
                {id: '1', name: 'card'},
                {id: '2', name: 'card'},
                {id: '3', name: 'card'},
                {id: '4', name: 'card'},
                {id: '5', name: 'card'},
                {id: '6', name: 'card'},
                {id: '7', name: 'card'},
                {id: '8', name: 'card'},
                {id: '9', name: 'card'}
            ]
        };
    }

    componentDidMount() {
        
    }

    render() {
        const rend_files = this.state.files.map((file) => (
            <div key={file.id}>
                <div className="card">
                    <img className="card-img-top" alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{file.name}</h5>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        ));
        
        return (
            <div>
                {rend_files}
            </div>
        );
    }
}

ItemContainer.propTypes = {

}

const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps
)(ItemContainer);