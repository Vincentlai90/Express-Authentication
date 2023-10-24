/* Full name: Lai Minh Huy
   COMP 229 – Web Application Development
   Student ID: 301225382
   Date: 08/10/2023
   Created by Huy Lai. Copyright Fall 2023. All Rights reserved to Huy Lai
*/

let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET Home page. */
router.get('/', indexController.displayHomePage);

/* GET Home page. */
router.get('/home', indexController.displayHomePage);

/* GET About Us page. */
router.get('/about', indexController.displayAboutPage);

/* GET Products page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact Us page. */
router.get('/contact', indexController.displayContactPage);

/* GET Route for displaying the Login page */
router.get('/login', indexController.displayLoginPage);

/* POST Route for processing the Login page */
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying the Register page */
router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

/* GET to perform UserLogout */
router.get('/logout', indexController.performLogout);

/* POST to perform UserLogout */
router.post('/logout', indexController.performLogout);

exports.performLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      // Handle the error, e.g., by sending an error response
      res.status(500).send('Error logging out');
    } else {
      // Redirect to a different page after logout
      res.redirect('/'); // Replace with the desired redirection URL
    }
  });
};


// Handle form submission
router.post('/submitForm', (req, res) => {
  // Process the form data here (e.g., save to a database)
  const data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
  };

  // Now 'data' contains the information entered in the form
  console.log(data);

  // Redirect to the home page
  res.redirect('/');
});


module.exports = router;