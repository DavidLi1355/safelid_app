import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Item from './Item';

class ItemContainer extends Component {
    render() {
        return (
            <div>
                
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