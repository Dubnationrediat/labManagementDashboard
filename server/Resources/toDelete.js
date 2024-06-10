// import connectionInfo from '../schema/db.config.js';
// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// export let deleteChemicalImage = (req, res) => {
//     let chemicalID = req.params.chemical_id;

//     let deleteImage = `DELETE FROM chemicals WHERE chemical_id=${chemicalID}`;
//     let getPath = `SELECT chemical_bill_path FROM chemicals WHERE chemical_id=${chemicalID}`;

//     connectionInfo.query(getPath, (err, data, field) => {
//         if (err) {
//             console.log(err.message);
//             return res.status(500).json({ message: 'Error querying database' });
//         } else {
//             let billPath = data[0]?.chemical_bill_path;
//             if(billPath ==="not provided"){
//               connectionInfo.query(deleteImage, (err, data, field) => {
//                 if (err) {
//                     console.log(err.message);
//                     return res.status(500).json({ message: 'Error deleting data from database' });
//                 }
//                 return res.json({
//                     message: 'Data deleted successfully',
//                     redirect: '/home',
//                     redirectMessage: 'Click here to go to home page'
//                 });
//             });
//             }else{
//               if (!billPath) {
//                 return res.status(404).json({ message: 'Bill path not found in database' });
//             }
  
//             const fileName = path.basename(billPath);
         
//             const deleteFilePath = path.join(__dirname, '..', 'Resources', 'chemicalBills', fileName);
  
//             fs.unlink(deleteFilePath, (err) => {
//                 if (err) {
//                     console.log(err);
//                     return res.status(500).json({ message: 'Error deleting file', error: err.message });
//                 }
  
//                 connectionInfo.query(deleteImage, (err, data, field) => {
//                     if (err) {
//                         console.log(err.message);
//                         return res.status(500).json({ message: 'Error deleting data from database' });
//                     }
  
//                     return res.json({
//                         message: 'Data deleted successfully',
//                         redirect: '/home',
//                         redirectMessage: 'Click here to go to home page'
//                     });
//                 });
//             });
//             }
//         }
//     });
// };

// export let deleteGasImage = (req, res) => {
//   let chemicalID = req.params.gas_id;

//   let deleteImage = `DELETE FROM gases WHERE gas_id=${chemicalID}`;
//   let getPath = `SELECT gas_bill_path FROM gases WHERE gas_id=${chemicalID}`;

//   connectionInfo.query(getPath, (err, data, field) => {
//       if (err) {
//           console.log(err.message);
//           return res.status(500).json({ message: 'Error querying database' });
//       } else {
//           let billPath = data[0]?.gas_bill_path;
//           if(billPath ==="not provided"){
//             connectionInfo.query(deleteImage, (err, data, field) => {
//               if (err) {
//                   console.log(err.message);
//                   return res.status(500).json({ message: 'Error deleting data from database' });
//               }

//               return res.json({
//                   message: 'Data deleted successfully',
//                   redirect: '/home',
//                   redirectMessage: 'Click here to go to home page'
//               });
//           });
//           }else{
//             if (!billPath) {
//               return res.status(404).json({ message: 'Bill path not found in database' });
//           }

//           const fileName = path.basename(billPath);
       
//           const deleteFilePath = path.join(__dirname, '..', 'Resources', 'gasBills', fileName);

//           fs.unlink(deleteFilePath, (err) => {
//               if (err) {
//                   console.log(err);
//                   return res.status(500).json({ message: 'Error deleting file', error: err.message });
//               }

//               connectionInfo.query(deleteImage, (err, data, field) => {
//                   if (err) {
//                       console.log(err.message);
//                       return res.status(500).json({ message: 'Error deleting data from database' });
//                   }

//                   return res.json({
//                       message: 'Data deleted successfully',
//                       redirect: '/home',
//                       redirectMessage: 'Click here to go to home page'
//                   });
//               });
//           });
//           }


//       }
//   });
// };



// export let deleteConsumableImage = (req, res) => {
//   let consumable_ID = req.params.consumables_id;

//   let deleteImage = `DELETE FROM consumables WHERE consumables_id=${consumable_ID}`;
//   let ConsumablePath = `SELECT Picture_location FROM consumables WHERE consumables_id=${consumable_ID}`;

//   connectionInfo.query(ConsumablePath, (err, data, field) => {
//       if (err) {
//           console.log(err.message);
//           return res.status(500).json({ message: 'Error querying database' });
//       } else {
//           let billPath = data[0]?.Picture_location;
//           if(billPath ==="not provided"){
//             connectionInfo.query(deleteImage, (err, data, field) => {
//               if (err) {
//                   console.log(err.message);
//                   return res.status(500).json({ message: 'Error deleting data from database' });
//               }

//               return res.json({
//                   message: 'Data deleted successfully',
//                   redirect: '/home',
//                   redirectMessage: 'Click here to go to home page'
//               });
//           });
//           }else{
//             if (!billPath) {
//               return res.status(404).json({ message: 'Bill path not found in database' });
//           }

//           const fileName = path.basename(billPath);
       
//           const deleteFilePath = path.join(__dirname, '..', 'Resources', 'consumables', fileName);

//           fs.unlink(deleteFilePath, (err) => {
//               if (err) {
//                   console.log(err);
//                   return res.status(500).json({ message: 'Error deleting file', error: err.message });
//               }

//               connectionInfo.query(deleteImage, (err, data, field) => {
//                   if (err) {
//                       console.log(err.message);
//                       return res.status(500).json({ message: 'Error deleting data from database' });
//                   }

//                   return res.json({
//                       message: 'Data deleted successfully',
//                       redirect: '/home',
//                       redirectMessage: 'Click here to go to home page'
//                   });
//               });
//           });
//           }
         
//       }
//   });
// };


import connectionInfo from '../schema/db.config.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Generic function to handle deletion
const deleteImageAndData = (req, res, table, idColumn, pathColumn, folderName) => {
    const itemId = req.params[idColumn];
    const getPathQuery = `SELECT ${pathColumn} FROM ${table} WHERE ${idColumn}=${itemId}`;
    const deleteDataQuery = `DELETE FROM ${table} WHERE ${idColumn}=${itemId}`;

    connectionInfo.query(getPathQuery, (err, data) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ message: 'Error querying database' });
        }

        const billPath = data[0]?.[pathColumn];
        if (billPath === "not provided") {
            connectionInfo.query(deleteDataQuery, (err) => {
                if (err) {
                    console.log(err.message);
                    return res.status(500).json({ message: 'Error deleting data from database' });
                }
                return res.json({
                    message: 'Data deleted successfully',
                    redirect: '/home',
                    redirectMessage: 'Click here to go to home page'
                });
            });
        } else {
            if (!billPath) {
                return res.status(404).json({ message: 'Bill path not found in database' });
            }

            const fileName = path.basename(billPath);
            const deleteFilePath = path.join(__dirname, '..', 'Resources', folderName, fileName);

            fs.unlink(deleteFilePath, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: 'Error deleting file', error: err.message });
                }

                connectionInfo.query(deleteDataQuery, (err) => {
                    if (err) {
                        console.log(err.message);
                        return res.status(500).json({ message: 'Error deleting data from database' });
                    }
                    return res.json({
                        message: 'Data deleted successfully',
                        redirect: '/home',
                        redirectMessage: 'Click here to go to home page'
                    });
                });
            });
        }
    });
};

// Controller functions
export let deleteChemicalImage = (req, res) => {
    deleteImageAndData(req, res, 'chemicals', 'chemical_id', 'chemical_bill_path', 'chemicalBills');
};

export let deleteGasImage = (req, res) => {
    deleteImageAndData(req, res, 'gases', 'gas_id', 'gas_bill_path', 'gasBills');
};

export let deleteConsumableImage = (req, res) => {
    deleteImageAndData(req, res, 'consumables', 'consumables_id', 'Picture_location', 'consumables');
};
