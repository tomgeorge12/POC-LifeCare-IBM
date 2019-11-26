import React, { Component } from 'react'
import Header from './Header';
import Footer from './Footer';
import Dashboard from './Dashboard';
import Appointment from './Appointment';
import Hospital from './Hospital';
// import Dashboard from './Dashboard';
import Navbar from './Navbar';

class Container extends Component {
  constructor(props){
    super(props);
  }
  render () {
    const { view } = this.props;
    let _content = null;
    switch (view) {
      case 'dashboard':
        _content=(<Dashboard {...this.props}/>);
        break;
      case 'appointment':
        _content=(<Appointment {...this.props}/>);        
        break;
      case 'hospital':
        _content=(<Hospital {...this.props}/>); 
        break;
      case 'profile':
        _content=(<Dashboard {...this.props}/>); 
        break;
      case 'contactus':
        _content=(<Dashboard {...this.props}/>); 
        break;
      default:
        _content=(<Dashboard {...this.props}/>);         
        break;
    }
    return(
        <div>
          <div className="sticky">
            <Header userLoggedIn={this.props.userLoggedIn}/>
            <Navbar />
          </div>
          {_content}
          <Footer />
        </div>
    )
  }
}

export default Container;
