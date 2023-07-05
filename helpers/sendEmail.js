const nodemailer = require("nodemailer")
require("dotenv").config();

const {GMAIL_PASSWORD} = process.env;

const nodemailerConfig = {
    host:"smtp.gmail.com",
    port:587,
    secure: true,
    auth :{
       user:"zherebetska11@gmail.com",
       pass:GMAIL_PASSWORD
    }
}

const transport = nodemailer.createTransport(nodemailerConfig)

const sendEmail = async (data) => {
    const email = { ...data, from: "alagrisenko3@gmail.com" };
    await transport.sendMail(email);
  
    return true;
  };

module.exports = sendEmail