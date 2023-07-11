const mongoose = require('mongoose')

const ownerSchema = mongoose.Schema({
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
    password: {
        type: String,
        required: [true, 'Please add a password']
    }
})

module.exports = mongoose.model('Owner', ownerSchema)