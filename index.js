// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


let responseJSON = {};

app.get('/api/:input', (req, res) => {  //the : works like a url param
  let input = req.params.input;
  let dateInput = "";
  let unixInput = "";
  let testRegexMiliseconds = /[0-9]+/;
  if (input.includes("-") || input.includes(" ")) {
    if(new Date(input).toUTCString() != "Invalid Date") {
      responseJSON['unix'] = new Date(input).getTime();
      responseJSON['utc'] = new Date(input).toUTCString();
    }
    else {
      responseJSON['error'] = 'Invalid Date';
    }
  }
  else if (testRegexMiliseconds.test(input) === true) {
    input = parseInt(input);
    responseJSON['unix'] = input;
    responseJSON['utc'] = new Date(input).toUTCString();
  }
  
  res.json(responseJSON);
});

app.get('/api/', (req, res) => {
  responseJSON['unix'] = new Date().getTime();
  responseJSON['utc'] = new Date().toUTCString();
  res.json(responseJSON);
});