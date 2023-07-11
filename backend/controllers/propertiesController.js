const asyncHandler = require('express-async-handler')

const Property = require('../models/propertiesModel')
const Owner = require('../models/ownerModel')

// @desc GET properties..
// @route GET /api/properties
// @access Private

const getPropForCust = asyncHandler(async (req,res) => {
    const custPincode = req.body.pincode;
    const properties = await Property.find({pincode: custPincode})
    const updatedProperties = properties.filter(property => property.slots>0)
    res.status(200).json(updatedProperties)
})

const getProperty = asyncHandler(async (req,res) => {
    const properties = await Property.find({owner_id: req.params.id})
    res.status(200).json(properties)
})

const registerProperty = asyncHandler(async (req,res) => {
    const {owner_id, slots, prop_address, pincode} = req.body
    if(!owner_id || !slots || !prop_address || !pincode) {
        res.status(400)
        throw new Error('Please add all Fields')
    }
    
    const property = await Property.create({
        owner_id,
        slots,
        prop_address,
        pincode
    })
    res.status(201).json(property)
})

const updateProperty = asyncHandler(async (req,res) => { //:id is parameter
    const property = await Property.findById(req.body.id)

    if(!property){
        res.status(400)
        throw new Error('Property not found!')
    }

    const updatedProperty = await Property.findByIdAndUpdate(req.body.id, req.body, {new: true,})

    res.status(200).json({id: `PUT Successful by: ${req.body.id}`})
})

const deleteProperty = asyncHandler(async (req,res) => { //:id is parameter
    const property = await Property.findById(req.params.id)
    if(!property){
        res.status(400)
        throw new Error('Property not found!')
    }
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json({message: `DELETE Successful by: ${req.params.id}`})
})

module.exports = {
    getProperty,
    updateProperty,
    registerProperty,
    deleteProperty,
    getPropForCust
}