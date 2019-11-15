import React, { Component } from 'react';
import FlipCard from 'react-flipcard';
import 'bootstrap/dist/css/bootstrap.css';
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';
import DateSlot from './DateSlot';
import moment from 'moment';
import MyModal from '../../modalcomp/MyModal.js';
import $ from 'jquery';
import _ from 'lodash';

const effect= Effect.FlipHorizontal3D;

class Appointment extends Component {
  constructor(props){
    super(props);
    this.state={
      dates:[
          {date:moment().format("MMM Do YY"),selected:false},
          {date:moment().add(1,'days').format("MMM Do YY"),selected:false},
          {date:moment().add(2,'days').format("MMM Do YY"),selected:false},
        ],
        date:null,
        slot:null,
        referenceId:null
    }
    this.getBookingDetails=this.getBookingDetails.bind(this);
    this.getCardBackContent=this.getCardBackContent.bind(this);
  }

  getBookingDetails(userId){
    $.ajax({
        type: "GET",
        url: "/hospitals/getpatientdetail",
        dataType:'json',
        success: function (patientdata) {
          _.map(patientdata.doctor.patient,patient=>{
            console.log(patient.userId);
            if(userId===patient.userId){
              console.log("matches");
            }
          })
        }
    });
  }

  onsubmit() {
    // console.log("lookupid::"+this.props.id);
   let $name= $('#name');
   let $age= $('#age');
   let $number=$('#number');
   let $sex=$('[name="myradio"]');
   let $date= this.state.date;
   let $slot= this.state.slot;
   var {referenceId} = this.state;
     let order = {
       name: $name.val(),
       age: $age.val(),
       sex:$sex.val(),
       number: $number.val(),
       date:$date,
       slot:$slot
     };
     $.ajax({
       type: 'POST',
       data:order,
       dataType:'json',
       url: '/hospitals/createappintment',
          success: (data)=> {
            referenceId=data.user_id;
            alert("sucessful:"+referenceId);
            this.setState({referenceId});
          },
       error: function() {
         alert('error post data...');
       }
     });
   }

   handleSelected(newDateslot,newTimeslot){
      let {dates}=this.state;
      // console.log(newDateslot.date);
      // console.log(newTimeslot);
      let newDateslots = dates.map((dateslot)=>
                    {
                      return dateslot.selected ? Object.assign({},dateslot,{selected:!dateslot.selected}):dateslot
                    });
      dates = newDateslots.map((dateslot)=>
                    {
                      return dateslot.date===newDateslot.date ? Object.assign({},dateslot,{selected:!dateslot.selected}):dateslot
                    });
                    // console.log(newTimeslot);
      this.setState({dates,date:newDateslot.date,slot:newTimeslot});

        }

  openModal(effect){
     ModalManager.open(<MyModal effect={effect} {...this.props}/>);
  }

  showBack() {
   this.setState({
     isFlipped: true
   });
 }

 showFront() {
   this.setState({ isFlipped: false});
 }

 handleOnFlip(flipped) {
   if (flipped) {
     this.refs.backButton.getDOMNode().focus();
   }
 }

 handleKeyDown(e) {
   if (this.state.isFlipped && e.keyCode === 27) {
     this.showFront();
   }
 }

 bookDateSlot(){
   let {dates}=this.state;
   let dateComp = dates.map((dateslot,idx)=>{
     return <DateSlot dateslot={dateslot} key={idx}  onSelect={(newDateslot,newTimeslot) => this.handleSelected(newDateslot,newTimeslot)}/>
   });
   return dateComp;
 }

 validateForm(){
   var name=document.querySelector('#name').value;
   var age=document.querySelector('#age').value;
   var number=document.querySelector('#number').value;
   if(!name && !age && !number){
     document.querySelector('#forname').innerHTML="Enter your name";
     document.querySelector('#forage').innerHTML="Enter your age";
     document.querySelector('#fornumber').innerHTML="Enter your Contact number";
     document.querySelector('#name').focus();
   }
   else if(!name && !age){
     document.querySelector('#forname').innerHTML="Enter your name";
     document.querySelector('#forage').innerHTML="Enter your age";
     if(isNaN(number)){
       document.querySelector('#fornumber').innerHTML="Contact number should be number";
       document.querySelector('#number').focus();
     }
     else{
       document.querySelector('#fornumber').innerHTML="";
     }
     document.querySelector('#name').focus();
   }
   else if(!age && !number){
     document.querySelector('#forname').innerHTML="";
     document.querySelector('#forage').innerHTML="Enter your age";
     document.querySelector('#fornumber').innerHTML="Enter your Contact number";
     document.querySelector('#age').focus();
   }
   else if(!name && !number){
     document.querySelector('#forname').innerHTML="Enter your name";
     document.querySelector('#fornumber').innerHTML="Enter your Contact number";
     if(isNaN(age)){
       document.querySelector('#forage').innerHTML="Age should be number";
       document.querySelector('#age').focus();
     }
     else{
       document.querySelector('#forage').innerHTML="";
     }
     document.querySelector('#name').focus();
   }
   else if(!name){
     document.querySelector('#forname').innerHTML="Enter your name";
     if(isNaN(age)){
       document.querySelector('#forage').innerHTML="Age should be number";
       document.querySelector('#age').focus();
     }
     else{
       document.querySelector('#forage').innerHTML="";
     }
     if(isNaN(number)){
       document.querySelector('#fornumber').innerHTML="Contact number should be number";
       document.querySelector('#number').focus();
     }
     else{
       document.querySelector('#fornumber').innerHTML="";
     }
     document.querySelector('#name').focus();
   }
   else if(!age){
     document.querySelector('#forname').innerHTML="";
     document.querySelector('#forage').innerHTML="Enter your age";
     if(isNaN(number)){
       document.querySelector('#fornumber').innerHTML="Contact number should be number";
       document.querySelector('#number').focus();
     }
     else{
       document.querySelector('#fornumber').innerHTML="";
     }
     document.querySelector('#age').focus();
   }
   else if(!number){
     document.querySelector('#forname').innerHTML="";
     document.querySelector('#fornumber').innerHTML="Enter your Contact number";
     if(isNaN(age)){
       document.querySelector('#forage').innerHTML="Age should be number";
       document.querySelector('#age').focus();
     }
     else{
       document.querySelector('#forage').innerHTML="";
     }
     document.querySelector('#number').focus();
   }
   else if(isNaN(age) || isNaN(number)){
     document.querySelector("#forname").innerHTML="";
     if(isNaN(age)){
       document.querySelector('#forage').innerHTML="Age should be number";
       document.querySelector('#age').focus();
     }
     else{
       document.querySelector('#forage').innerHTML="";
     }
     if(isNaN(number)){
       document.querySelector('#fornumber').innerHTML="Contact number should be number";
       document.querySelector('#number').focus();
     }
     else{
       document.querySelector('#fornumber').innerHTML="";
     }
   }
   else if(!(document.getElementById('male').checked || document.getElementById('female').checked)){
     document.querySelector('#forsex').innerHTML="Select a sex";
     document.querySelector('#male').focus();
     document.querySelector("#forname").innerHTML="";
     document.querySelector("#forage").innerHTML="";
     document.querySelector("#fornumber").innerHTML="";
   }
   else{
     document.querySelector('#forsex').innerHTML="";
     this.showBack();
   }
}

  getCardBackContent(){
    let $name= $('#name');
    let $age= $('#age');
    let $number=$('#number');
    let $sex=$('[name="myradio"]');
    let $date= this.state.date;
    let $slot= this.state.slot;
    if(this.state.referenceId){
      let {referenceId} = this.state;
        let order = {
          name: $name.val(),
          age: $age.val(),
          date:$date,
          slot:$slot
        };
      return(
        <div className="" id="panel2">
          <h4 className='pull-left'>Appointment Confirmed</h4>
          <table className="table table-striped">
              <tbody>
                <tr>
                  <td><label >ReferenceId</label></td>
                  <td><label id="forname">:{referenceId}</label></td>
                </tr>
                <tr>
                  <td><label >Name</label></td>
                  <td><label id="forage">:{order.name}</label></td>
                </tr>
                <tr>
                  <td><label >Date</label></td>
                  <td><label id="forsex">:{order.date}</label></td>
                </tr>
                <tr>
                  <td><label >Time</label></td>
                  <td><label id="fornumber">:{order.slot}</label></td>
                </tr>
              </tbody>
            </table>
            <div>
              <button type="button" className="btn btn-default" id="backbtns" onClick={ModalManager.close}>Close</button>
            </div>
        </div>
      );
    }
    else{
      return(
        <div id="panel2">
            <h4 className='pull-left'>Confirm Appointment Details</h4>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td><label >Name</label></td>
                  <td><label id="forname">:{$name.val()}</label></td>
                </tr>
                <tr>
                  <td><label >Age</label></td>
                  <td><label id="forage">:{$age.val()}</label></td>
                </tr>
                <tr>
                  <td><label >Sex</label></td>
                  <td><label id="forsex">:{$sex.val()}</label></td>
                </tr>
                <tr>
                  <td><label >Contact Number</label></td>
                  <td><label id="fornumber">:{$number.val()}</label></td>
                </tr>
                <tr>
                  <td><label >Appointment time</label></td>
                  <td><label id="fornumber">:{$date} {$slot}</label></td>
                </tr>
              </tbody>
            </table>
            <div>
              <button className="btn btn-default" id="backbtns" onClick={() => this.openModal(effect)}>Cancel</button>
              <button className="btn btn-warning" id="backbtns" ref="backButton" onClick={()=>{this.showFront()}}>Edit</button>
              <button type="submit" className="btn btn-primary" id="backbtns" onClick={()=> this.onsubmit()}>Submit</button>
            </div>
        </div>
      );
    }
  }

  render() {

    const style = {
      overlay: {
          position        : 'fixed',
          top             : 0,
          left            : 0,
          right           : 0,
          bottom          : 0,
          zIndex          : 99999999,
          overflow        : 'none !important',
          perspective     :  1300,
          backgroundColor : 'rgba(0, 0, 0, 0.3)'
        },

        content: {
          position                : 'relative',
          margin                  : '2% auto',
          height                  : '90%',
          width                   : '60%',
          border                  : '1px solid rgba(0, 0, 0, .2)',
          background              : 'rgb(245, 247, 246)',
          overflow                : 'none !important',
          borderRadius            : '4px',
          outline                 : 'none',
          boxShadow               : '0 5px 10px rgba(0, 0, 0, .3)',
          ['border-radius']         : '25px'
        }
     };
    const labelstyle = {color:'red'};
    return (
      <Modal
        effect={effect}
        onRequestClose={() => true}
        style={style}>
          <div className='main'>
            <div className="modal-header">
                <h2 className='header-text'>{this.props.hosName}
                  <button className="btn btn-link glyphicon glyphicon-remove pull-right"
  	                    onClick={ModalManager.close}>
                  </button>
                </h2>
            </div>
          {!this.state.isFlipped && <div className="" id="panel1">
            <h4 className='pull-left'>Appointment Form</h4>
            <div className="">
              <div className="form-group margin-bottom-none">
                <label >Name:</label>
                <input type="text" id="name" className="form-control" ></input>
                <label id="forname" style={labelstyle}></label>
              </div>
              <div className="form-group margin-bottom-none">
                <label >Age:</label>
                <input type="text" id="age" className="form-control" ></input>
                <label id="forage" style={labelstyle}></label>
              </div>
              <div className="form-group margin-bottom-none">
                <label >Sex:</label>
                <label className="radio-inline"><input type="radio" id="male" name ="myradio" value="male"></input>Male</label>
                <label className="radio-inline"><input type="radio" id="female" name ="myradio" value="female"></input>Female</label>
                <label id="forsex" style={labelstyle}></label>
              </div>
              <div className="form-group margin-bottom-none">
                <label >Contact Number:</label>
                <input type="text" id="number" placeholder="Enter your mobile number" className="form-control" ></input>
                <label id="fornumber" style={labelstyle}></label>
              </div>  
              <div className="form-group margin-bottom-none">
                <label >Choose appointment time:</label>
                <ul className="list-group">
                  {this.bookDateSlot()}
                </ul>
              </div>
              <div className="form-group">  
                <button  className="btn btn-default" onClick={()=>{this.openModal(effect)}}>Cancel</button>                 
                <button  className="btn btn-primary" onClick={()=>{this.validateForm()}}>Next</button>
              </div>
            </div>
          </div>}
            {this.state.isFlipped && this.getCardBackContent()}            
          </div>
      </Modal>
    );
  }
}

export default Appointment;
