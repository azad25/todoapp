const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const user = require("./routes/api/user");
const task = require("./routes/api/task");

const port = process.env.PORT || 5000;

const app = express();

//parse body from client
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));

app.use("/api/task", task);
app.use("/api/user", user);

app.listen(port, function () {
    console.log('App running on port ' + port);
});