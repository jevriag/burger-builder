import React, { Component, Fragment }from 'react';

import classes from './Modal.css';
import BackDrop from '../BackDrop/BackDrop'

const getStyle = (props) => ({
    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
    opacity: props.show ? '1' : '0',
});

class Modal extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render () {
        return (
            <Fragment>
                <BackDrop
                    show={this.props.show}
                    backdropClicked={this.props.modalClosed}
                />
                <div
                    className={classes.Modal}
                    style={getStyle(this.props)}
                >
                    {this.props.children}
                </div>
            </Fragment>
        )
    }
}

export default Modal;
