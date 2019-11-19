import React, { Component } from 'react'
import logo from '../lifecarelogo_Red';

class Container extends Component {
  render () {
    return(
        <div>
          <img className="" src={logo}/>
          <button>Signin</button>
          <button>SignUp</button>
        </div>
    )
  }
}

export default Container;
