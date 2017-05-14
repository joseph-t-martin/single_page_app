# Single page Web App Challenge
This service is a webform that allows a user to send an email. 

## Laravel Backend 
The backend it built using Laravel. It accepts a restful call and from there it will attempt to send an email based on the details passed in through the form.
It is built with fallover so that if the email fails to send using SendGrid it then attempt to send the email using MailGun. 
The Laravel code for the backend is located in app/Http/Controllers/EmailController.php for the controller and in app/Email.php for the send email model.

## React Frontend
The frontend is set up as a single page app build using ReactJS. 
The form accepts the following fields:
- To (Required)
- CC
- BCC
- Subject (Required)
- Message (Required)

And based on the data given will send an email. 
The React code for the frontend are located in resources/assets/js/ and uses Gulp to compile it into bundle.js

## Installation
Please note: This does assume you have php and composer installed on your machine. You may also need to enable extra php extensions in order for the composer install command to work.

- git clone git@github.com:joseph-t-martin/single_page_app.git
- cd single_page_app/
- composer install
- cp .env.example .env
- Edit the .env file and set the SendGrid and MailGun api keys
- php artisan key:generate
- php artisan serve

## Additional Work
- Log message to the database so that we have a copy of all emails being send.
- Logging so that if either of the message clients valid to send to can investigate as to why.
- Change Javascipt reponses to be pretty messages rather than just alerts.
