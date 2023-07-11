const mongoose = require('mongoose')
const Owner = require('../models/ownerModel')
const Customer = require('../models/customerModel')
const Booking = require('../models/bookingsModel')
const Property = require('../models/propertiesModel')



/* 
MongoDB Id's for reference
Owner Gaurav: '6443dfb002e346c42ba02212'
Owner Tushar: '6443dfb002e346c42ba02213'
Customer Gaurav: '6443dfb27dc611605f6c6e28'
Customer Tushar: '6443dfb27dc611605f6c6e29'
Gaurav Property 1: '6443dfb27dc611605f6c6e35'
Gaurav Property 2: '6443dfb27dc611605f6c6e36'
Booking1: '6443dfb27dc611605f6c6e45'
Booking2: '6443dfb27dc611605f6c6e46'
*/

const initialOwners = [
    {
        '_id': new mongoose.Types.ObjectId('6443dfb002e346c42ba02212'),
        'name': 'Gaurav',
        'phone': '9558342619',
        'address': 'IIITB',
        'password': '$2a$10$UDGGLBRXE8nHCR1WadpiAOIuaf0w5xMy1SN0Ce6SF7hQe4eXbfd.S'
    },
    {
        '_id': new mongoose.Types.ObjectId('6443dfb002e346c42ba02213'),
        'name': 'Tushar',
        'phone': '9650817131',
        'address': 'IIITB',
        'password': '$2a$10$iXaLSnhgNr2bIu1YbIPlN.c5sL0m7N46/TWv/Kqy3qbTofvNFILQe'
    }
]

const initialCustomers = [
    {
        '_id': new mongoose.Types.ObjectId('6443dfb27dc611605f6c6e28'),
        'name': 'Gaurav',
        'phone': '9558342619',
        'address': 'IIITB',
        'pincode': '390006',
        'password': '$2a$10$UDGGLBRXE8nHCR1WadpiAOIuaf0w5xMy1SN0Ce6SF7hQe4eXbfd.S'
    },
    {
        '_id': new mongoose.Types.ObjectId('6443dfb27dc611605f6c6e29'),
        'name': 'Tushar',
        'phone': '9650817131',
        'address': 'IIITB',
        'pincode': '390006',
        'password': '$2a$10$iXaLSnhgNr2bIu1YbIPlN.c5sL0m7N46/TWv/Kqy3qbTofvNFILQe'
    }
]

const initialProperties = [
    {
        '_id': '6443dfb27dc611605f6c6e35',
        'slots': 5,
        'prop_address': 'Gaurav Property 1',
        'pincode': '390006',
        'owner_id': '6443dfb002e346c42ba02212'
    },
    {
        '_id': '6443dfb27dc611605f6c6e36',
        'slots': 0,
        'prop_address': 'Gaurav Property 2',
        'pincode': '390006',
        'owner_id': '6443dfb002e346c42ba02212'
    }
]

const initialBookings = [
    {
        _id: '6443dfb27dc611605f6c6e45',
        prop_id: '6443dfb27dc611605f6c6e35',
        prop_address: "Gurgaon",
        owner_id: '6443dfb002e346c42ba02212',
        customer_id: '6443dfb27dc611605f6c6e28',
        vehicle_reg_no: '8140',
        in_date: new Date(),
        out_date: null
    },
    {
        _id: '6443dfb27dc611605f6c6e46',
        prop_id: '6443dfb27dc611605f6c6e35',
        prop_address: "Gurgaon",
        owner_id: '6443dfb002e346c42ba02212',
        customer_id: '6443dfb27dc611605f6c6e28',
        vehicle_reg_no: '8145',
        in_date: new Date(),
        out_date: null
    }
]

const loginOwner = {
    'phone': '9558342619',
    'password': 'gaurav'
}

const loginCustomer = {
    'phone': '9558342619',
    'password': 'gaurav'
}

const ownersInDb = async() => {
    const owners = await Owner.find({})
    return owners.map(owner => owner.toJSON())
}

const customersInDb = async() => {
    const customers = await Customer.find({})
    return customers.map(customer => customer.toJSON())
}

module.exports = {
    initialOwners,
    loginOwner,
    ownersInDb,
    initialCustomers,
    loginCustomer,
    customersInDb,
    initialProperties,
    initialBookings,
}