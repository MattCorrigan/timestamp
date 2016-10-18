var express = require('express');
var app = express();

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

app.all("*", function(req, res){
  //console.log(req.path);
  if (req.path === "/" || req.path === "/index.html") {
    res.sendFile(__dirname + "/index.html");
  } else {
    
    var unix = null;
    var natural = null;
    
    if (!isNaN(req.path.replace("/", ""))){
      unix = parseInt(req.path.replace("/",""));
      var date = new Date(unix*1000);
      natural = monthNames[date.getMonth()] + " " + date.getDay() + ", " + date.getFullYear();
    } else {
      full = req.path.replace(",","").replace("/","");
      var tokens = full.split("\%20");
      full = full.replace("\%20", " ", 2);
      //console.log(full);
      if (tokens.length == 3) {
        unix = (new Date(full + " 00:00:00").getTime()/1000)/1000;
        natural = req.path.replace(/\%20/g," ",2).replace("/","");
        month = tokens[0];
        day = tokens[1];
        year = tokens[2];
      }
    }
    
    res.end("{\"unix\": " + unix + ", \"natural\": " + natural + "}");
  }
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 8080, function () {
  console.log('listening on port 8080');
});