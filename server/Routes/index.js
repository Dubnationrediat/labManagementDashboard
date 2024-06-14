import express from 'express'
import {tableCreation} from '../controllers/tableCreator.js'
import {register} from '../controllers/RegisterControler.js'
import {login} from '../controllers/LoginControler.js'
import {addChemicals}  from '../controllers/addChemical.js'
import {addGas} from '../controllers/addGas.js'
import {chemicalsConsumed}  from '../controllers/chemicalConsumed.js'
import {gasConsumed} from '../controllers/gasesConsumed.js'
import {chemcialNotifiyer,gasNotifiyer,zeroGasDelete} from '../middleware/chemialAndGasNotification.js'
import {consumables,deleteConsumables} from '../controllers//consumablesRegisteration.js'
import createImageUploader from '../middleware/ImageUploader.js'
import { deleteChemicalImage,deleteGasImage,deleteConsumableImage } from '../Resources/toDelete.js'
import {deleteProfile} from '../controllers/deleteUser.js'
const chemicalUploader = createImageUploader('./Resources/chemicalBills');
const gasUploader = createImageUploader('./Resources/gasBills');
const consumableUploader = createImageUploader('./Resources/consumables');
import {forgetPassword,confirmation} from '../controllers/ForgotPasswordConfiguration.js'

export let Route = express.Router()

Route.get('/create-table',tableCreation)
Route.post('/add-user',register)
Route.post("/login",login)
Route.post("/add-chemicals",chemicalUploader.single("chemicalReceipt_file"),addChemicals)
Route.post("/add-gas",gasUploader.single("gassesReceipt_file"),addGas)
Route.post("/add-consumables",consumableUploader.single("consumable_file"),consumables)
Route.post("/chem-consu",chemicalsConsumed)
Route.post("/gas-consu",gasConsumed)
Route.get('/remain-chemcial',chemcialNotifiyer)
Route.get('/remain-gas',gasNotifiyer)
Route.get('/delete-gas',zeroGasDelete)
Route.get('/delete-chemical/:chemical_id',deleteChemicalImage)
Route.get('/delete-gas/:gas_id',deleteGasImage)
Route.get('/delete-consumables/:consumables_id',deleteConsumableImage)
Route.get('/deleteProfile',deleteProfile)
Route.post('/update-Password',forgetPassword)
Route.post('/password-confirm/:iv/:content',confirmation)


