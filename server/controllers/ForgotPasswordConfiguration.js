import connectionInfo from '../schema/db.config.js'
import {decrypt,encrypt} from '../middleware//IncriptionDicripitonLogic.js'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
 export let forgetPassword = (req,res)=>{
     const {user_email} = req.body;
     let emailFromDB = `SELECT user_email,user_id FROM users WHERE user_email = ?`
     let decryptEntry = `UPDATE users SET user_password_update = ? WHERE user_email = ?`
     connectionInfo.query(emailFromDB,[user_email],(err,data)=>{
         if(err){
            res.json({
                message : 'Internal server error'
            })
         }else{
            if(!data || data){
                const user_id = toString(data[0]?.user_id)
                const encryptedData = encrypt(user_id)
      connectionInfo.query(decryptEntry,[encryptedData,user_email],(err,data)=>{
                  console.log('decryptedData added')
      })   
             let  linkToBeSentToUser  =`http://localhost:7500/password-confirm/${encryptedData.iv}/${encryptedData.content}`;
             sendEmail(user_email,linkToBeSentToUser)
      
             res.json({
                message : "Update link has been sent to your email"
             })
            }
         }
     })

     function sendEmail(email, updateLink) {
        let mailSender = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            auth: {
                user: "red.terefe@gmail.com",
                pass: "cvuvlniuqsjgmdbc",
            },
        });
    
        let htmlContent = `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verification Email</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f6f6f6;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    border: 1px solid #cccccc; /* Add border to the container */
                }
                .header {
                    text-align: center;
                    padding: 10px 0;
                }
                .header img {
                    max-width: 100px;
                }
                .content {
                    text-align: center;
                    padding: 20px;
                }
                .cta-button {
                    display: inline-block;
                    padding: 15px 25px;
                    color:black;
                    margin: 20px 0;
                    background-color: #d3d3d3; /* Light gray color */
                    font-weight: bold; /* Bold text */
                    text-decoration: none;
                    border-radius: 5px;
                }
                .footer {
                    text-align: center;
                    padding: 10px 0;
                    font-size: 12px;
                    color: #777777;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" fill="#007BFF"/>
                <text x="50" y="60" font-family="Arial, sans-serif" font-size="60" font-weight="bold" fill="#ffffff" text-anchor="middle" alignment-baseline="middle">Engineering of Catalyst And Reaction Kinetics Research Lab</text>
              </svg>
                </div>
                <div class="content">
                    <h1>Click the button below to change password</h1>
                   
                    <a href="${updateLink}" class="cta-button">Click For Update Password</a>
                    
                 
                </div>
                <div class="footer">
                    <p>If you did not sign up for this account, please ignore this email.</p>
                </div>
            </div>
        </body>
        </html>
        `;
            let details = {
                from: "rediat_ta@ch.iitr.ac.in",
                to: email,
                subject: "Update Password",
                html: htmlContent
            };
    
            mailSender.sendMail(details, (err) => {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log("Email sent to: " + email);
                }
            });
    }
 }




 export let confirmation =(req,res)=>{
    const {iv,content}= req.params
    const {user_password} =req.body
    console.log(iv,content,user_password)
    let encryptedData = {
        iv,
        content,
    }
    const salt = bcrypt.genSaltSync()
    let  hashPassword = bcrypt.hashSync(user_password,salt)
console.log("previous password" ,"$2b$10$7Rc.Nu.NmZKltwGyS1il7.BN0ayQ8uVkE9a1EpU3JUpu5K2ROqsme")
console.log("updated password" ,hashPassword)

     let decryptedValue = decrypt(encryptedData)
    let GetDecrypted = `UPDATE users SET user_password=?  WHERE user_id =? `
    connectionInfo.query(GetDecrypted,[hashPassword ,decryptedValue],(err,data)=>{
        if(err){
            res.json({
                err:err.message
            })
        }
         res.json({
            message:"Password Updated Successfully"
         })
      })                
 }


