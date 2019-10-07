import React, { Component } from 'react';
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';
import _ from 'lodash';
import Appointment from './appointment/Appointment';
import './doctornamedisplay.css';

class DoctorNameDisplay extends Component {
constructor(props){
    super(props);
  }
  openModal(effect){
     ModalManager.open(<Appointment effect={effect} {...this.props}/>);
  }
  render () {
    let {deptName,name,degree,designation,url} = this.props;
    let {doctor}=this.props;
    const effect= Effect.FlipHorizontal3D;
    return(
      <li className="list-group-item">
            <div className="list-item">
              <div className="pull-left">
                <img id="doc"src={url}></img>
                </div>
              <h3>{name}</h3>
                {deptName}<br/>
                {degree}
              
              <div className="pull-right">
                <button className="btn btn-info pull-right" onClick={() => {this.openModal(effect)}}>Schedule an Appointment </button>
              </div>
          </div>
      </li>
    );
  }
}

export default DoctorNameDisplay;

//
