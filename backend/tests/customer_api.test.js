const mongoose = require('mongoose')
const supertest = require('supertest')
const Customer = require('../models/customerModel')
const helper = require('./tests_helper')
const server = require('../server')
const api = supertest(server)

beforeEach(async () => {
    jest.setTimeout(50000)
    await Customer.deleteMany({})
    await Customer.insertMany(helper.initialCustomers)
})

describe('adding a new customer', () => {
    test('Customer is added successfully', async() =>{
        const customer = {
            'name': 'Jay',
            'phone': 'Jay',
            'address': 'IIITB',
            'pincode': '390006',
            'password': 'jay'
        }
    
        await api
                .post('/api/customers')
                .send(customer)
                .expect(201)
                .expect('Content-Type', /application\/json/)

        const customers = await helper.customersInDb()
        expect(customers).toHaveLength(helper.initialCustomers.length + 1)

        const customerNames = customers.map(customer => customer.name)
        expect(customerNames).toContain('Jay')
    })
    
    test('Please add all fields', async() => {
        const customer = {
            'name':'',
            'phone': 'Jayant',
            'address': 'IIITB',
            'pincode': '390006',
            'password': 'jayant'
        }

        await api  
                .post('/api/customers')
                .send(customer)
                .expect(400)
    })

    test('Customer already exists', async() => {
        const customer = {
            'name': 'Gaurav',
            'phone': '9558342619',
            'address': 'IIITB',
            'pincode': '390006',
            'password': 'gaurav'
        }

        await api  
                .post('/api/customers')
                .send(customer)
                .expect(400)
    })
})

describe('Login Customer', () => {
    test('Customer login successfull', async() => {
        await api.
                post('/api/customers/login')
                .send(helper.loginCustomer)
                .expect(200)
                .expect('Content-Type', /application\/json/)
    })

    test('Invalid Credentials', async() => {
        const customer = {
            'phone': '958342619',
            'password': 'gaurav'
        }
        await api.
                post('/api/customers/login')
                .send(customer)
                .expect(400)
    })
    
})

afterAll(() => {
    mongoose.connection.close()
})