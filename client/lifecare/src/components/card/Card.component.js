import React, { Component } from 'react'
import $ from 'jquery';

class Card extends Component {
  constructor(props){
    super(props);
    this.state={
      active:'overview'
    }
    this.cardContentChange=this.cardContentChange.bind(this);
  }
  cardContentChange(active){
    this.setState({active})
  }
  render () {
    const {title, img, address, aboutUs, footerlink} = this.props;
    const { active }=this.state;
    let bodyContent=null;
    if(active==='overview'){
      bodyContent = (
        <div className="hospital-card-detail-area">
            <span>{title}</span>          
            <p>{address}</p>
            <button>{footerlink}</button>
          </div>
      )
    } else {
      bodyContent = (
        <div className="hospital-card-detail-area">   
            <p>{aboutUs}</p>
          </div>
      )
    }
    return(
        <div className="hospital-card">
          <img className="hospital-card-image" src={img} />
          <ul className="hospital-card-list">
            <li className={active==='overview' ? 'active' : ''} onClick={()=>{this.cardContentChange('overview')}}>Overview</li>
            <li className={active==='about' ? 'active' : ''} onClick={()=>{this.cardContentChange('about')}}>About Us</li>
          </ul>
          {bodyContent}
        </div>
    )
  }
}

export default Card;
