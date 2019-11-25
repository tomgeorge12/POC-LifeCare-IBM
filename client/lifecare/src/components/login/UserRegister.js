import React, { Component } from 'react';
import $ from 'jquery';
import logo from '../../lifecarelogo_Red.png'

class UserRegister extends Component {
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: '',
            confirmPassword: '',
            loginError: false,
            errorMessage: ''
        }
        this.inputOnChange=this.inputOnChange.bind(this);
        this.getEncodedString=this.getEncodedString.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    getEncodedString(value) {
        return typeof value === 'string' ? window.btoa(value) : value;
    }

    onSubmit(){
        const {username, password, confirmPassword} = this.state;
        this.setState({loginError:false, errorMessage: ''});        
        const login = {
            username,
            password: this.getEncodedString(password),
        }
        if(password === confirmPassword) {
            $.ajax({
                type: 'POST',
                data:login,
                dataType:'json',
                url: '/users/register',
                    success: (data)=> {
                        this.props.onSignupClick(!data.registerSuccess);
                    },
                error: (error)=> {
                    // if(error.registerSuccess === 'false') this.props.onSignupClick(error.registerSuccess)
                    // if(error && error.registerSuccess === 'false') 
                    //     this.setState({loginError:true, errorMessage: 'Error occured. Please Try Again!'});
                    // else
                        this.setState({loginError:true, errorMessage: 'Error occured. Please Try Again!'});
                }
                });
        } else {
            this.setState({loginError:true, errorMessage: 'Password Mismatch!'});            
            // alert('Password Mismatch');
        }
    }

    inputOnChange(e, type){
        this.setState({loginError:false, errorMessage: ''});        
        if(e) {
            this.setState({[type]:e.target.value});
        }
    }

 render () {
    const {username, password, confirmPassword, errorMessage, loginError} = this.state;

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
                <div>
                <input
                    type="password"
                    className="login-input"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e)=>this.inputOnChange(e, 'confirmPassword')}
                    placeholder="Confirm Password"/>
                </div>
                <div className="">
                    <button className="login-button cancel-button"  onClick={()=>this.props.onSignupClick(false)}>Cancel</button>
                    <button className="login-button submit-button"  onClick={()=>this.onSubmit(username, password)}>Submit</button>
                </div>
            </div>
        </div>
      );
    }
}

export default UserRegister;
