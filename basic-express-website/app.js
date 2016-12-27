var express = require('express');
var jade = require('jade');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var http = require('http');
var fs = require('fs');
var path = require('path');

var app = express();
//Add views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//Add css
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('index', {title: 'We Fix PC Issues'});
});
app.get('/about', function(req, res){
  res.render('about');
});
app.get('/contact', function(req, res){
  res.render('contact');
});
app.post('/contact/send', function(req, res){
 var transporter = nodemailer.createTransport({
   service: 'hotmail',
   auth: {
     user: 'aundreydrummond@live.com',
     pass: 'Steeler1'
   }
 });

 var mailOptions = {
   from: 'Aundrey Drummond <aundreydrummond@live.com>',
   to: 'aundreydrummond@live.com',
   subject: 'Website Submission',
   text: 'You have a submission with the following details.... Name ' + req.body.name + 'Enail: ' + req.body.email + 'Message: ' + req.body.message,
   html: '<p>You have a submission with the following details....<ul><li>Name: ' + req.body.name +'</li><li>Email: ' + req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul'
 };

 transporter.sendMail(mailOptions, function(error, info){
   if(error){
     console.log('error yo' +  error);
     res.redirect('/');
   }else{
     console.log('MSG sent ' + info.response);
     res.redirect('/');
   }
 });
});

app.listen(3000);
console.log('Server up yo!');
