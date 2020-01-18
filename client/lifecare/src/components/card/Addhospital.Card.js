import React, { Component } from 'react'
import $ from 'jquery';

class AddhospitalCard extends Component {
  constructor(props){
    super(props);
    this.state={
      hospitalName:'',
      address:'',
      about:'',
      contact:''
    }
    this.onsubmit=this.onsubmit.bind(this);
  }
  onsubmit(){
    const {hospitalName,address,about,contact} = this.state;
    let order = {
      lookupid:"",
      defaultFlag: "TRUE",
      name: hospitalName,
      address,
      aboutUs: about,
      contactUs: contact,
    };
    $.ajax({
      type: 'POST',
      data:order,
      dataType:'json',

      url: '/hospitals/createHospitals',
          success: (data)=> {
            alert("sucessful");
            //  console.log(data);
            window.location.href='/searchHospital'
          },
      error: function() {
        alert('error post data...');
      }
    });
    // this.props.addNewHospital(order);
  }
  render () {
    const {title, img, address, aboutUs, footerlink} = this.props;
    const { active }=this.state;
    let bodyContent=null;
    return(
      <div className="">
        <div className="register-hos" id="">
          <label className="">New Hospital details </label>
          <table className="register-hos-form">
            <tr>
              <td><span> Hospital Name</span></td>
              <td>
                <input
                  type="text"
                  id="name" 
                  onChange={(e)=>{if(e) this.setState({hospitalName: e.target.value})}}
                />
              </td>
            </tr>
            <tr>
              <td><span >Address</span></td>
              <td>
                <textarea onChange={(e)=>{if(e) this.setState({address: e.target.value})}} />
              </td>
            </tr>
            <tr>
              <td><span >About</span></td>
              <td>
                <textarea onChange={(e)=>{if(e) this.setState({about: e.target.value})}}/>
              </td>
            </tr>
            <tr>
              <td><span >Contact</span></td>
              <td>
                <input
                  type="text" 
                  id="contact" 
                  onChange={(e)=>{if(e) this.setState({contact: e.target.value})}}
                />
              </td>
            </tr>
          </table>
          <button  className="cancel-button" onClick={()=>this.props.onCancel(false)}>Cancel</button>
          <button  className="" onClick={()=> this.onsubmit()}>Submit</button>
        </div>
      </div>
        )
  }
}

export default AddhospitalCard;
