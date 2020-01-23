import React, { Component } from 'react'
import $ from 'jquery';

class Card extends Component {
  constructor(props){
    super(props);
    this.state={
      active:'overview'
    }
    this.cardContentChange=this.cardContentChange.bind(this);
    this.onClick=this.onClick.bind(this);
  }
  cardContentChange(active){
    this.setState({active})
  }
  onClick(){
    this.props.onFooterClick(this.props.lookupid)
  }
  render () {
    const {title, img, address, aboutUs, footerlink, simpleCard} = this.props;
    const { active }=this.state;
    let bodyContent=null;
    if(active==='overview'){
      bodyContent = (
        <div className="hospital-card-detail-area">
            <span>{title}</span>          
            <p>{address}</p>
            <button onClick={this.onClick}>{footerlink}</button>
          </div>
      )
    } else {
      bodyContent = (
        <div className="hospital-card-detail-area">   
            <p>{aboutUs}</p>
          </div>
      )
    }
    if(simpleCard){
      return(
        <div className="hospital-card-detail-area">
          <span className="simple-hos-title">{title || 'Fortis Hospital'}</span>  
          <div className="simple-hos-details">
            <p>{address || 'A Block Shalimar Bagh, New Delhi – 110088.'}</p>
          <button  className="button simple-hos-card-btn" onClick={this.onClick}>{footerlink}</button>                        
            <span>Rating</span>
            <span>Contact#</span>
            <span>View hospital</span>
          </div>
        </div>
      )
    } else {
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
}

export default Card;
