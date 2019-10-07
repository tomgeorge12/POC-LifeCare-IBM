import React, { Component } from 'react';
import $ from 'jquery';
import UserRegister from '../userRegister/userResigter';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
        username: '',
        password: '',
        signUpMode: false
    }
    this.inputOnChange=this.inputOnChange.bind(this);
    this.getEncodedString=this.getEncodedString.bind(this);
    this.onSignupClick=this.onSignupClick.bind(this);
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
        url: 'http://localhost:8282/login',
           success: (data)=> {
             this.props.onSignin(data.loginSuccess);
           },
        error: function(error) {
          if(error.loginSuccess === 'false') this.props.onSignin(error.loginSuccess)
          else alert('error post data...');
        }
      });
    }

    inputOnChange(e, type){
      if(e) {
        this.setState({[type]:e.target.value});
      }
    }

    onSignupClick(signUpMode){
        this.setState({signUpMode});
    }

 render () {
     const {username, password, signUpMode} = this.state;

     if(signUpMode) {
         return (
             <UserRegister onSignupClick={this.onSignupClick}/>
         )
     }
      return (
        <div className="container well">
            <div className="form-group">
                <label for="username">Username</label>
                <input 
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e)=>this.inputOnChange(e, 'username')}
                    id="username"
                    placeholder="Username"/>
            </div>
            <div className="form-group">
                <label for="inputPassword">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    value={password}
                    onChange={(e)=>this.inputOnChange(e, 'password')}
                    placeholder="Password"/>
            </div>
            <div className="form-group">
                <label className="form-check-label"><input type="checkbox"/> Remember me</label>
            </div>
            <div className="form-group">
                <label className="form-check-label">New User?</label>
                <button type="link" className="btn btn-link" onClick={this.onSignupClick}> Sign Up</button>
            </div>
            <button type="submit" className="btn btn-primary"  onClick={()=>this.onSignin(username, password)}>Sign in</button>
        </div>
      );
    }
}

export default Login;
