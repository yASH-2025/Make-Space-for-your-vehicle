const mongoose = require('mongoose')
const supertest = require('supertest')
const Property = require('../models/propertiesModel')
const Owner = require('../models/ownerModel')
const helper = require('./tests_helper')
const server = require('../server')
const api = supertest(server)

beforeEach(async () => {
    jest.setTimeout(50000)
    await Owner.deleteMany({})
    await Owner.insertMany(helper.initialOwners)
    await Property.deleteMany({})
    await Property.insertMany(helper.initialProperties)
})

describe('Adding new Property', () => {
    test('Property is added successfully', async() =>{
        const property = {
            'prop_address': 'Gaurav Property 3',
            'owner_id': '6443dfb002e346c42ba02212',
            'slots': 5,
            'pincode': '390006'
        }
    
        await api
                .post('/api/properties')
                .send(property)
                .expect(201)
                .expect('Content-Type', /application\/json/)
    })
    test('Please add all fields', async() =>{
        const property = {
            'prop_address': 'Gaurav Property 4',
            'owner_id': '6443dfb002e346c42ba02212',
            'slots': 0,
            'pincode': '390006'
        }
    
        await api
                .post('/api/properties')
                .send(property)
                .expect(400)
    })
})

describe('Get Properties', () => {
    test('Get all properties of an owner', async() =>{
        const owner_id = '6443dfb002e346c42ba02212'
        await api
                .get(`/api/properties/get/${owner_id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
    })
    test('Get properties for a customer', async() =>{
        const pincode = '390006'
        await api
                .post(`/api/properties/getPropCust`)
                .send(pincode)
                .expect(200)
                .expect('Content-Type', /application\/json/)
    })
})

describe('Delete Property', () => {
    test('Delete Existing Property', async() =>{
        const id = '6443dfb27dc611605f6c6e36'
        await api
                .delete(`/api/properties/delete/${id}`)
                .expect(200)
    })
    test('Delete Not Existing Property', async() =>{
        const id = '6443dfb27dc611605f6c6e37'
        await api
                .delete(`/api/properties/delete/${id}`)
                .expect(400)
    })
})


afterAll(() => {
    mongoose.connection.close()
})