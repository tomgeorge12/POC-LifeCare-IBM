import React, { Component } from 'react';
import map from 'lodash/map';
import $ from 'jquery';
import Card from './card/Card.component';

class LifecareMain extends Component {
  constructor(props){
    super(props);
    this.state={
      searchOption:'',
      hospitals:[],
      filteredHospitals: [],
      searchTerm: ''
    }
    this.searchOptions=['Hospitals', 'appointment']
    this.getHospitalSearchArea=this.getHospitalSearchArea.bind(this);
    this.getSearchOptions=this.getSearchOptions.bind(this);
    this.getHospitalDisplayArea=this.getHospitalDisplayArea.bind(this);
    this.onSearchInputChange=this.onSearchInputChange.bind(this);
    this.onSearchClick=this.onSearchClick.bind(this);
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

  getHospitalSearchArea(page){
    if(page==='dashboard'){
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
    } else if(page==='search'){
      return(
        <div className="detail-hospital-search-section">
          <input id="search" value={this.state.searchTerm} onChange={this.onSearchInputChange} className="detail-hospital-search-input" placeholder={"Search for Hospital/Doctor/Location"} />
          <button className="search-button" onClick={this.onSearchClick}>Search</button>
        </div>
      )
    }
  }

  getHospitalDisplayArea(page){
    const { hospitals,filteredHospitals } = this.state;
    let hospitalList = [];
    if(page==='dashboard')
      hospitalList = hospitals;
    else hospitalList = filteredHospitals.length>0 ? filteredHospitals : hospitals;
    return map(hospitalList, (item, idx)=>{
      if((idx<6 && page==='dashboard') || (idx<18 && page==='search')){
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
  render () {
    const { searchMode } = this.props;
    const { searchTerm } = this.state;
    if(!searchMode){
      return(
        <div className="header-main body">
          <div className="body-content body-header-main">
            <div className="body-header-area">
              <h1>WE CARE</h1>
              <span>Find Your Best Health Assistant Here!</span>
            </div>
            {this.getHospitalSearchArea('dashboard')}
          </div>
          <div className="body-content hospital-head">
              <span>List of Hospitals</span>
              <a href='/searchHospital'>View All..</a>
            </div>
          <div className="body-content hospital-area">
            {this.getHospitalDisplayArea('dashboard')} 
          </div>       
        </div>
      )
    } else {
      return(
        <div className="header-main body">
          {this.getHospitalSearchArea('search')}
          <div className="body-content hospital-head margin-10">
              <span>List of Hospitals</span>
            </div>
          <div className="body-content hospital-area">
            {this.getHospitalDisplayArea('search')} 
          </div>       
        </div>
      )
    }
  }
}

export default LifecareMain;
