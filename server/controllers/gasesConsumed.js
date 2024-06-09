import connectionInfo from "../schema/db.config.js";

export let gasConsumed = async (req, res) => {
    const { gas_cylinders_consumed,gas_id,user_id} = req.body;
// whenver selecting and sending gas for selection, along with it send the gas ID

const isNumberRegex=/^\d+$/;
    if ( !gas_cylinders_consumed || !gas_id) {
        res.json({
            message: "All fields are required"
        });
    }else if(!isNumberRegex.test(gas_cylinders_consumed)){
        res.json({
            message: "Consumed Gas Amount  should contain number value only"
        });
    } else {
        let gasSelect = `SELECT gas_cylinders_amount FROM gases WHERE gas_id = ?`;
        let insertGasConsumed = `INSERT INTO gases_consumed (user_id,gas_id,gas_cylinders_consumed) VALUES (?)`;
        let updateGasAmountInGasTable = `UPDATE gases SET  gas_cylinders_amount = ? WHERE gas_id = ?`;

        connectionInfo.query(gasSelect, [gas_id], (err, data, field) => {
            if (err) {
                console.error("Error selecting gas cylinder:", err.message);
                
                res.json({
                    message: "Unable to find the gas from the main table"
                });
            } else {
                try {
                    let sylinderAmount = parseInt(data[0]?.gas_cylinders_amount);
                    if (sylinderAmount >= gas_cylinders_consumed) {
                        let netAmountLeft = sylinderAmount - gas_cylinders_consumed;
    
                        connectionInfo.query(updateGasAmountInGasTable, [netAmountLeft, gas_id], (err, result) => {
                            if (err) {
                                console.error("Error updating gas amount:", err.message);
                                res.json({
                                    message: "Error updating gas amount"
                                });
                            } else {
                                let valuesForGasConsumed = [ user_id,gas_id,gas_cylinders_consumed];
                                connectionInfo.query(insertGasConsumed, [valuesForGasConsumed], (err, result) => {
                                    if (err) {
                                        console.error("Error inserting consumed gas:", err.message);
                                        res.json({
                                            message: "Error adding consumed gases"
                                        });
                                    } else {
                                        console.log("Consumed gas added");
                                        // Send success response if needed
                                        res.send({
                                            message: "Consumed gas added successfully"
                                        });
                                    }
                                    
                                });
                            }
                        });
                    } else {
                        res.json({
                                message: "Wrong consumption Input,The gas cylinder in store is less than the amount you provide as a consumed gas cylinder"
                        });
                    }
                } catch (error) {
                    res.json({
                        message: "something went wrong please try again"
                });
                }
               
            }
        });
    }

};
