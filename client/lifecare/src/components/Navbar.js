import React, { Component } from 'react';
import map from 'lodash/map';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.navbarItems = [
            {
                title:'Dashboard',
                navigation:'/'
            }, 
            {
                title:'Appointment',
                navigation:'/appointment'
            },{
                title:'Hospital',
                navigation:'/searchHospital'
            },{
                title:'Profile',
                navigation:'/profile'
            },{
                title:'Contact Us',
                navigation:'/contactus'
            }]
        this.getNavbarItems = this.getNavbarItems.bind(this);
    }

    getNavbarItems(){
        return map(this.navbarItems, (item)=>{
            if(item.title === 'Hospital'){
                return(
                    <div className="dropdown navbar-item">
                        <button className="dropdown-btn">{item.title}
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="#">Configure Hospital</a>
                            <a href="/searchHospital">Search for Hospital</a>
                        </div>
                    </div>
                )
            }
            return(
                <li className="navbar-item"><a className="navbar-link" href={item.navigation}>{item.title}</a></li>
            )
        });
    }
    render () {
        return(
            <div className="header-main navbar">
                {this.getNavbarItems()}
            </div>
        )
    }
}

export default Navbar;
