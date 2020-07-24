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
                {id: 'private', name: 'private'},
                {id: 'public', name: 'public'},
                {id: 'school', name: 'school'}
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
            <div className='col-sm-12 col-md-4 p-2'>
                <div className="card" key={file.id}>
                    <img className="card-img-top" alt="Card image cap" />
                    <div className="card-body">
                        <h4 className="card-title">{file.name}</h4>
                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    </div>
                </div>
            </div>
            
        ));
        
        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Back</a></li>
                    </ol>
                </nav>
                {/* <div className='container-fluid'> */}
                    <div className='row flex-grow-1 '>
                        {rend_files}
                    </div>
                {/* </div>   */}
            </>
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