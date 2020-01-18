
import React,{ Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactDOM from 'react-dom';
import Container from './components/Container'
import Login from './components/login/Login';
import './App.css';
class App extends Component{
    constructor(props){
      super(props);
      this.state={
        signUpMode:false,
        userLoggedIn:false
      }
      // this.onLoginClick=this.onLoginClick.bind(this)
      this.onSignIn=this.onSignIn.bind(this)
    }
    onSignIn(){
      window.location.href='/';
      this.setState({userLoggedIn:true});                  
    }
    // onLoginClick(signUpMode){
    //   location.href='/login';      
    //   this.setState({signUpMode});
    // }
   render(){
      return (
        <Router>
          <Switch>
              <Route exact path="/">
                <Container 
                  userLoggedIn={this.state.userLoggedIn}
                  // onLoginClick={this.onLoginClick}
                  view={'dashboard'}
                />
              </Route>
              <Route exact path="/login">
                <div className="login-body">              
                  <Login
                    signUpMode={this.state.signUpMode}
                    onSignIn={this.onSignIn}
                  />
                </div>                
              </Route>
              <Route exact path="/appointment">
                <Container
                  userLoggedIn={this.state.userLoggedIn}
                  view={'appointment'}
                />
              </Route>
              <Route exact path="/searchHospital">
                <Container
                  userLoggedIn={this.state.userLoggedIn}
                  view={'hospital'}
                />
              </Route>
              <Route exact path="/profile">
                <Container
                  userLoggedIn={this.state.userLoggedIn}
                  view={'dashboard'}
                />
              </Route>
              <Route exact path="/contactus">
                <Container
                  userLoggedIn={this.state.userLoggedIn}
                  view={'doashboard'}
                />
              </Route>
          </Switch>
        </Router>
      );
   }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
