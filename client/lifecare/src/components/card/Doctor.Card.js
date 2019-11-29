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
    const {name, url, deptName, designation, degree } = this.props;
    return(
        <div className="doctor-card">
            <img className="doctor-img" src={url} />        
            <label className="">{name}</label>
            <div className="doctor-details">
              <span>{deptName}</span>
              <span>{'Rating'}</span>            
              <span className='doctor-description'>{designation}</span>
              <span className='doctor-description'>{degree}</span>
              <button  className="button" onClick={()=>this.props.onSelect(true, this.props.regNo)}>{'Select'}</button>                        
            </div>
        </div>
    )
  }
}

export default Card;
