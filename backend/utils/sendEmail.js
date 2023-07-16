const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");

module.exports = async (user, mailType) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: "adityaganji889@gmail.com",
        pass: "aybolmnhturpylcr",
      },
    });
    const salt = await bcrypt.genSalt(10);
    const replaceAll = function(match, replace) {
           return replace(new RegExp(match, 'g'), () => replace);
    }
    let encryptedTokenMain = await bcrypt.hash(user._id.toString(),salt)
    let encryptedToken = "";
    for (var i=0; i<encryptedTokenMain.length; i++){
        if(encryptedTokenMain[i]!=='/'){
            encryptedToken+=encryptedTokenMain[i];
        }
        else{
            continue;
        }
    }
    const token = new Token({
      userid: user._id,
      token: encryptedToken,
    });
    await token.save();

    let emailContent, mailOptions;
    if (mailType == "verifyemail") {
      emailContent = `<div><h1>Please click on the below link to verify your email address</h1> <a href="https://mern-expense-tracker-website.onrender.com/verifyemail/${encryptedToken}">${encryptedToken}</a>  </div>`;

      mailOptions = {
        from: "adityaganji889@gmail.com",
        to: user.email,
        subject: "Verify Email For MERN Expense Tracker Auth",
        html: emailContent,
      };
    } else {
      emailContent = `<div><h1>Please click on the below link to reset your password</h1> <a href="https://mern-expense-tracker-website.onrender.com/resetpassword/${encryptedToken}">${encryptedToken}</a>  </div>`;

      mailOptions = {
        from: "adityaganji889@gmail.com",
        to: user.email,
        subject: "Reset password For MERN Expense Tracker Auth",
        html: emailContent,
      };
    }

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};