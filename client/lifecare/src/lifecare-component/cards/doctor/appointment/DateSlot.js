import React, { Component } from 'react';
import Timeslot from './Timeslot';
import _ from 'lodash';

class DateSlot extends Component {
  constructor(props){
    super(props);
    this.state={
      timeslots:[
        {slot:"9:00 A.M.",selected:false},
        {slot:"9:30 A.M.",selected:false},
        {slot:"10:00 A.M.",selected:false},
        {slot:"10:30 A.M.",selected:false},
        {slot:"11:00 A.M.",selected:false},
        {slot:"11:30 A.M.",selected:false},
        {slot:"2:00 P.M.",selected:false},
        {slot:"2:30 P.M.",selected:false},
        {slot:"3:00 P.M.",selected:false},
        {slot:"3:30 P.M.",selected:false},
        {slot:"4:00 P.M.",selected:false},
        {slot:"4:30 P.M.",selected:false}
      ],

    };
  }
  bookTimeSlot(){
    let {timeslots}=this.state;
    let timeComp = timeslots.map((timeslot,idx)=>{
      return <Timeslot timeslot={timeslot} key={idx}
        onSelect={(newTimeslot)=>this.handleSelected(newTimeslot)}/>
    });
    return timeComp;
  }
 handleSelected(newTimeslot){
    let {timeslots}=this.state;
    let timeslotselected = null;
    let newtimeslots = timeslots.map((timeslot)=>
                  {
                    return timeslot.selected ? Object.assign({},timeslot,{selected:!timeslot.selected}):timeslot
                  });
    timeslots = newtimeslots.map((timeslot)=>
                  {
                    if(timeslot.slot===newTimeslot.slot){
                      timeslotselected=timeslot.slot;
                    return Object.assign({},timeslot,{selected:!timeslot.selected});
                  }
                  else{
                    return timeslot;
                  }
                  });
    this.setState({timeslots},()=>{
            this.props.onSelect(this.props.dateslot,timeslotselected);
        });
      }
  select(dateslot){
      this.props.onSelect(dateslot);
  }
  render () {
    let {timeslots}=this.state;
    let {dateslot}=this.props;
  return(
    <div>
    <button className='btn btn-warning'>{dateslot.date}</button>
    <li className="list-group-item">{this.bookTimeSlot()}</li>
    <br/>
   </div>
  );
  }
}

export default DateSlot;
