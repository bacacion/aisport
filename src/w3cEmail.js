var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dingnew01@gmail.com',
    pass: 'tcvlddrxsfirophr'
    // pass: 'fhqcqbwnvkrsvdqe'
  }
});

// var mailOptions = {
//   from: 'dingnew01@gmail.com',
//   to: 'b0227390004@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };
function sendEmail(to,subject,text){
    const mailOptions={}
    mailOptions.to = to;
    mailOptions.subject =subject
    mailOptions.text =text
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
};
module.exports = sendEmail;
