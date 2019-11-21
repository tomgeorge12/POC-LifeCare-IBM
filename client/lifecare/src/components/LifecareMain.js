import React, { Component } from 'react';
import map from 'lodash/map';
import $ from 'jquery';
import Card from './card/Card.component';

class LifecareMain extends Component {
  constructor(props){
    super(props);
    this.state={
      searchOption:'',
      hospitals:[]
    }
    this.searchOptions=['Hospitals', 'appointment']
    this.getHospitalSearchArea=this.getHospitalSearchArea.bind(this);
    this.getSearchOptions=this.getSearchOptions.bind(this);
    this.getHospitalDisplayArea=this.getHospitalDisplayArea.bind(this);
  }

  componentDidMount(){
    let {hospitals} = this.state;
    $.getJSON('/hospitals',(data)=>{
      let arr=Object.keys(data).map((k)=>data[k]);
        this.setState({hospitals:data});
    });
    
  }

  getSearchOptions(){
    return map(this.searchOptions, item=>{
      return <option>{item}</option>
    })
  }
  getHospitalSearchArea(){
    return(
        <div className="search-card">
          <div className="search-section">
            <input id="search" className="search-input" placeholder={"Search for Hospital/Doctor/Location"} />
            <div className="search-button-par">
              <select className="search-options" value={this.state.searchOption}>{this.getSearchOptions()}</select>
              <button className="search-button">Search</button>
            </div>
        </div>
        </div>
    )
  }
  getHospitalDisplayArea(){
    return map(this.state.hospitals, (item, idx)=>{
      if(idx<6){
        return(
          <div className="hospital-display-area">
            <Card title={item.name} img={item.url} address={item.address} aboutUs={item.aboutUs} footerlink="Make an appointment"/>
          </div>
        )
      }
    })
    
  }
  render () {
    
    return(
      <div className="header-main body">
        <div className="body-content body-header-main">
          <div className="body-header-area">
            <h1>WE CARE</h1>
            <span>Find Your Best Health Assistant Here!</span>
          </div>
          {this.getHospitalSearchArea()}
        </div>
        <div className="body-content hospital-head">
            <span>List of Hospitals</span>
            <a>View All..</a>
          </div>
        <div className="body-content hospital-area">
          {this.getHospitalDisplayArea()} 
        </div>       
      </div>
    )
  }
}

export default LifecareMain;
