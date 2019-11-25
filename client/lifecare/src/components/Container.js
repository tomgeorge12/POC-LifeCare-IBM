import React, { Component } from 'react'
import Header from './Header';
import Footer from './Footer';
import LifecareMain from './LifecareMain';
import Navbar from './Navbar';

class Container extends Component {
  render () {
    return(
        <div>
          <div className="sticky">
            <Header userLoggedIn={this.props.userLoggedIn}/>
            <Navbar />
          </div>
          <LifecareMain {...this.props}/>
          <Footer />
        </div>
    )
  }
}

export default Container;
