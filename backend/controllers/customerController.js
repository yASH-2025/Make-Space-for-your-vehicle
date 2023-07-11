const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Customer = require('../models/customerModel')
const jwt = require('jsonwebtoken')

const registerCustomer = asyncHandler(async(req, res) => {
    const {name, phone, address, pincode, password} = req.body

    if(!name || !phone || !address || !password || !pincode) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const customerExists = await Customer.findOne({phone})

    if(customerExists) {
        res.status(400)
        throw new Error('Customer already Exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const customer = await Customer.create({
        name: name,
        phone: phone,
        address: address,
        // vehicle: vehicle,
        password: hashedPassword,
        pincode: pincode
    })
    
    if(customer) {
        res.status(201).json({
            _id: customer.id,
            name: customer.name,
            phone: customer.phone,
            address: customer.address,
            // vehicle: customer.vehicle,
            pincode: customer.pincode
        })
    } else {
        res.status(400)
        throw new Error('Invalid customer Data')
    }
})

const loginCustomer = asyncHandler(async(req, res) => {
    const {phone, password} = req.body
    const customer = await Customer.findOne({phone})

    if(customer && (await bcrypt.compare(password, customer.password))) {
        const token = jwt.sign({phone: customer.phone}, 'secret')
        res.json({
            _id: customer.id,
            name: customer.name,
            phone: customer.phone,
            address: customer.address,
            // vehicle: customer.vehicle,
            pincode: customer.pincode,
            token
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

const getCustomer = asyncHandler(async(req, res) => {
    const {phone} = req.body
    const customer = await Customer.findOne({phone})

    if(customer) {
        res.json({
            _id: customer.id,
            name: customer.name,
            phone: customer.phone,
            address: customer.address,
            // vehicle: customer.vehicle,
            pincode: customer.pincode
        })
    } else {
        res.status(400)
        throw new Error('Customer doesnot exist')
    }
})


module.exports = {
    registerCustomer,
    loginCustomer,
    getCustomer,
}