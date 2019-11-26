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
    // this.onSearchClick=this.onSearchClick.bind(this);
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
    return(
        <div className="search-card">
          <div className="search-section">
            <input id="search" className="search-input" placeholder={"Search for Hospital/Doctor/Location"} />
            <div className="search-button-par">
              <select className="search-options" value={this.state.searchOption}>{this.getSearchOptions()}</select>
              <button className="search-button" onClick={()=>location.href='/searchHospital'}>Search</button>
            </div>
          </div>
        </div>
    )
  }

  getHospitalDisplayArea(page){
    const { hospitals,filteredHospitals } = this.state;
    return map(hospitals, (item, idx)=>{
      if(idx<6){
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

  // onSearchClick(){
  //   const { hospitals, searchTerm } = this.state;
  //   let filteredHospitals = [];
  //   map(hospitals, (item)=>{
  //     const name=item.name;
  //     if(name.search(searchTerm) !== -1){
  //       filteredHospitals.push(item);
  //     }
  //   });
  //   this.setState({ filteredHospitals });
  // }
  render () {
    const { searchMode } = this.props;
    const { searchTerm } = this.state;
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
            <a href='/searchHospital'>View All..</a>
          </div>
        <div className="body-content hospital-area">
          {this.getHospitalDisplayArea()} 
        </div>       
      </div>
    )
  }
}

export default LifecareMain;
