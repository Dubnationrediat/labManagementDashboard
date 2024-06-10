import connectionInfo from "../schema/db.config.js";

 export let consumables = (req,res)=>{
    let imageFilePath = req.file? req.file.path :'not provided'
    const {user_id,consumable_name,consumable_location}= req.body;
 
    if( !consumable_name || !consumable_location){
        res.status(400).json({
            message: "All input fields are required"
        });
    }else {
        const isStringRegex = /^[A-Za-z\s]+$/;
        if(!isStringRegex.test(consumable_name)){
            res.json({
                message: "Consumable name  fields should only contain alphabets"
            });
        }else{
                let insertConsumables = `INSERT INTO consumables (user_id,consumable_name,consumable_location,Picture_location) VALUES (?,?,?,?)`
                
                let values =[user_id,consumable_name,consumable_location,imageFilePath,] 

                connectionInfo.query(insertConsumables,values,(err,data)=>{
                    if(err){
                        res.json({
                            message: err.message
                        })
                    }else{
                        res.json({
                            message:"consumable item added successfully"
                        })
                    }
                        
                })
        }
    }
    





}


export let deleteConsumables = (req,res)=>{
    const {consumables_id} =req.body
    let deleteConsumables = `DELETE * FROM consumables WHERE consumables_id =?`
    let value = [consumables_id]
    connectionInfo.query(deleteConsumables,(err,data)=>{
        if(err){
            res.json({
               message:"Internal server error"
            })
        }else{
            res.json({
            message :"consumable item with deleted successful"
        })
        }
    })



}