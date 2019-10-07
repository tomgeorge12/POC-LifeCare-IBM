import React, { Component } from 'react';
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';
import Doctor from '../doctor/Doctor';
import './modal.css';
import $ from 'jquery';
import _ from 'lodash';

class MyModal extends Component{
  constructor(props){
    super(props);
    this.state={
      doctors:[
      ]
    };
    this.getDoctorDetails = this.getDoctorDetails.bind(this);
  }

  componentDidMount(){
    let {doctors} = this.state;
    $.getJSON('http://localhost:8282/gethospitaldetail',(data)=>{
      // console.log(data);
      let arr=Object.keys(data).map((k)=>data[k]);
        this.setState({doctors:data});
    })
  }

  getDoctorDetails(){
    let {doctors,filtering,text}=this.state;
    let {id} = this.props;
    if(filtering){

    }
    let doctorComp = _.map(doctors,(data)=>{
      return _.map(data.cardContent.relationItems,(innerdata)=>{
        // console.log(lookupid)
        if(id === innerdata.lookupid){
          // console.log(innerdata);
          return <Doctor
            deptList={innerdata.departments} {...this.props}/>
        }
      })
    });
    return doctorComp;
  }

  render(){
     const style = {
        overlay: {
             position        : 'fixed',
             top             : 0,
             left            : 0,
             right           : 0,
             bottom          : 0,
             zIndex          : 99999999,
             overflow        : 'scroll',
             perspective     :  1300,
             backgroundColor : 'rgba(0, 0, 0, 0.3)'
           },

           content: {
             position                : 'relative',
             margin                  : '2% auto',
             height                  : '100%',
             width                   : '60%',
             border                  : '1px solid rgba(0, 0, 0, .2)',
             background              : '#fff',
             overflow                : 'scroll',
             borderRadius            : '4px',
             outline                 : 'none',
             boxShadow               : '0 5px 10px rgba(0, 0, 0, .3)',
           }
         };

      const {effect} = this.props;
      return (
        <Modal
          effect={effect}
          onRequestClose={() => true}
          style={style}>
            <div className="main">
              <div className="modal-header">
                <h2 className="title">{this.props.hosName}
                  <span className="glyphicon glyphicon-remove pull-right"
  	                    onClick={ModalManager.close}></span>
                    </h2><br/>
              </div>
            <div className="modal-body">
              <ul className="list-group">
               {this.getDoctorDetails()}
               </ul>
            </div>
          </div>
        </Modal>
      );
   }
}

export default MyModal;

// <div className="modal-footer">
//   <button type="button" className="btn btn-primary" onClick={ModalManager.close}>Close</button>
// </div>
