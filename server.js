const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html from the root directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Adjusted path
});

app.post('/send-booking-email', (req, res) => {
    const { name, email, phone, date } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'danksahil895@gmail.com',
            pass: 'hwqppuzkzdxtlhen' // App Password
        }
    });

    const mailOptions = {
        from: email,
        to: 'danksahil895@gmail.com',
        subject: 'New Booking',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send(error.toString());
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.post('/send-contact-email', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'danksahil895@gmail.com',
            pass: 'hwqppuzkzdxtlhen' // App Password
        }
    });

    const mailOptions = {
        from: email,
        to: 'danksahil895@gmail.com',
        subject: 'New Contact Message',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send(error.toString());
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
