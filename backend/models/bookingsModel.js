const mongoose = require('mongoose')

const bookingsSchema = mongoose.Schema({
        owner_id: {
            type: String,
            required: [true, 'Please add ownerId']
        },
        prop_id: {
            type: String,
            required: [true, 'Please add propId']
        },
        prop_address: {
            type: String,
            required: [true, 'Please add property address']
        },
        customer_id: {
            type: String,
            required: [true, 'Please add customerId']
        },
        vehicle_reg_no: {
            type: String,
            required: [true, 'Please add vehicleRegNo']
        },
        in_date: {
            type: Date,
        },
        out_date: {
            type: Date,
        },
        price: {
            type: String,
        }
    }
)

module.exports = mongoose.model('bookings', bookingsSchema);