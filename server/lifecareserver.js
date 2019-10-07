var express = require('express');
//var path = require('path');
var app  = express();
let fs = require('fs');
var hospital=require('./hospitalcomponent.json');
var hospitalDetails=require('./hospitaldetails.json');
let bodyParser = require('body-parser');
let find = require('lodash/find');
let isEmpty = require('lodash/isEmpty');
let appointment=require('./appointment.json');

const getDecodedString = (value) => {
  let buff = new Buffer(value, 'base64');
  let text = buff.toString('ascii');
  return text;
}
app.get('/',function(req,res){
  res.header('Access-Control-Allow-Origin','*');
  res.json(hospital);
});

app.get('/gethospitaldetail',function(req,res){
  res.header('Access-Control-Allow-Origin','*');
  res.json(hospitalDetails);
});

app.use(bodyParser.urlencoded({
  extended:true
}));

function getRandomInt(){
  var min=100000;
  var max=1000000000;
  return Math.floor(Math.random() * (max - min + 1) + min);
}
app.post('/create',function(req,res){
  var user_ID = getRandomInt();
  let appointment_object = JSON.parse(fs.readFileSync('./appointment.json', 'utf8'));
  let appointment_data = '{"doctor":{"patient": [' +
      '{ "userId":" ' + user_ID  + ' ","patientname":" '+ req.body.name +' " ,"patientage":" '+ req.body.age +' " ,"patientsex":" '+ req.body.sex +' " , "contactno":" '+ req.body.number +'  ","patientdate":" '+ req.body.date +' " ,"patientslot":" '+ req.body.slot +' " }]}}';
  let Tem = JSON.parse(appointment_data);
  appointment_object.doctor.patient.push(Tem.doctor.patient[0]);
  fs.writeFile ('./appointment.json',JSON.stringify(appointment_object , null, 2) , function(err) {
    console.log("callback::running");
    if (err){
      console.log("Error is::"+err+"...................");
    }
    res.header('Access-Control-Allow-Origin','*');
    res.json({success : "Updated Successfully", status : 200, user_id : user_ID});
  }
  );

});

app.post('/createHospitals',function(req,res){
  var lookupid = getRandomInt();
  let create_object = JSON.parse(fs.readFileSync('./HospitalComponent.json', 'utf8'));
  let create_data = '{"cardContent":{"relationItems": [' +
      '{ "lookupid":" ' + lookupid  + ' " ,"name":" '+ req.body.name +' ","address":" '+ req.body.address +' " ,"aboutUs":" '+ req.body.aboutUs +' " , "contactUs":" '+ req.body.contactUs +'  " }]}}';
  let Tem = JSON.parse(create_data);
  create_object.cardContent.relationItems.push(Tem.cardContent.relationItems[0]);
  fs.writeFile ('./HospitalComponent.json',JSON.stringify(create_object , null, 2) , function(err) {
    console.log("callback:: create running");
    if (err){
      console.log("Error is::"+err+"...................");
    }
    res.header('Access-Control-Allow-Origin','*');
    res.json({success : "created Successfully", status : 200, lookupid:lookupid});
  }
  );
});

app.post('/login',function(req,res){
  console.log(JSON.stringify(req.body));
  let usersCollection = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  const username = getDecodedString(req.body.username);
  const password = getDecodedString(req.body.password);
  const user = find(usersCollection.users, {'username' : username, 'password': password});  
  console.log('info', 'Registered user:', user);
  if(!isEmpty(user)) {
    res.header('Access-Control-Allow-Origin','*').json({loginSuccess : true, status : 200}).status(200);
  } else {
    res.header('Access-Control-Allow-Origin','*').status(400).json({loginSuccess : false, status : 400});
  }
});

app.listen(8282,function(){
  console.log('App running successfully: 8282');
});
