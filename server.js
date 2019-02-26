var express = require('express');

var app = express();

var port  = process.env.port;

app.listen(port, function(){
    console.log('App running on port ' + port );
});