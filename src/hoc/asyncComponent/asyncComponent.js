    /* A big application with distinct features and distinct areas in the app where
       a user might never visit a certain area. Loading the code responsible for that
       (certain area) component doesn't make a lot of sense. It is useful to know a
       technique for real for bigger applications where you are downloading quite a
       bit. The technique of downloading only what you need is known as code splitting
       or lazy loading (We can load them asynchronously lazily ) */
import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component : null
    }

    componentDidMount () {
      importComponent()
       .then(cmp => {
         this.setState({ component: cmp.default });
       });
    }

    render() {
      const C = this.state.component;

      return C ? < C {...this.props} /> : null;
    }
  }
}

export default asyncComponent;
