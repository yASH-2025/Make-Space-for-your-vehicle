const express = require('express');
const router = express.Router();

const { getProperty, registerProperty, updateProperty, deleteProperty, getPropForCust } = require('../controllers/propertiesController')

router.post('/', registerProperty)

router.get('/get/:id', getProperty)

router.put('/update', updateProperty)

router.delete('/delete/:id', deleteProperty);

router.post('/getPropCust', getPropForCust)

module.exports = router