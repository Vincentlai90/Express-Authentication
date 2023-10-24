/* Full name: Lai Minh Huy
   COMP 229 – Web Application Development
   Student ID: 301225382
   Date: 08/10/2023
   Created by Huy Lai. Copyright Fall 2023. All Rights reserved to Huy Lai
*/

let mongoose = require('mongoose');

// create a contact model class
let contactModel = mongoose.Schema({
    name: String,
    number: String,
    email: String
},
{
    collection: "contacts"
});

module.exports = mongoose.model('BusinessContact', contactModel);