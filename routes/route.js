const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts');
//data retrieving data
router.get('/listContacts', (req, res, next) => {
    //res.send('Retrieving the contact list');
    Contact.find(function(err, contacts) {
        res.json(contacts);
    });
});

//add contact
router.post('/addContact', (req, res, next) => {
    //logic
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone

    });
    newContact.save((err, contact) => {
        if (err) {
            res.json({ msg: 'Failed to add' });
        } else {
            res.json({ msg: 'Added' });
        }
    });
});

//delete router
router.delete('/deleteContact/:id', (req, res, next) => {
    //logic
    Contact.remove({ _id: req.params.id }, function(err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
});

module.exports = router;