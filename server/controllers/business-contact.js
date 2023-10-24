/* Full name: Lai Minh Huy
   COMP 229 – Web Application Development
   Student ID: 301225382
   Date: 08/10/2023
   Created by Huy Lai. Copyright Fall 2023. All Rights reserved to Huy Lai
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// connect to our Business Contact model and sort by name
let BusinessContact = require('../models/business-contact');

// controller for displaying contact list
module.exports.displayContactList = (req, res, next) => {
    BusinessContact.find((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('business-contact/list', {title: 'Business Contact List', ContactList: contactList, displayName: req.user ? req.user.displayName : ''});
        }
    }).sort({"name":1});
}

// controller for displaying Add contact page
module.exports.displayAddPage = (req, res, next) => {
    res.render('business-contact/add', {title: 'Add New Contact', displayName: req.user ? req.user.displayName : ''});
}

// controller for processing post request of add page
module.exports.processAddPage = (req, res, next) => {
    let newContact = BusinessContact({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    BusinessContact.create(newContact, (err, BusinessContact) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the business contact list
            res.redirect('/business-contact-list');
        }
    });
}

// controller for displaying Edit contact page
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    BusinessContact.findById(id, (err, contactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('business-contact/edit', {title: 'Edit Contact', businessContact: contactToEdit, displayName: req.user ? req.user.displayName : ''})
        }
    });
}

// controller for processing post request of edit page
module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedContact = BusinessContact({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    BusinessContact.updateOne({_id: id}, updatedContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the business contact list
            res.redirect('/business-contact-list');
        }
    });
}

// controller for performing entry deletion
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    BusinessContact.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the business contact list
             res.redirect('/business-contact-list');
        }
    });
}

// Handle the POST request for deletion
exports.performDelete = function (req, res, next) {
    // Get the ID from the URL parameters
    const id = req.params.id;
  
    // Find the contact by ID and remove it
    BusinessContact.findByIdAndRemove(id, function (err) {
      if (err) {
        console.log('Error deleting contact:', err);
        // Handle the error and respond accordingly
        res.status(500).send('Error deleting contact');
      } else {
        // Redirect to a success page or any other desired action
        res.redirect('/business-contact-list');
      }
    });
  };