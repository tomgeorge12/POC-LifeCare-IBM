import React, { Component } from 'react';
import map from 'lodash/map';
import $ from 'jquery';
import Card from './card/Card.component';
import AddHospitalCard from './card/Addhospital.Card';

class HospitalContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      searchOption:'',
      hospitals:[],
      filteredHospitals: [],
      searchTerm: '',
      RegisterMode: false
    }
    this.getHospitalSearchArea=this.getHospitalSearchArea.bind(this);
    this.getHospitalDisplayArea=this.getHospitalDisplayArea.bind(this);
    this.onSearchInputChange=this.onSearchInputChange.bind(this);
    this.onSearchClick=this.onSearchClick.bind(this);
    this.onRegisterHospitalClick=this.onRegisterHospitalClick.bind(this);
  }

  componentDidMount(){
    let {hospitals} = this.state;
    $.getJSON('/hospitals',(data)=>{
      let arr=Object.keys(data).map((k)=>data[k]);
        this.setState({hospitals:data});
    });
    
  }

  getHospitalSearchArea(page){
      return(
        <div className="detail-hospital-search-section">
          <input id="search" value={this.state.searchTerm} onChange={this.onSearchInputChange} className="detail-hospital-search-input" placeholder={"Search for Hospital/Doctor/Location"} />
          <button className="search-button" onClick={this.onSearchClick}>Search</button>
          <button
            className="search-addhospital-button"
            onClick={()=>this.onRegisterHospitalClick(true)}
          >Register Hospital
          </button>
        </div>
      )
  }

  getHospitalDisplayArea(page){
    const { hospitals,filteredHospitals } = this.state;
    let hospitalList = filteredHospitals.length>0 ? filteredHospitals : hospitals;
    return map(hospitalList, (item, idx)=>{
      if(idx<18){
        return(
          <div className="hospital-display-area">
            <Card title={item.name} img={item.url} address={item.address} aboutUs={item.aboutUs} footerlink="Make an appointment"/>
          </div>
        )
      }
    })
  }

  onSearchInputChange(e){
    if(e && e.target) this.setState({searchTerm:e.target.value})
  }

  onSearchClick(){
    const { hospitals, searchTerm } = this.state;
    let filteredHospitals = [];
    map(hospitals, (item)=>{
      const name=item.name;
      if(name.search(searchTerm) !== -1){
        filteredHospitals.push(item);
      }
    });
    this.setState({ filteredHospitals });
  }
  onRegisterHospitalClick(mode){
    this.setState({RegisterMode:mode})
  }
  render () {
    const { searchTerm, RegisterMode } = this.state;
    if(RegisterMode){
      return(
      <div className="header-main body">
        <AddHospitalCard onCancel={this.onRegisterHospitalClick}/>
      </div>
      )
    }
    return(
    <div className="header-main body">
        {this.getHospitalSearchArea()}
        <div className="body-content hospital-head margin-10">
            <span>List of Hospitals</span>
        </div>
        <div className="body-content hospital-area">
        {this.getHospitalDisplayArea()} 
        </div>       
    </div>
    )
  }
}

export default HospitalContainer;
