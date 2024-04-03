// setting up some global error hangler
import React, { Component, Fragment } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrappedComponent, axios ) => {
  return class extends Component {
    state = {
      error: null
    }

  /* This Hoc (withErrorHandler) can be wrapped around multiple components
     The problem is every time when this hoc is added to other components ,
     componentDidMount will be called repeatedly.Multiple intercepots are being
     attached to the same axois instance.It can cause the problem later, a lot
     of interceptors sitting in memory, which react to request can leak  memory */

    componentDidMount () {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterseptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error })
      });
    }
    // Remove inteceptors
    componentDidUnmount () {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null })
    }

    render () {
      return (
        <Fragment>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>

      );
    }
  }
}

export default withErrorHandler;
