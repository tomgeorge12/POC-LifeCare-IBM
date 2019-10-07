import React, { Component } from 'react';
import HospitalMain from '../lifecare-component/cards/hospitalmain/hospitalmain.component.js';
import $ from 'jquery';
import _ from 'lodash';
import './lifecare-container.css';
import SearchInput, {createFilter} from 'react-search-input';
import logo from '../lifecarelogo.png'
import Footer from '../lifecare-component/footer/footer.component';
import AdminComponent from '../lifecare-component/cards/admin/AdminComponent';
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';

const KEYS_TO_FILTERS = ['name'];
const filteredHospital=null;
const renderHospitals = null;

class LifeCycle extends Component {
  constructor(props){
    super(props);
    this.state={
      hospitals:[],
      searchTerm:'',
      currentPage: 1,
      hospitalsPerPage: 8
    }
    this.searchUpdated=this.searchUpdated.bind(this);
    this.handleClickPage=this.handleClickPage.bind(this);
    this.addNewHospital=this.addNewHospital.bind(this);
    this.handleAddClick=this.handleAddClick.bind(this);
    // this.renderMainContent=this.renderMainContent.bind(this);
    // this.display=this.display.bind(this);
    // this.getContent = this.getContent.bind(this);
  }

  componentDidMount(){
      let {hospitals} = this.state;
      $.getJSON('http://localhost:8282/',(data)=>{
        let arr=Object.keys(data).map((k)=>data[k]);
          this.setState({hospitals:data.cardContent.relationItems});
      });
    }

    handleClickPage(event) {
       this.setState({
         currentPage: Number(event.target.id)
       });
     }

    searchUpdated (term) {
      this.setState({searchTerm: term})
    }

    addNewHospital(hospital){
      let {hospitals} = this.state;
      hospitals.push(hospital);
      console.log(hospitals);
      this.setState({hospitals});
    }

    handleAddClick(){
      return(
        ModalManager.open(<AdminComponent addNewHospital={this.addNewHospital}/>)
      )
    }

    // renderMainContent(){
    //   if(filteredHospital.length){
    //     console.log("inside render::");
    //     return(
    //       <div>
    //         <div id="jumbotron" className="text-center">
    //           <img id="logo" src={logo}/>
    //           <SearchInput id="search-input" onChange={this.searchUpdated} />
    //         </div>
    //         <div>
    //           {console.log(renderHospitals)}
    //         </div>
    //           <div className="footer">
    //         <Footer/>
    //         </div>
    //       </div>
    //     );
    //   }
    //   else{
    //     return(
    //       <div>
    //         <div id="jumbotron" className="text-center">
    //           <img id="logo" src={logo}/>
    //           <SearchInput id="search-input" onChange={this.searchUpdated} />
    //         </div><br/>
    //       <div className="alert alert-danger bg-info">
    //         No Hospitals Found
    //       </div>
    //       <div className="footer">
    //     <Footer/>
    //     </div>
    //     </div>
    //     );
    //   }
    // }

 render () {

    let {hospitals,currentPage,hospitalsPerPage,searchTerm}=this.state;
    filteredHospital = hospitals.filter(createFilter(this.state.searchTerm,KEYS_TO_FILTERS));

    // for displaying hospitals as pagewise
    const indexOfLastHospital = currentPage * hospitalsPerPage;
    const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
    const currentHospitals = hospitals.slice(indexOfFirstHospital, indexOfLastHospital);
    if(searchTerm){
      renderHospitals = filteredHospital.map((hospital, index) => {
        return (
                <div className='cardcomponent col-xs-10 col-sm-10 col-md-4 col-lg-4'>
                  <HospitalMain {...hospital}/>
                </div>
              );
      });
    }
    else{
      renderHospitals = currentHospitals.map((hospital, index) => {
        return (
                <div className='cardcomponent col-xs-10 col-sm-10 col-md-4 col-lg-4'>
                  <HospitalMain {...hospital}/>
                </div>
              );
      });
    }

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(hospitals.length / hospitalsPerPage); i++) {
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

    //For displaying hospitals on search
    if(searchTerm){
      if(filteredHospital.length){
        return(
          <div>
            <div id="jumbotron" className="text-center">
              <img id="logo" src={logo}/>
              <SearchInput id="search-input" onChange={this.searchUpdated} />
            </div>
            <div className="main-content">
              {renderHospitals}
            </div>
              <div className="footer">
            <Footer/>
            </div>
          </div>
        );
      }
      else{
        return(
          <div>
            <div id="jumbotron" className="text-center">
              <img id="logo" src={logo}/>
              <SearchInput id="search-input" onChange={this.searchUpdated} />
            </div><br/>
          <div className="alert alert-danger bg-info">
            No Hospitals Found
          </div>
          <div className="footer">
        <Footer/>
        </div>
        </div>
        );
      }
    }
    else{
      return(
        <div>
          <div id="jumbotron" className="text-center">
            <img id="logo" src={logo}/>
            <SearchInput id="search-input" onChange={this.searchUpdated} />
          </div>
          <div className="main-content">
            {renderHospitals}
          </div>
          <div>
            <button className="btn btn-info pull-right" onClick={this.handleAddClick}>Add New Hospital</button>
          </div>
          <div className="page-numbers col-md-12">
            {renderPageNumbers}
          </div>
          <div className="footer">
            <Footer/>
          </div>
        </div>
      )
    }
  }
}

export default LifeCycle ;


// {_.map(filteredHospital,(hospital) => {
//       return (
//
//       <div className='col-md-4 col-sm-4 col-lg-4'>
//         <HospitalMain {...hospital}/>
//       </div>
//     )
//   })
// }


// <div className="row">
//   {this.getContent()}
// </div>


// display(){
//   _.map(filteredHospital,(hospital) => {
//         return (
//         <div className='col-md-4 col-sm-6'>
//           <HospitalMain {...hospital}/>
//         </div>
//       )
//     });
// }
// getContent(){
  // let {hospital}=this.state;
  // let hospitalComps=_.map(hospital,(info,idx)=>{
  //   return _.map(info.cardContent.relationItems,(data)=>{
  //     console.log(data);
  //     return (
  //       <div className="col-md-6">
  //         <HospitalMain {...data}/>
  //     </div>
  //   )
  //   })
  // });
  // return hospitalComps;
  // console.log(filteredHospital);
  // _.map(filteredHospital,(hospital,idx) => {
  //   return (
  //     <div className='col-md-4 col-sm-4 col-lg-4'>
  //       <HospitalMain {...hospital} key={idx}/>
  //     </div>
  //   )
  // });
// }
