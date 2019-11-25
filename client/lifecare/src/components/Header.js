import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from '../lifecarelogo_Red.png';

class Container extends Component {
  constructor(props){
    super(props)
    // this.onLoginClick=this.onLoginClick.bind(this)
  }
  // onLoginClick(){
  //   document.URL='/login';
  // }
  render () {
    return(
        <div className="header-main">
          <img className="header-logo" src={logo}/>
          {!this.props.userLoggedIn && <Link to="/login" className="header-signin" >Signin</Link>}
          {!this.props.userLoggedIn && <Link to="/login" className="header-signup" >SignUp</Link>}
        </div>
    )
  }
}

export default Container;
