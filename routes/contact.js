const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

//
//Page Route
//
router.get('/', (req, res) => {
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

router.get('/edit/:id', (req, res) => {
  Contact.findById(req.params.id, (err, contact) => {
    res.render('contactEdit', {
      contact: contact
    });
  });
});

router.get('/add', (req, res) => {
  res.render('newContact');
});

//
//API Route
//
router.post('/:id', (req, res) => {
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
      res.redirect('/contacts');
    }
  });
});

router.post('/', (req, res) => {
  let contact = new Contact();
  const { firstName, lastName, email, mobile } = req.body;
  contact.firstName = firstName;
  contact.lastName = lastName;
  contact.email = email;
  contact.mobile = mobile;

  contact.save(err => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect('/contacts');
    }
  });
});

router.delete('/:id', (req, res) => {
  let query = { _id: req.params.id };
  Contact.remove(query, err => {
    if (err) {
      res.send(err.message);
      return;
    }
    res.send('Contact deleted sucessfully!');
  });
});

module.exports = router;
