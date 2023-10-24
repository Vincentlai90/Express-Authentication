/* Full name: Lai Minh Huy
   COMP 229 – Web Application Development
   Student ID: 301225382
   Date: 08/10/2023
   Created by Huy Lai. Copyright Fall 2023. All Rights reserved to Huy Lai
*/

// IIFE -- Immediately Invoked Function Expression
(function() {
    function Start() {
        console.log("App Started...");

        // prompts the user before deleting database entry
        let deleteButtons = document.querySelectorAll('.delete-button');

        for (button of deleteButtons) {
            button.addEventListener('click', (event) => {
                console.log("Button clicked"); // Log that the button was clicked
                if (!confirm("Are you sure you want to delete this entry?")) {
                    event.preventDefault();
                    window.location.assign('/business-contact-list');
                }
            });
        }
    }

    window.addEventListener("load", Start);
})();
