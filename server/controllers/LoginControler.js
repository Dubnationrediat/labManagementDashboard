import connectionInfo from "../schema/db.config.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export let login = (req, res) => {
    const { email, password } = req.body;
    const isEmail =/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    const isPassword =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?!.*\s).{8,}$/

    // Validator
    if (!email || !password) {
        res.send({
            message: "All fields are required"
        });
    }else if(!isEmail.test(email)){
        res.send({
            message: "invalid email"
        });
    }else if(!isPassword){
        res.send({
            message: "invalid passwrod. password should contain at list eight character containing at list one upper case, one lower case, one number ,and one special character."
        });
    } else {
        let userChecker = `SELECT user_email, user_password, user_id, user_first_name FROM users WHERE user_email = '${email}'`;

        connectionInfo.query(userChecker, (err, result, fields) => {
            if (err) {
                console.log(err.message);
                res.status(500).send({
                    messageToTheFront: "Internal server error"
                });
            } else {
                if (result.length === 0) {
                    res.send({
                        messageToTheFront: "wrong cridential, please try again...",
                        messageToUser: "Click here to sign up",
                        navigation: "/signup"
                    });
                } else {
                    const userData = result[0];
                    const compare = bcrypt.compareSync(password, userData.user_password);
                    if (!compare) {
                        res.send({
                            messageToTheFront: "wrong credential, please try again...",
                            messageToUser: "Click here to sign up",
                            navigation: "/signup"
                        });
                    } else {
                        const accessToken = jwt.sign({ id: userData.user_id, display_name: userData.user_first_name }, process.env.JWT_SECRET, { expiresIn: "30d" });
                        const refreshToken = jwt.sign({ id: userData.user_id }, process.env.REFRESH_TOKEN_SECRET);
                        
                        // Set refresh token in a secure HTTP-only cookie
                        res.cookie('refreshToken', refreshToken, { httpOnly: true });
                        
                        res.send({
                            token: accessToken,
                            messageToTheFront: "Login successful"
                        });
                    }
                }
            }
        });
    }
};




















// import connectionInfo from "../schema/db.config.js"
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// export let login = (req,res)=>{
//     const {email,password}=req.body
//     // *validator
//     if(!email || !password){
//         res.send({
//             message : "all fields are required"
//         })
//     }else{
//         let userChecker = `SELECT user_email from users `
//         let forPasswordCheck = `SELECT user_password,user_id from users WHERE user_email = '${email}'`
//         connectionInfo.query(userChecker,(err,data,fields)=>{
//             if(err){
//                 console.log(err.message)
//             }else{
//                   if(data){
//                     let resultFilter = data.find((emails)=>{
//                         return  emails.user_email ===email
//                     })
//                    if(resultFilter){
//                         connectionInfo.query(forPasswordCheck,(err,result,filed)=>{
//                             if(err){
//                                 console.log(err.message)
//                             }else{
//                                 let compare = bcrypt.compareSync(password,result[0].user_password)
//                                 if(!compare){
//                                     res.send({
//                                         messageToTheFront :"password not correct please try again", 
//                                         messageToUser:"click here for login",
//                                         navigation: "/login",
//                                     })
//                                 }else{
//                                      const token = jwt.sign({id:result[0].user_id,  display_name:result[0].user_first_name},process.env.JWT_SECRET,{expiresIn:"30d"})                               
//                                      res.send({
//                                          token,
//                                      })
//                                 }
//                             }
//                         })
//                    }else{
//                     res.send({
//                         messageToTheFront :"no registered user by this credential please sign up", 
//                         messageToUser:"click here for login",
//                         navigation: "/signup"
//                     })
//                    }
//                   }
//             }
//         })
//     }
// }




