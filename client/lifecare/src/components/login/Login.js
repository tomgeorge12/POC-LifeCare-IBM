import React, { Component } from 'react';
import $ from 'jquery';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import UserRegister from './UserRegister';
import logo from '../../lifecarelogo_Red.png'

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
        username: '',
        password: '',
        signUpMode: false,
        loginError: false,
        errorMessage: ''
    }
    this.inputOnChange=this.inputOnChange.bind(this);
    this.getEncodedString=this.getEncodedString.bind(this);
    this.onSignupClick=this.onSignupClick.bind(this);
    this.onSignin=this.onSignin.bind(this);
  }
  componentDidMount(){
      if(this.props.signUpMode) this.setState({ signUpMode:this.props.signUpMode })
  }
  getEncodedString(value) {
    return typeof value === 'string' ? window.btoa(value) : value;
  }

  onSignin(){
      const {username, password} = this.state;
    const login = {
        username: this.getEncodedString(username),
        password: this.getEncodedString(password),
    }
    $.ajax({
        type: 'POST',
        data:login,
        dataType:'json',
        url: '/users/login',
           success: (data)=> {
            sessionStorage.userLoggedIn = data.loginSuccess;
            sessionStorage.username = data.user;
             this.props.onSignIn(data.loginSuccess);
           },
        error: (error)=> {
          if(error && error.loginSuccess === 'false') 
            this.setState({loginError:true, errorMessage: 'Please Check Username/Password'});
          else
            this.setState({loginError:true, errorMessage: 'Unknown Error occured. Please Try Again!'});
        }
      });
    }

    inputOnChange(e, type){
    this.setState({loginError:false, errorMessage: ''});
      if(e) {
        this.setState({[type]:e.target.value});
      }
    }

    onSignupClick(signUpMode){
        this.setState({loginError:false, errorMessage: ''});
        this.setState({signUpMode});
    }

 render () {
     const {username, password, signUpMode, loginError, errorMessage} = this.state;

     if(signUpMode) {
         return (
             <UserRegister onSignupClick={this.onSignupClick}/>
         )
     }
      return (
        <div  className="login-main">
            <div className="login-entry">
                <img src={logo}/>
                {loginError && <span className="login-error">{errorMessage}</span>}
                <div>
                    <input 
                        type="text"
                        className="login-input"
                        value={username}
                        onChange={(e)=>this.inputOnChange(e, 'username')}
                        id="username"
                        placeholder="Username"/>
                </div>
                <div>
                    <input
                        type="password"
                        className="login-input"
                        id="inputPassword"
                        value={password}
                        onChange={(e)=>this.inputOnChange(e, 'password')}
                        placeholder="Password"/>
                </div>
                <button type="submit" className="login-button"  onClick={()=>this.onSignin(username, password)}>Sign in</button>                                
                <div className="login-checkbox-remember">
                    <label><input type="checkbox"/> Remember me</label>
                </div>
                <div className="login-signup-area">
                    <label>New User?</label>
                    <button type="link" className="login-signup-link" onClick={()=>this.onSignupClick(true)}> Sign Up</button>
                </div>
            </div>
        </div>
      );
    }
}

export default Login;
