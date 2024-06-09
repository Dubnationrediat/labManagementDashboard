import connectionInfo from "../schema/db.config.js";


export let addChemicals = (req, res) => {
    let imageFilePath = req.file ? req.file.path : 'not provided'; 
    console.log(imageFilePath)
    const {
        chemical_name,
        chemical_unit_of_measurement,
        chemical_formula,
        chemical_purity,
        chemical_manufacturer,
        chemical_state,
        chemical_packaging,
        chemical_amount,
        chemical_expire_date,
        chemical_location,
        chemical_ordered_by,
        chemical_priority
    } = req.body;

    if (!chemical_name || !chemical_formula || !chemical_purity || !chemical_manufacturer || !chemical_state || !chemical_packaging || !chemical_amount || !chemical_expire_date || !chemical_location || !chemical_ordered_by || !chemical_priority || !chemical_unit_of_measurement) {
        res.status(400).send({
            message: "All input fields are required"
        });
    } else {
        const isStringRegex = /^[A-Za-z\s]+$/;
        const isNumberRegex = /^\d+$/;
        const monthAndYear = /^(0[1-9]|1[0-2])\/\d{4}$/

        if (!isStringRegex.test(chemical_name) || !isStringRegex.test(chemical_ordered_by)) {
            res.json({
                message: "Chemical name or Chemical ordered by fields should only contain alphabets"
            });
        } else if (!isNumberRegex.test(chemical_amount)) {
            res.json({
                message: "Chemical amount field should only contain number"
            });
        } else if (!isNumberRegex.test(chemical_purity)) {
            res.json({
                message: "Chemical purity field should only contain number"
            });
        } else if (!monthAndYear.test(chemical_expire_date)) {
            res.json({
                message: "Please check your expire date input ,Chemical expire date should be passed like 06/2024 '06' representing the month '/' to separate and '2024' the year"
            });
        } else {
            let insertChemicalQuery = `INSERT INTO chemicals(chemical_name, chemical_formula, chemical_purity, chemical_manufacturer, chemical_state, chemical_packaging, chemical_amount, chemical_expire_date, chemical_location, chemical_ordered_by, chemical_bill_path,chemical_unit_of_measurement,chemical_priority) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;
            let values = [chemical_name, chemical_formula, chemical_purity, chemical_manufacturer, chemical_state, chemical_packaging, chemical_amount, chemical_expire_date, chemical_location, chemical_ordered_by, imageFilePath, chemical_unit_of_measurement, chemical_priority];

            connectionInfo.query(insertChemicalQuery, values, (err) => {
                if (err) {
                    console.log(err.message);
                    res.status(500).send({
                        message: "something wrong while adding chemical, please try again"
                    });
                } else {
                    res.send({
                        messageToTheFront: 'New Chemical added successfully',
                        navigation: '/home',
                        messageToUser: 'Click here for home page',
                    });
                }
            });
        }
    }
};
