import React, { Component } from 'react'
import logo from '../lifecarelogo_Red.png';

class Container extends Component {
  render () {
    return(
        <div className="header-main">
          <img className="header-logo" src={logo}/>
          <button className="header-signin">Signin</button>
          <button className="header-signup">SignUp</button>
        </div>
    )
  }
}

export default Container;
