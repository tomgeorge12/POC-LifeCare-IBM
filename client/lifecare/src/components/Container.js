import React, { Component } from 'react'
import Header from './Header';
import Footer from './Footer';

class Container extends Component {
  render () {
    return(
        <div>
          <Header />
          {/* <LifecareMain /> */}
          <Footer />
        </div>
    )
  }
}

export default Container;
