var express = require('express');
var path = require('path');
var app  = express();
let fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
var hospital=require('./mock/hospitalcomponent.json');
var hospitalDetails=require('./mock/hospitaldetails.json');
let bodyParser = require('body-parser');
let find = require('lodash/find');
let isEmpty = require('lodash/isEmpty');
// let find = require('lodash/find');
let appointment=require('./mock/appointment.json');
const PORT = process.env.PORT || 8282;

const uri = "mongodb+srv://tomgeorge12:M@d@th1l@lifecare-c3q3e.mongodb.net/test?retryWrites=true&w=majority"

const getDecodedString = (value) => {
  let buff = new Buffer(value, 'base64');
  let text = buff.toString('ascii');
  return text;
}
app.get('/hospitals/',function(req,res){
  if(process.ENV==='production'){
    MongoClient.connect(uri, (err, client)=>{
      if(err){
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);      
      }
      console.log('Connected...');
      const hospitalsCollection = client.db("lifecare").collection("hospitals");
      hospitalsCollection.find({}).toArray((err, items)=>{
        if(!err){
          res.header('Access-Control-Allow-Origin','*');
          res.json(items);
        } else {
          console.log('Error reading data | ', err);
        }
      });
    })
  } else {
    res.header('Access-Control-Allow-Origin','*');
    res.json(hospital);
  }
  
});

app.get('/hospitals/gethospitaldetail',function(req,res){
  const lookupid = req.query.lookupid;
  const doctorsList = find(hospitalDetails.hospitalDetails, {lookupid});
  console.log('doctors=>', doctorsList)
  res.header('Access-Control-Allow-Origin','*');
  res.json(doctorsList);
});

app.use(bodyParser.urlencoded({
  extended:true
}));

function getRandomInt(){
  var min=100000;
  var max=1000000000;
  return Math.floor(Math.random() * (max - min + 1) + min);
}
app.post('/hospitals/createappointment',function(req,res){
  var user_ID = getRandomInt();
  MongoClient.connect(uri, (err, client)=>{
    if(!err){
      const appointmentCollection = client.db("lifecare").collection("appointment");
      let appointment_data = {
        ReferenceID: user_ID,
        patientname: req.body.name,
        patientage: req.body.age,
        patientsex: req.body.sex,
        contactno: req.body.number,
        patientdate: req.body.date,
        patientslot: req.body.slot,
        doctor: req.body.doctor
      };
      appointmentCollection.insertOne(appointment_data, (err, item)=>{
        if(err){
          console.log('Error', 'Error in inserting data | ', err);
          res.header('Access-Control-Allow-Origin','*').status(400);
        }
        else {
          console.log('info', 'Success'); 
          res.header('Access-Control-Allow-Origin','*');
          res.json({success : true, status : 200, appointment: { ...appointment_data}});     
        }
      })
    } else {
      console.log('Error connectig DB | ', err)
    }
    client.close();
  });

});

app.post('/hospitals/createHospitals',function(req,res){
  var lookupid = getRandomInt();

  MongoClient.connect(uri, (err, client)=>{
    if(!err){
      const hospitalsCollection = client.db("lifecare").collection("hospitals");
      let hospital_data = {
        lookupid,
        name: req.body.name,
        address: req.body.address,
        aboutUs: req.body.aboutUs,
        contactno: req.body.number,
        contactUs: req.body.contactUs,
        defaultFlag: "TRUE",
        url: "images/1.jpg"
      };
      hospitalsCollection.insertOne(hospital_data, (err, item)=>{
        if(err){
          console.log('Error', 'Error in inserting data | ', err);
          res.header('Access-Control-Allow-Origin','*').status(400);
        }
        else {
          console.log('info', 'Success'); 
          res.header('Access-Control-Allow-Origin','*');
          res.json({success : true, status : 200, hospital: { ...hospital_data}});     
        }
      })
    } else {
      console.log('Error connectig DB | ', err)
    }
    client.close();
  });
});

app.post('/users/login',function(req,res){
  console.log(JSON.stringify(req.body));
  const username = getDecodedString(req.body.username);
  const password = getDecodedString(req.body.password);
  MongoClient.connect(uri, function(err, client) {
    if(err) {
         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
    }
    console.log('Connected...');
    const usersCollection = client.db("lifecare").collection("users");
    // perform actions on the collection object
    let user=null;
    usersCollection.find({}).toArray((err, items)=>{
      console.log('info', 'Registered user:', items);      
      user = find(items, {'username' : username, 'password': password});
      console.log('info', 'Registered user:', isEmpty(user)); 
      if(!isEmpty(user)) {
        res.header('Access-Control-Allow-Origin','*').json({user: username, loginSuccess : true, status : 200}).status(200);
      } else {
        res.header('Access-Control-Allow-Origin','*').status(400).json({loginSuccess : false, status : 400});
      }               
    })
    console.log('info', 'Registered user:', user);            
    
    client.close();
  });
  // let usersCollection = JSON.parse(fs.readFileSync('./mock/users.json', 'utf8'));
});

app.post('/users/register',function(req,res){
  console.log(JSON.stringify(req.body));
  MongoClient.connect(uri, function(err, client) {
    if(err) {
         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
    }
    console.log('Connected...');
    const usersCollection = client.db("lifecare").collection("users");
    const user = {'username' : req.body.username, 'password': getDecodedString(req.body.password)};
    usersCollection.insertOne(user, (err, items)=>{
      if(err){
        console.log('Error', 'Error in inserting data | ', err);
        res.header('Access-Control-Allow-Origin','*').status(400).json({registerSuccess : false, status : 400}); 
      }
      else {
        console.log('info', 'Success'); 
        res.header('Access-Control-Allow-Origin','*');
        res.status(200).json({registerSuccess : true, status : 200});     
      }         
    });
    console.log('info', 'Registered user:', user);
    client.close();
  });
});

if(process.env.NODE_ENV === 'production'){
  //to serve the static files
  app.use(express.static(path.join(__dirname, "/client/lifecare/build")));
  app.get("*", (req,res)=>{
    res.sendFile(path.resolve(path.join(__dirname, "/client/lifecare/build/index.html")))
  });
}

app.listen(PORT,function(){
  console.log('Server started at: ', PORT);
});
