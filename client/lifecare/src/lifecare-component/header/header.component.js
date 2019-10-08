import React, { Component } from 'react';
import {Link} from 'react-router-link';
import SearchInput from 'react-search-input';
import 'font-awesome/css/font-awesome.min.css';
import logo from '../../lifecarelogo_Red.png'
import './header.css';

class Header extends Component{

  render() {
    return (
      <footer>
        <div id="jumbotron" className="header-logo text-center">
          <img className="header-img" src={logo}/>
          <SearchInput id="search-input" onChange={this.props.searchUpdated} />
        </div>
      </footer>
      );
    }
  }

export default Header;
