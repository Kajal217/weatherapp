const request = require('request');
const apiKey = '68c49912de3468d705e76dd4b652fc6e';


const express = require('express');
const app = express()
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
  })
    

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
  //encodedd into the URL the units, the city the user entered, and API key to get access from the weather website

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'}); //error if request doesnt go through
      
    } else {
      let weather = JSON.parse(body); // parses through the text that is returned from the request with our given parameters since that text returned is 
      //a json response and we wnat to make it a javascript object.


      if(weather.main == undefined){ //if the user did not enter a city 
        res.render('index', {weather: null, error: 'Error, please try again'}); //json response back, renders html page 
      } else {
        let message = `It's ${weather.main.temp} Fahrenheit degrees in ${weather.name}!`;
        res.render('index', {weather: message, error: null});
      
      
      //setting variable message to weather object's main temp property and also returning the name of what we are refering by getting the name 
      //property of the object we make

      }
    }
  });
  })


  app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })

//to print to terminal to know it's connected to the server
  