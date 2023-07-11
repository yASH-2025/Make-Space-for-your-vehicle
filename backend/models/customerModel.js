const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number'],
        unique: true
    },
    address: {
        type: String,
        required: [true, 'Please add your address']
    },
    pincode: {
        type: String,
        required: [true, 'Please add your address pincode']
    },
    // vehicle: {
    //     type: String,
    //     required: [true, 'Please add a vehicle number']
    // },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }
})

module.exports = mongoose.model('Customer', customerSchema)