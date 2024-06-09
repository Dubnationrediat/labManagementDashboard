import express from 'express'
import {tableCreation} from '../controllers/tableCreator.js'
import {register} from '../controllers/RegisterControler.js'
import {login} from '../controllers/LoginControler.js'
import {addChemicals}  from '../controllers/addChemical.js'
import {addGas} from '../controllers/addGas.js'
import {chemicalsConsumed}  from '../controllers/chemicalConsumed.js'
import {gasConsumed} from '../controllers/gasesConsumed.js'
import {chemcialNotifiyer,gasNotifiyer,zeroChemcialDelete,zeroGasDelete} from '../middleware/chemialAndGasNotification.js'
import chemicalReceipt from '../middleware/receiptImageForChemical.js'
import gassesReceipt from '../middleware/receiptImageForGasses.js'
export let Route = express.Router()

Route.get('/create-table',tableCreation)
Route.post('/add-user',register)
Route.post("/login",login)
Route.post("/add-chemicals",chemicalReceipt.single("chemicalReceipt_file"),addChemicals)
Route.post("/add-gass",gassesReceipt.single("gassesReceipt_file"),addGas)
Route.post("/chem-consu",chemicalsConsumed)
Route.post("/gas-consu",gasConsumed)
Route.get('/remain-chemcial',chemcialNotifiyer)
Route.get('/remain-gas',gasNotifiyer)
Route.get('/delete-gas',zeroGasDelete)
Route.get('/delete-chemical',zeroChemcialDelete)