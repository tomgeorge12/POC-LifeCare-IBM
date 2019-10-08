import React, { Component } from 'react';
import $ from 'jquery';
import '../../../lifecare-container/lifecare-container.css';

class UserRegister extends Component {
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: '',
            confirmPassword: ''
        }
        this.inputOnChange=this.inputOnChange.bind(this);
        this.getEncodedString=this.getEncodedString.bind(this);
    }

    getEncodedString(value) {
        return typeof value === 'string' ? window.btoa(value) : value;
    }

    onSubmit(){
        const {username, password, confirmPassword} = this.state;
        const login = {
            username,
            password: this.getEncodedString(password),
        }
        if(password === confirmPassword) {
            $.ajax({
                type: 'POST',
                data:login,
                dataType:'json',
                url: 'http://localhost:8282/register',
                    success: (data)=> {
                        this.props.onSignupClick(!data.registerSuccess);
                    },
                error: function(error) {
                    if(error.registerSuccess === 'false') this.props.onSignupClick(error.registerSuccess)
                    else alert('error post data...');
                }
                });
        } else {
            alert('Password Mismatch');
        }
    }

    inputOnChange(e, type){
        if(e) {
        this.setState({[type]:e.target.value});
        }
    }

    render () {
        const {username, password, confirmPassword} = this.state;
        return (
        <div className="container well login-container">
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
                <label for="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e)=>this.inputOnChange(e, 'confirmPassword')}
                    placeholder="Confirm Password"/>
            </div>
            <div className="btn-group">
                <button type="button" className="btn btn-default"  onClick={()=>this.props.onSignupClick(false)}>Cancel</button>
                <button type="button" className="btn btn-primary"  onClick={()=>this.onSubmit(username, password)}>Submit</button>
            </div>
        </div>
        );
    }
}

export default UserRegister;
