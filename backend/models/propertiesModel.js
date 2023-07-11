const mongoose = require('mongoose')
const Owner = require('./ownerModel')
Schema = mongoose.Schema
//Schema
const propertiesSchema = mongoose.Schema({
        slots: {
            type: Number,
            required: [true, 'Please add number of slots available in your property']
        },
        prop_address: {
            type: String,
            required: [true, 'Please add address of property']
        },
        pincode: {
            type: String,
            required: [true, 'Please add pincode of property']
        },
        owner_id: {
            type: String,
            required: true,
        }
    },
)

module.exports = mongoose.model('Properties', propertiesSchema);