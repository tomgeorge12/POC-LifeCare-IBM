import React, { Component } from 'react';
import $ from 'jquery';
import _ from 'lodash';
import Header from './Header';
import Footer from './Footer';
import Hospital from './card/Hospital.Card';
import Doctor from './card/Doctor.Card';
import Navbar from './Navbar';
const HOSPITAL_SELECTION = 'HOSPITAL_SELECTION'
const APPOINTMENT = 'APPOINTMENT'
const CONFIRMATION = 'CONFIRMATION'

class Appointment extends Component {
  constructor(props){
    super(props);
    this.state={
      hospitals:[],
      filteredHospitals: [],
      doctors:[],
      hospitalSelected:{},
      doctorSelected:{},
      displayMode: HOSPITAL_SELECTION,
      timeSlot: false,
      date: '',
      time: '',
      showNext: false,
      name: '',
      age: '',
      sex: '',
      number: '',
      referenceId: ''
    }
    this.timeSlotTable = ['9.30 AM','10.30 AM','11.30 AM','12.30 PM','2.30 PM','3.30 PM','4.30 PM']
    this.getHospitalList=this.getHospitalList.bind(this);
    this.onAppointmentClick=this.onAppointmentClick.bind(this);
    this.getAppointmentForm=this.getAppointmentForm.bind(this);
    this.toggleTimeSlot=this.toggleTimeSlot.bind(this);
    this.onTimeSelect=this.onTimeSelect.bind(this);
    this.onNextClickAppointment=this.onNextClickAppointment.bind(this);
    this.onAppointmentConfirm=this.onAppointmentConfirm.bind(this);
  }
  componentDidMount(){
    let {hospitals} = this.state;
    const hospitalLookupid = this.props.hospitalLookupid || sessionStorage.hospitalLookupid;
    $.getJSON('/hospitals',(data)=>{
      let arr=Object.keys(data).map((k)=>data[k]);
        this.setState({hospitals:data},()=>{
          if(hospitalLookupid) {
            this.onAppointmentClick(hospitalLookupid);
            sessionStorage.hospitalLookupid = '';
          }
        });
    });
  }

  onAppointmentClick(lookupid){
    const hospitalSelected = _.find(this.state.hospitals, {lookupid})
    this.setState({hospitalSelected, displayMode:APPOINTMENT});
    let {doctors} = this.state;
    $.getJSON('hospitals/gethospitaldetail?lookupid='+lookupid,(data)=>{
      let arr=Object.keys(data).map((k)=>data[k]);
        this.setState({doctors:data.doctors});
    })
  }
  getHospitalList(){
    const { hospitals,filteredHospitals } = this.state;
    let hospitalList = filteredHospitals.length>0 ? filteredHospitals : hospitals;
    const _cards = _.map(hospitalList, (item, idx)=>{
      if(idx<18){
        return(
          <div className="simple-hos-card-area">
            <Hospital
              {...item}
              simpleCard={true} 
              title={item.name} 
              img={item.url}
              onFooterClick={this.onAppointmentClick}
              footerlink="Select"
            />
          </div>
        )
      }
    });
    return (
      <div>
        {/* <div>
          <label>Select Hospital</label>
        </div> */}
        <div>
          <input id="search" value={this.state.searchTerm} onChange={this.onSearchInputChange} className="detail-hospital-search-input" placeholder={"Search for Hospital/Doctor/Location"} />
          <button className="search-button" onClick={this.onSearchClick}>Search</button>
        </div>
        {_cards}
      </div>
    )
  }
  toggleTimeSlot(value, doctorRegNo=''){
    let {doctorSelected} = this.state;
    if(doctorRegNo) doctorSelected = _.find(this.state.doctors, {regNo:doctorRegNo});
    this.setState({timeSlot:value, doctorSelected}  )
  }
  onTimeSelect(e, time){
    e.target.className = e.target.className ? '' : 'active';
    this.setState({time, showNext:true, dateSlot:new Date().toDateString});
  }
  onNextClickAppointment(){
    this.setState({displayMode:CONFIRMATION});
  }
  onAppointmentConfirm(){
    const { name, age, sex, number, date, time, doctorSelected } = this.state;
    const appointmentDetails = {
      name,
      age,
      sex,
      number,
      date,
      slot:time,
      doctor: doctorSelected
    };
    $.ajax({
      type: 'POST',
      data:appointmentDetails,
      dataType:'json',
      url: '/hospitals/createappointment',
         success: (data)=> {
           const referenceId=data.appointment.userId;
           alert("sucessful:"+referenceId);
           this.setState({referenceId});
         },
      error: function() {
        alert('error post data...');
      }
    });
  }
  getPersonalInfoForm(){
    return(
      <div className='patient-details-area'>
        <table>
          <tr>
            <th colSpan='3'>Patient Details</th>
          </tr>
          <tr>            
            <td><span>Patient Name</span></td>
            <td>
              <input
                className='patient-form-input'
                type="text"
                id="name" 
                onChange={(e)=>{if(e) this.setState({name: e.target.value})}}
              />
            </td>
          </tr>
          <tr>
            <td><span>Age</span></td>
            <td>
              <input
                className='patient-form-input'
                type="text"
                id="age" 
                onChange={(e)=>{if(e) this.setState({age: e.target.value})}}
              />
            </td>
          </tr>
          <tr>
            <td><span>Sex</span></td>
            <td>
            <span><input type="radio" onChange={(e)=>{if(e) this.setState({sex: e.target.value})}} id="male" name ="myradio" value="Male"/>Male</span>
            <span><input type="radio" onChange={(e)=>{if(e) this.setState({sex: e.target.value})}} id="female" name ="myradio" value="Female"/>Female</span>
            </td>
          </tr>
          <tr>
            <td><span>Contact Number</span></td>
            <td>
              <input
                className='patient-form-input'
                type="text"
                id="number"
                onChange={(e)=>{if(e) this.setState({number: e.target.value})}}
              />
            </td>
          </tr>
        </table>
        <button className='button' onClick={this.onNextClickAppointment}>{'Next'}</button>
      </div>
    );
  }
  getAppointmentForm(){
    const {doctors, timeSlot, showNext} = this.state;
    const _doctors = _.map(doctors, (item)=>{
      return(<Doctor {...item} onSelect={this.toggleTimeSlot}/>)
    })
    let _rightContent = null;
    const date = new Date().toDateString();
    if(timeSlot){
      _rightContent=(
        <div className='doctor-filter'>
          <table className="date-time-picker-table">
            <tr>
              <th colSpan='3'>
                <label>{'Choose Date and Time Slot'}</label>
              </th>
            </tr>
            <tr>
              <td className='date-time-header'>
                <span>{date}</span>
              </td>
              <td className='date-time-header'>
                <span>{date}</span>
              </td>
              <td className='date-time-header'>
                <span>{date}</span>
              </td>
            </tr>
              {_.map(this.timeSlotTable, (item)=>{
                return(<tr><td id="1" onClick={(e)=>this.onTimeSelect(e, item)}>{item}</td><td id="2" >{item}</td><td id="3" >{item}</td></tr>)
              })}
          </table>
            {showNext && this.getPersonalInfoForm()}        
        </div>
      )
    } else {
      _rightContent= (
        <div className='doctor-filter'>
          <label>Filter</label>
          <div>
            <select>
              <option>{'Department'}</option>
            </select>
          </div>
          <div>
            <select>
              <option>{'Designation'}</option>
            </select>
          </div>
          <button className='button'>{'Apply'}</button>
        </div>
      )
    }
    return(
      <div>
        {_rightContent}
        <div>
          {_doctors}
        </div>
      </div>
    )
  }
  getAppointmentConfirmation(){
    const { name, age, sex, number, time, date, hospitalSelected, doctorSelected, referenceId } = this.state;
    return(
      <div className='appointment-confirmation-area'>
        {/* <label className='appointment-confirmation-header'>{!referenceId ? 'Confirm Appointment Details' : 'Appointment Confirmation'}</label> */}
        <table>
          {referenceId && <tr>
            <td><label className='bold'>Reference ID: </label></td>
            <td><label className='bold'>{referenceId}</label></td>
          </tr>}
          <tr>
            <th colSpan='2'>Patient Details</th>
          </tr>
          <tr>
            <td>Name</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>{age}</td>
          </tr>
          <tr>
            <td>Sex</td>
            <td>{sex}</td>
          </tr>
          <tr>
            <td>Number</td>
            <td>{number}</td>
          </tr>
          <tr>
            <td>Date</td>
            <td>{date}</td>
          </tr>
          <tr>
            <td>Time</td>
            <td>{time}</td>
          </tr>
          <tr>
            <th colSpan='2'>Hospital Details</th>
          </tr>
          <tr>
            <td>Hospital</td>
            <td>{hospitalSelected.name}</td>
          </tr>
          <tr>
            <td>Doctor</td>
            <td>{doctorSelected.name}</td>
          </tr>
        </table>
        {!referenceId ?
          <button className='button' onClick={this.onAppointmentConfirm}>{'Confirm'}</button>
          : <button className='button' onClick={()=>{window.location.href='/appointment'}}>{'Back to Home'}</button>}
      </div>
    )
  }
  render () {
    const { displayMode, hospitalSelected, name, referenceId } = this.state;
    let _content = null;
    switch (displayMode) {
      case HOSPITAL_SELECTION:
        _content= this.getHospitalList();
        break;
      case APPOINTMENT:
        _content=this.getAppointmentForm()
        break;
      case CONFIRMATION:
        _content=this.getAppointmentConfirmation()
        break;
      default:
        _content=this.getHospitalList()
        break;
    }
    return(
        <div className="header-main body">
          <div className="breadcrumbs flat">
            <a
              className={`${displayMode===HOSPITAL_SELECTION ? "active" : ''} ${hospitalSelected ? 'selected' : ''} ${referenceId ? 'inactive' : ''}`}
              onClick={()=>{this.setState({displayMode:HOSPITAL_SELECTION, hospitalSelected: '', name:''})}}>
                Hospital Selection
            </a>
            <a className={`${displayMode===APPOINTMENT ? "active" : ''}  ${name ? 'selected' : ''} ${referenceId ? 'inactive' : ''}`}>Doctor/Slot Selection</a>
            <a className={`${displayMode===CONFIRMATION ? "active" : ''} ${referenceId ? 'inactive selected' : ''}`}>Appointment Confirmation</a>
          </div>
          <div>
            {_content}
          </div>
        </div>
    )
  }
}

export default Appointment;
