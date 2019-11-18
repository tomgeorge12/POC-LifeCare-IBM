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
let appointment=require('./mock/appointment.json');
const PORT = process.env.PORT || 8282;

const uri = "mongodb+srv://tomgeorge12:M@d@th1l@lifecare-c3q3e.mongodb.net/test?retryWrites=true&w=majority"

const getDecodedString = (value) => {
  let buff = new Buffer(value, 'base64');
  let text = buff.toString('ascii');
  return text;
}
app.get('/hospitals/',function(req,res){
  res.header('Access-Control-Allow-Origin','*');
  res.json(hospital);
});

app.get('/hospitals/gethospitaldetail',function(req,res){
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
app.post('/hospitals/createappointment',function(req,res){
  var user_ID = getRandomInt();
  let appointment_object = JSON.parse(fs.readFileSync('./mock/appointment.json', 'utf8'));
  let appointment_data = '{"doctor":{"patient": [' +
      '{ "userId":" ' + user_ID  + ' ","patientname":" '+ req.body.name +' " ,"patientage":" '+ req.body.age +' " ,"patientsex":" '+ req.body.sex +' " , "contactno":" '+ req.body.number +'  ","patientdate":" '+ req.body.date +' " ,"patientslot":" '+ req.body.slot +' " }]}}';
  let Tem = JSON.parse(appointment_data);
  appointment_object.doctor.patient.push(Tem.doctor.patient[0]);
  fs.writeFile ('./mock/appointment.json',JSON.stringify(appointment_object , null, 2) , function(err) {
    // console.log("callback::running");
    if (err){
      console.log("Error is::"+err+"...................");
    }
    res.header('Access-Control-Allow-Origin','*');
    res.json({success : "Updated Successfully", status : 200, user_id : user_ID});
  }
  );

});

app.post('/hospitals/createHospitals',function(req,res){
  var lookupid = getRandomInt();
  let create_object = JSON.parse(fs.readFileSync('./mock/hospitalcomponent.json', 'utf8'));
  let create_data = '{"cardContent":{"relationItems": [' +
      '{ "lookupid":" ' + lookupid  + ' " ,"name":" '+ req.body.name +' ","address":" '+ req.body.address +' " ,"aboutUs":" '+ req.body.aboutUs +' " , "contactUs":" '+ req.body.contactUs +'  " }]}}';
  let Tem = JSON.parse(create_data);
  create_object.cardContent.relationItems.push(Tem.cardContent.relationItems[0]);
  fs.writeFile ('./mock/hospitalcomponent.json',JSON.stringify(create_object , null, 2) , function(err) {
    console.log("callback:: create running");
    if (err){
      console.log("Error is::"+err+"...................");
    }
    res.header('Access-Control-Allow-Origin','*');
    res.json({success : "created Successfully", status : 200, lookupid:lookupid});
  }
  );
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
    usersCollection.find((err, items)=>{
      console.log('info', 'Registered user:', items);      
      const user = find(items, {'username' : username, 'password': password});
    })
    if(!isEmpty(user)) {
      res.header('Access-Control-Allow-Origin','*').json({loginSuccess : true, status : 200}).status(200);
    } else {
      res.header('Access-Control-Allow-Origin','*').status(400).json({loginSuccess : false, status : 400});
    }    
    client.close();
  });
  // let usersCollection = JSON.parse(fs.readFileSync('./mock/users.json', 'utf8'));
});

app.post('/users/register',function(req,res){
  console.log(JSON.stringify(req.body));
  let usersCollection = JSON.parse(fs.readFileSync('./mock/users.json', 'utf8'));
  const username = req.body.username;
  const password = getDecodedString(req.body.password);
  usersCollection.users.push({'username' : username, 'password': password});  
  console.log('info', 'Registered user:', usersCollection);
  fs.writeFile ('./mock/users.json',JSON.stringify(usersCollection , null, 2) , function(err) {
    if (err){
      console.log("Register User Error | "+err);
      res.header('Access-Control-Allow-Origin','*').status(400).json({registerSuccess : false, status : 400});      
    } else {
      res.header('Access-Control-Allow-Origin','*');
      res.status(200).json({registerSuccess : true, status : 200});
    }
  });
});

// if(process.env.NODE_ENV === 'production'){
  //to serve the static files
  app.use(express.static(path.join(__dirname, "/client/lifecare/build")));
  app.get("*", (req,res)=>{
    res.sendFile(path.resolve(path.join(__dirname, "/client/lifecare/build/index.html")))
  });
// }

app.listen(PORT,function(){
  console.log('App running successfully on ', PORT);
});
