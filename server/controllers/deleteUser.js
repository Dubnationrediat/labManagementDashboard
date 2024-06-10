// Use CommonJS syntax for importing if not using ES modules
import connectionInfo from "../schema/db.config.js";
export let deleteProfile = (req, res) => {
    const { user_email } = req.body;

    // Correct SQL DELETE syntax
    let deleteFromUser = `DELETE FROM users WHERE user_email = ?`;
    let deleteFromProfile = `DELETE FROM profile WHERE user_email = ?`;

    connectionInfo.query(deleteFromUser, [user_email], (err, data) => {
        if (err) {
            res.json({
                message: err.message
            });
        } else {
            // Pass the user_email parameter in the second query
            connectionInfo.query(deleteFromProfile, [user_email], (err, data) => {
                if (err) {
                    res.json({
                        message: err.message
                    });
                } else {
                    res.json({
                        message: "Profile deleted successfully"
                    });
                }
            });
        }
    });
};
