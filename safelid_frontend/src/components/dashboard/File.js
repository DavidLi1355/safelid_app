import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

class File extends Component {
    constructor(props) {
        super(props);
        this.state = {file: null};
    }

    componentDidMount() {
        const config = { headers: {} };
        if (this.props.auth.token) {
            config.headers['x-auth-token'] = this.props.auth.token;
        }
    
        axios.get('http://localhost:5000/dashboard/file/' + this.props.file._id, { responseType: 'arraybuffer' }, config)
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

    cardOnClick = e => {
        console.log('card onclick');
    }

    optionOnClick = e => {
        console.log('option onclick');
    }

    render() {
        const buttonStyle = {
            position: 'relative',
            zIndex: 2
        };
        
        return (
            <div className='col-sm-12 col-md-4 p-2' key={this.props.file._id + 'file'}>
                <div className="card h-100">
                    
                    <img className="card-img-top" src={this.state.file} />
                    <div className="card-body d-flex flex-column">
                        <h4 className="card-text mt-auto">{this.props.file.filename}</h4>
                        <a className='stretched-link' onClick={this.cardOnClick} />
                        <a type='button' className="btn btn-secondary" style={buttonStyle} onClick={this.optionOnClick}>Option</a>
                        
                    </div>
                    
                </div>
            </div>
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
    mapStateToProps
)(File);