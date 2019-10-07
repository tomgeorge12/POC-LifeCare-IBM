import React, { Component } from 'react'

class Timeslot extends Component {
  constructor(props){
    super(props);
  }
  select(timeslot){
    this.props.onSelect(timeslot);
  }
  render () {
    let {timeslot}=this.props;
  return(
    <div id="buttonlist">
    <button className="btn btn-primary btn-sm" disabled={timeslot.selected} onClick={()=>this.select(timeslot)}>{timeslot.slot}</button>&nbsp;
    </div>
  );
  }
}

export default Timeslot;
