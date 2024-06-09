import connectionInfo from "../schema/db.config.js";
import nodemailer from 'nodemailer';

export let chemcialNotifiyer = (req,res)=>{
    const chemcialAmountQuery = `SELECT * FROM chemicals WHERE chemical_priority='High' AND chemical_amount <= 0`;
    connectionInfo.query(chemcialAmountQuery,(err,data)=>{
        if(err){
            console.log(err.message)
        }else{
            res.json({
                data,
            })
        }
    })
    
};


export let gasNotifiyer = (req,res)=>{
    const chemcialAmountQuery = `SELECT * FROM gases WHERE  gas_cylinders_amount <= 0`;
    connectionInfo.query(chemcialAmountQuery,(err,data)=>{
        if(err){
            console.log(err.message)
        }else{
            res.json({
                data,
            })
        }
    })
};

// in the query make sure this logic for deleting zero value gases and chemicals to run very three days using useEffect

export let zeroGasDelete = (req, res) => {
    const selectAllUsersEmail = 'SELECT user_email FROM users WHERE user_role=0';
    const selectAllGasesWithOne = 'SELECT gas_name FROM gases WHERE gas_cylinders_amount = 1';
    const deleteZeroGasQuery = `DELETE FROM gases WHERE gas_cylinders_amount = 0`;

    // Step 1: Retrieve all user emails with role 0
    connectionInfo.query(selectAllUsersEmail, (err, emails) => {
        if (err) {
            res.json({
                message: "Error on fetching user data for email"
            });
        } else {
            const allEmails = emails.map(email => email.user_email); // Extract emails
              console.log("all emails are " + [allEmails])
            // Step 2: Retrieve gases with cylinder amount equal to one
            connectionInfo.query(selectAllGasesWithOne, (err, gases) => {
                if (err) {
                    res.json({
                        message: "Error on fetching gases data"
                    });
                } else {
                    // If there are gases with one cylinder, send email notification
                    if (gases.length > 0) {
                        sendEmail(gases, allEmails);
                    }

                    // Step 3: Execute the delete query for gases with cylinder amount equal to zero
                    connectionInfo.query(deleteZeroGasQuery, (err, result) => {
                        if (err) {
                            res.json({
                                message: "Error deleting gas cylinders with zero amount"
                            });
                        } else {
                            res.json({
                                message: 'Gas cylinders with zero amount are deleted'
                            });
                        }
                    });
                }
            });
        }
    });
};

// Function to send email notification
function sendEmail(gases, allEmails) {
    let mailSender = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        auth: {
            user: "red.terefe@gmail.com",
            pass: "cvuvlniuqsjgmdbc",
        },
    });

    let gasList = '';
    gases.forEach(gas => {
        gasList += `<tr><td>${gas.gas_name}</td></tr>`;
    });

    let htmlContent = `
<html>
<head>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .container {
            border: 1px solid black;
            padding: 16px;
            width: 50%;
            margin: 20px auto;
            background-color: #fe8402;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            text-align: center;
            font-weight: bold;
            color: #ffffff;
        }
        p {
            font-weight: bold;
            background-color: #fe8402;
            color: #ffffff;
            padding: 10px;
            text-align: center;
            border-radius: 5px;
        }
        /* Apply background color to gas list */
        .gas-item {
            background-color: #516cfo;
            color: #ffffff; /* Set text color to white for better contrast */
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>List of Gases to be Ordered</h2>
        <p>Only one cylinder of the listed gases is found in the store. Kindly order as soon as possible</p>
        <table>
            <tr>
                <th>Gas Name</th>
            </tr>
            <!-- Apply background color to each gas list item -->
            <small class="gas-item">${gasList} </small>
            
        </table>
    </div>
</body>
</html>


    `;

    allEmails.forEach(email => {
        let details = {
            from: "rediat_ta@ch.iitr.ac.in",
            to: email,
            subject: "Notification for gas ordering",
            html: htmlContent
        };

        mailSender.sendMail(details, (err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log("Email sent to: " + email);
            }
        });
    });
}



export let zeroChemcialDelete = (req,res)=>{
     const zeroChemcialDeleteQuery = `DELETE * FROM chemicals WHERE chemical_amount <= 0`
     connectionInfo.query(zeroChemcialDeleteQuery,(err,data)=>{
        if(err){
            res.json({
                message:'something wrong please try again'
            })
        }else{
            if(!data){
                res.json({
                    message:"there is no chemical with zero quantity"
                })
            }
            res.json({
                message:'chemicals with zero  empty are deleted'
            })
        }
     })
};



