var express = require('express');
//var path = require('path');
var app  = express();
var hospital=require('./hospitals.json');


app.get('/',function(req,res){
  res.header('Access-Control-Allow-Origin','*');
  res.json(hospital);
})

app.listen(8282,function(){
  console.log('App running successfully');
});
