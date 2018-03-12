//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();
const route = require('./routes/route');

//connect to mongo db
mongoose.connect('mongodb://localhost:27017/contactlist', {
    useMongoClient: true
});

//on connection
mongoose.connection.on('connected', () => {
    console.log('connected to db');
});

//on error
mongoose.connection.on('error', (err) => {
    console.log('error while connecting to the database' + err);
});

//port no
const port = 3000;

//adding middleware - cors
app.use(cors());

//body parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', route);

//testing server
app.get('/', (req, res) => {
    res.send('Welcome to Mean App');
});
app.listen(port, () => {
    console.log('server started at: ' + port);
});