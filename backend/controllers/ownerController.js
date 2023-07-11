const bcrypt = require('bcryptjs')
const path = require('path')
const asyncHandler = require('express-async-handler')
const Owner = require('../models/ownerModel')
const jwt = require('jsonwebtoken')

const registerOwner = asyncHandler(async(req, res) => {
    const {name, phone, address, password} = req.body

    if(!name || !phone || !address || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const ownerExists = await Owner.findOne({phone})

    if(ownerExists) {
        res.status(400)
        throw new Error('Owner already Exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const owner = await Owner.create({
        name,
        phone,
        address,
        password: hashedPassword
    })

    if(owner) {
        res.status(201).json({
            _id: owner.id,
            name: owner.name,
            phone: owner.phone,
            address: owner.address
        })
    } else {
        res.status(400)
        throw new Error('Invalid owner Data')
    }
})

const loginOwner = asyncHandler(async(req, res) => {
    const {phone, password} = req.body
    const owner = await Owner.findOne({phone})

    if(owner && (await bcrypt.compare(password, owner.password))) {
        const token = jwt.sign({phone: owner.phone}, 'secret')
        console.log(token)
        res.status(200).json({
            _id: owner.id,
            name: owner.name,
            phone: owner.phone,
            address: owner.address,
            token
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

const getOwner = asyncHandler(async(req, res) => {
    const phone = req.params.phone
    console.log(phone)
    const owner = await Owner.findOne({phone})

    if(owner) {
        res.json({
            _id: owner.id,
            name: owner.name,
            phone: owner.phone,
            address: owner.address
        })
    } else {
        res.status(400)
        throw new Error('Owner doesnot exist')
    }
})


module.exports = {
    registerOwner,
    loginOwner,
    getOwner,
}