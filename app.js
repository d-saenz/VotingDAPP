var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/votate.js");
var cors = require('cors');

var app = express();

/*app.use(cors());
 
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
});
 
app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
});*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors({origin: 'http://localhost:8080'}));
app.use("/api", routes);


const PORT = process.env.PORT || 3600;

var server = app.listen(PORT, function () {
    console.log("Saenz Server app running on port.", PORT); 
}); 