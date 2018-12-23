const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/liuxue');
const db = mongoose.connection;

//Check MongoDB connection
db.once('open', () => {
  console.log('MongoDB connected!');
});
//Check MongoDB error
db.on('error', err => {
  console.log(err);
});

//init express
const app = express();

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//

app.get('/', (req, res) => {
  res.render('index');
});

let contacts = require('./routes/contact');
app.use('/contacts', contacts);
app.use('/api/contacts', contacts);

app.listen(5000, () => {
  console.log('Listening on port 5000...');
});
