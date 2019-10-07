import React, { Component } from 'react'
import $ from 'jquery';

class AdminComponent extends Component {
  onsubmit(){
    let $hospitalName= $('#name');
    let $address= $('#address');
    let $about=$('#aboutus');
    let $contact=$('#contact');

      let order = {
        lookupid:"",
        defaultFlag: "TRUE",
        name: $hospitalName.val(),
        address: $address.val(),
        aboutUs:$about.val(),
        contactUs: $contact.val(),

        };
      $.ajax({
        type: 'POST',
        data:order,
        dataType:'json',

        url: 'http://localhost:8282/createHospitals',
           success: (data)=> {
             alert("sucessful");
            //  console.log(data);
            order.lookupid = data.lookupid;
           },
        error: function() {
          alert('error post data...');
        }
      });
      // console.log(order);

      this.props.addNewHospital(order);
    }


  render () {
    const labelstyle = {color:'red'};
    return(
      <div className="container">

   <div className="panel panel-primary" id="panel1">
     <div className="panel-heading">Add new Hospital details </div>
     <div className="panel-body">
       <div className="form-group">
         <label > Hospital Name:</label>
         <input type="text" id="name" className="form-control" ></input>
         <label id="forname" style={labelstyle}></label>

           <label >Address:</label>
           <input type="textarea" id="address" className="form-control" ></input>
           <label id="foraddress" style={labelstyle}></label>
           <br/>
           <label >About :</label>
           <input type="textarea" id="aboutus" className="form-control" ></input>
           <label id="foraboutus" style={labelstyle}></label>
           <br/>
           <label >Contact :</label>
           <input type="text" id="contact" className="form-control" ></input>
           <label id="forcontact" style={labelstyle}></label>
           <br/>
          <button  className="btn btn-primary center-block" onClick={()=> this.onsubmit()}>Add new Data </button>
           </div>
           </div>
           </div>
           </div>

        )

  }
}

export default AdminComponent;
