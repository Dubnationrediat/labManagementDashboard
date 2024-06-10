import connectionInfo from "../schema/db.config.js";

export let chemicalsConsumed = async (req, res) => {
    const {  chemical_id, user_id, amount_consumed } = req.body;
 console.log(req.body)
    const isNumberRegex=/^\d+$/;
    if ( !chemical_id || !user_id || !amount_consumed) {
        res.json({
            message: "All fields are required"
        });
    }else if(!isNumberRegex.test(amount_consumed)){
        res.json({
            message: "Chemical Amount consumed should contain number value only"
        });
    } else {
        let chemicalSelect = `SELECT chemical_amount FROM chemicals WHERE chemical_id = ?`;
        let chemcialInsertQ = `INSERT INTO chemicals_consumed (chemical_id, user_id, amount_consumed) VALUES (?)`;
        let updateChemicalAmountInChemicalTable = `UPDATE chemicals SET chemical_amount = ? WHERE chemical_id = ?`;
        connectionInfo.query(chemicalSelect, [chemical_id], (err, data, field) => {
            if (err) {
             
                res.json({
                    message: "Unable to find the chemical from the main table"
                });
            } else {
                try {
                    let chemicalAmount = parseInt(data[0]?.chemical_amount);
                    if (chemicalAmount >= amount_consumed) {
                        let netAmountLeft = chemicalAmount - amount_consumed;
                        connectionInfo.query(updateChemicalAmountInChemicalTable, [netAmountLeft, chemical_id], (err, result) => {
                            if (err) {
                                res.json({
                                    message: "Error updating chemical amount"
                                });
                            } else {
                                let valuesForChemicalConsumed = [chemical_id, user_id, amount_consumed];
                                connectionInfo.query(chemcialInsertQ, [valuesForChemicalConsumed], (err, result) => {
                                    if (err) {
                                
                                        res.json({
                                            message: "Error adding consumed chemical"
                                        });
                                    } else {
                                    
                                        res.send({
                                            message: "Consumed chemical added successfully"
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        res.json({
                            message: "Wrong consumption Input,The chemical in store is less than the amount you provide as a consumed chemical"
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


