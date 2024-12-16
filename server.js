const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Contact form route
app.post('/submit-contact', (req, res) => {
  const { name, email, message } = req.body;

  // Send email logic (using nodemailer)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password'
    }
  });

  const mailOptions = {
    from: email,
    to: 'coffee-shop-email@gmail.com',
    subject: `New Contact Form Submission from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Error: Message not sent');
    } else {
      console.log('Message sent: ' + info.response);
      res.send('Thank you for contacting us!');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
