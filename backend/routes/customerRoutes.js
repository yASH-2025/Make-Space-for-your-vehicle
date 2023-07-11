const express = require('express')
const router = express.Router()
const {registerCustomer, loginCustomer, getCustomer} = require('../controllers/customerController')

router.post('/', registerCustomer)
router.post('/login', loginCustomer)
router.post('/getCustomer', getCustomer)

module.exports = router