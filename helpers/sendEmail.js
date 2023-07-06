const nodemailer = require("nodemailer")
require("dotenv").config();

const {GMAIL_PASSWORD} = process.env;

const nodemailerConfig = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    secureConnection: false,
   
    auth :{
       user:"zherebetska11@gmail.com",
       pass:GMAIL_PASSWORD
    },
    tls: {
        rejectUnAuthorized: true,
      },
}

const transport = nodemailer.createTransport(nodemailerConfig)

const sendEmail = async (data) => {
    const email = { ...data, from: "zherebetska11@gmail.com" };
    await transport.sendMail(email);
  
    return true;
  };

module.exports = sendEmail