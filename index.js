const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Contact = require('./models/Contact');
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

app.get('/', (req, res) => {
  res.render('index');
});

//
//Page Route
//
app.get('/contact', (req, res) => {
  Contact.find({}, (err, contacts) => {
    if (err) {
      console.log(err);
    } else {
      res.render('contactList', {
        contacts: contacts
      });
    }
  });
});

app.get('/contact/edit/:id', (req, res) => {
  Contact.findById(req.params.id, (err, contact) => {
    res.render('contactEdit', {
      contact: contact
    });
  });
});

app.get('/contact/add', (req, res) => {
  res.render('newContact');
});

//
//API Route
//
app.post('/api/contact/:id', (req, res) => {
  let contact = {};
  const { firstName, lastName, email, mobile } = req.body;
  contact.firstName = firstName;
  contact.lastName = lastName;
  contact.email = email;
  contact.mobile = mobile;

  const query = { _id: req.params.id };

  Contact.update(query, contact, err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/contact');
    }
  });
});

app.post('/api/contacts', (req, res) => {
  let contact = new Contact();
  const { firstName, lastName, email, mobile, message } = req.body;
  contact.firstName = firstName;
  contact.lastName = lastName;
  contact.email = email;
  contact.mobile = mobile;
  contact.message = message;

  contact.save(err => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });
});

app.listen(5000, () => {
  console.log('Listening on port 5000...');
});
