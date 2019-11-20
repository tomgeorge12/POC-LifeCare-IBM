import React, { Component } from 'react'
import $ from 'jquery';

class Card extends Component {
  render () {
    const {title, img, description, footerlink} = this.props;
    return(
        <div className="hospital-card">
          <span>{title}</span>
          <img className="hospital-card-image" src={img} />
          <p>{description}</p>
          <button>{footerlink}</button>
        </div>
    )
  }
}

export default Card;
