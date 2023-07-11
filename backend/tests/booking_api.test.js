const mongoose = require('mongoose')
const supertest = require('supertest')
const Property = require('../models/propertiesModel')
const Customer = require('../models/customerModel')
const Owner = require('../models/ownerModel')
const Booking = require('../models/bookingsModel')
const helper = require('./tests_helper')
const server = require('../server')
const api = supertest(server)

beforeEach(async () => {
    jest.setTimeout(50000)
    await Customer.deleteMany({})
    await Customer.insertMany(helper.initialCustomers)
    await Property.deleteMany({})
    await Property.insertMany(helper.initialProperties)
    await Owner.deleteMany({})
    await Owner.insertMany(helper.initialOwners)
    await Booking.deleteMany({})
    await Booking.insertMany(helper.initialBookings)
})

describe('Get Bookings', () => {
    test('Get ongoing bookings a customer', async() =>{
        const customer_id= '6443dfb27dc611605f6c6e28';
        await api
                .post('/api/bookings/currentBooking')
                .send({customer_id})
                .expect(200)
                .expect('Content-Type', /application\/json/)
    })
})

describe('Add a new booking', () =>{
    test('Customer booking successful', async() =>{
        const booking = {
            prop_id: '6443dfb27dc611605f6c6e35',
            prop_address: "Gurgaon",
            owner_id: '6443dfb002e346c42ba02212',
            customer_id: '6443dfb27dc611605f6c6e28',
            vehicle_reg_no: '8143'
        }
        await api
                .post('/api/bookings/newBooking')
                .send(booking)
                .expect(200)
                .expect('Content-Type', /application\/json/)
    })
    test('Please add all fields', async() =>{
        const booking = {
            owner_id: '6443dfb002e346c42ba02212',
            customer_id: '6443dfb27dc611605f6c6e28',
            vehicle_reg_no: '8142'
        }
        await api
                .post('/api/bookings/newBooking')
                .send(booking)
                .expect(400)
    })
    test('No slots available', async() =>{
        const booking = {
            prop_id: '6443dfb27dc611605f6c6e36',
            prop_address: "Gurgaon",
            owner_id: '6443dfb002e346c42ba02212',
            customer_id: '6443dfb27dc611605f6c6e28',
            vehicle_reg_no: '8141'
        }
        await api
                .post('/api/bookings/newBooking')
                .send(booking)
                .expect(400)
    })
})

describe('End booking', () =>{
    test('End booking successful', async() =>{
        // const vehicle_reg_no = '8145'
        const _id = '6443dfb27dc611605f6c6e45'

        await api
                .put('/api/bookings/out')
                .send({_id})
                .expect(200)
    })

    test('Booking not found', async() =>{
        const vehicle_reg_no = '8148'
        await api
                .put('/api/bookings/out')
                .send({vehicle_reg_no})
                .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})