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
        url: "http://localhost:8080/getpatientdetail",
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
       url: 'http://localhost:8282/create',
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
    if(this.state.referenceId){
      let $name= $('#name');
      let $age= $('#age');
      let $date= this.state.date;
      let $slot= this.state.slot;
      let {referenceId} = this.state;
        let order = {
          name: $name.val(),
          age: $age.val(),
          date:$date,
          slot:$slot
        };
      return(
        <div className="panel panel-primary" id="panel2">
          <div className="panel-heading">Your Appointment Details </div>
          <div className="panel-body">
            <label>ReferenceId : {referenceId}</label><br/>
            <label>Name : {order.name}</label><br/>
            <label>Date : {order.date}</label><br/>
            <label>Time : {order.slot}</label><br/>
          </div>
        </div>
      );
    }
    else{
      return(
        <div className="panel panel-primary" id="panel2">
          <div className="panel-heading">Your Appointment Details </div>
          <div className="panel-body">
            <button className="btn-primary" id="backbtns" onClick={() => this.openModal(effect)}>Cancel</button>
            <button className="btn-primary" id="backbtns" ref="backButton" onClick={()=>{this.showFront()}}>Edit</button>
            <button type="submit" className="btn-primary" id="backbtns" onClick={()=> this.onsubmit()}>Submit</button>
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
            overflow        : 'scroll',
            perspective     :  1300,
            backgroundColor : 'rgba(0, 0, 0, 0.3)'
          },

          content: {
            position                : 'relative',
            margin                  : '2% auto',
            height                  : '100%',
            width                   : '900px',
            border                  : '1px solid rgba(0, 0, 0, .2)',
            background              : '#fff',
            overflow                : 'scroll',
            borderRadius            : '4px',
            outline                 : 'none',
            boxShadow               : '0 5px 10px rgba(0, 0, 0, .3)',
          }
   };
const labelstyle = {color:'red'};
    return (
      <Modal
        effect={effect}
        onRequestClose={() => true}
        style={style}>
      <div id="flipId">
      <FlipCard
            disabled={true}
            flipped={this.state.isFlipped}
            onFlip={this.handleOnFlip()}
            onKeyDown={this.handleKeyDown}
          >
          <div >
           <div className="panel panel-primary" id="panel1">
             <div className="panel-heading">Fill in appointment details </div>
             <div className="panel-body">
               <div className="form-group">
                 <label >Name:</label>
                 <input type="text" id="name" className="form-control" ></input>
                 <label id="forname" style={labelstyle}></label>
                 </div>
                   <label >Age:</label>
                   <input type="text" id="age" className="form-control" ></input>
                   <label id="forage" style={labelstyle}></label>
                   <br/>
                   <label >Sex:</label>
                   <label className="radio-inline"><input type="radio" id="male" name ="myradio" value="male"></input>Male</label>
                     <label className="radio-inline"><input type="radio" id="female" name ="myradio" value="female"></input>Female</label><br/>
                   <label id="forsex" style={labelstyle}></label>
                   <br/>
                   <br/>
                     <label >Contact Number:</label>
                     <input type="text" id="number" placeholder="Enter your mobile number" className="form-control" ></input>
                     <label id="fornumber" style={labelstyle}></label>
                     <br/>
                  <label >Choose appointment time:</label>
                  <ul className="list-group">
                  {this.bookDateSlot()}
                  </ul>
                  <button  className="btn btn-primary center-block" onClick={()=>{this.validateForm()}}>Next</button>
              </div>
             </div>
            </div>
            {this.getCardBackContent()}
          </FlipCard>
        </div>
      </Modal>
    );
  }
}

export default Appointment;
