const nodemailer = require('nodemailer');
const MongoClient = require('mongodb').MongoClient;


// Create a MongoDB connection
const url = 'mongodb+srv://krishnaparmar2003kp:Krishna_1234@cluster0.qcd9v.mongodb.net/?retryWrites=true';
const dbName = 'RESTAURANT';

MongoClient.connect(url, function(err, client)) {
  if (err) {
    console.error('error connecting:', err);
    return;
  }
  console.log('connected to MongoDB');

  const db = client.db(dbName);
  const collection = db.collection('reservations');

  // Fetch email data from MongoDB
  collection.find().toArray(function(err, results) {
    if (err) {
      console.error('error fetching emails:', err);
      return;
    }



    // Loop through the email results
    results.forEach((email) => {
      // Create a transporter object
      let transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 4000,
        secure: false, // or 'STARTTLS'
        auth: {
          user: 'krishnaparmar2003kp@gmail.com',
          pass: 'Krishna_1234'
        }
      });

      // Define the email options
      let mailOptions = {
        from: email.from,
        to: email.to,
        subject: email.subject,
        text: email.text
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Email sent: ' + info.response);
      });
    });

    // Close the MongoDB connection
    client.close();
  })};
