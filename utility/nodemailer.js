const nodemailer=require('nodemailer');
//const {nodemailer_passkey}=require('./secrets');
//https-443 http 8080
//userObj-> name email password
module.exports.sendMail=async function sendMail(str,data){
    let transporter=nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,//true for 465,false for other ports
        auth:{
            user:'py1346792580@gmail.com',//generated ethereal user
            pass: "mmfngrnvlqqahent", //generated ethereal password
        },
    });

    var Osubject,Otext,Ohtml;
    if(str=="signup"){
        Osubject=`Thank you for signing ${data.name}`;
        Ohtml=`
        <h1>Welcome to TheFreshFarmers.com</h1>
        Hope you have a good time!
        Here are your deatails-
        Name-${data.name}
        Email-${data.email}
        `
    }
    else if(str=="resetpassword"){
        Osubject=`Reset Password`;
        Ohtml=`
        <h1>TheFreshFarmers.com</h1>
        Here is your link to reset your password!
        ${data.resetPasswordLink}
        `
    }

    let info=await transporter.sendMail({
        from:'"The Fresh Farmers" <py1346792580@gmail.com>',//sender address <${userObj.email}>
        to:data.email, //list of recevers
        subject:Osubject, //subject line
        //plain text body
        html:Ohtml, //html body
    });
    console.log("Messsage sent:%s",info.messageId);
};