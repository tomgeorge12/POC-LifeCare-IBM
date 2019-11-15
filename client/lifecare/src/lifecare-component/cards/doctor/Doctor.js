import React, {Component} from 'react';
import _ from 'lodash';
import DoctorNameDisplay from './doctornamedisplay';
import SearchInput, {createFilter} from 'react-search-input';
import './doctor.css';

 const KEYS_TO_FILTERS = ['deptName','name'];
 const filteredDoctors=null;
 const renderDoctors=null;

class Doctor extends Component {
  constructor(props){
    super(props);
    this.state = {
        doctors:[],
        filtering:false,
        text:'',
        searchTerm:"",
        currentPage: 1,
        doctorsPerPage: 3
    }
    // this.getDepartments=this.getDepartments.bind(this);
    this.searchUpdated=this.searchUpdated.bind(this);
    this.dispComps=this.dispComps.bind(this);
    this.handleClickPage=this.handleClickPage.bind(this)
  }

  componentWillMount(){
    let {doctors} = this.state;
    _.map(this.props.deptList,(dept)=>{
      return _.map(dept,(innerdata)=>{
          return _.map(innerdata,doctor=>{
            return _.map(doctor,details=>{
              // console.log(doctor);
              doctors.push(details);
            })
          })
        });
    });
    console.log(doctors);
    this.setState({doctors});
  }

  handleClickPage(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

  dispComps(){
    return _.map(filteredDoctors,(hospital) => {
          return (
            <DoctorNameDisplay {...hospital} {...this.props}/>
        )
      });
  }
  // {this.dispComps()}
    render () {

      let {doctors,currentPage,doctorsPerPage,searchTerm}=this.state;
      filteredDoctors = doctors.filter(createFilter(this.state.searchTerm,KEYS_TO_FILTERS));
      // Logic for displaying todos
      const indexOfLastDoctor = currentPage * doctorsPerPage;
      const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
      const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
      if(searchTerm){
         renderDoctors = filteredDoctors.map((doctor, index) => {
          return   <DoctorNameDisplay {...doctor} {...this.props}/>
        });
      }else{
     renderDoctors = currentDoctors.map((doctor, index) => {
        return   <DoctorNameDisplay {...doctor} {...this.props}/>
      });
    }

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(doctors.length / doctorsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
          <div className="pagination">
        <li
          key={number}
          id={number}
          onClick={this.handleClickPage}
        >
          {number}
        </li>
        </div>
      );
    });

   if(searchTerm){
      if(filteredDoctors.length){
        return(
          <div >
            <SearchInput id="searchbar" onChange={this.searchUpdated} />
                {renderDoctors}
          </div>
        );
      }
      else {
        return(
        <div>
          <SearchInput id="searchbar" onChange={this.searchUpdated} /><br/>
          <div className="alert alert-danger bg-info">
            No results Found
          </div>
        </div>
        );
      }

    }
    else{
      return(
        <div>
          <SearchInput id="searchbar" onChange={this.searchUpdated} />
            <div id="doctor-list">
              {renderDoctors}
            </div>
              {renderPageNumbers}
        </div>
      );
    }
  }
}

export default Doctor;