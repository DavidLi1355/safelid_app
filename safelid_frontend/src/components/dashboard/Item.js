import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Item extends Component {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

Item.propTypes = {

}

const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps
)(Item);