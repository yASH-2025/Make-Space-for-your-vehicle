const mongoose = require('mongoose')
const supertest = require('supertest')
const Owner = require('../models/ownerModel')
const helper = require('./tests_helper')
const server = require('../server')
const api = supertest(server)

beforeEach(async () => {
    jest.setTimeout(50000)
    await Owner.deleteMany({})
    await Owner.insertMany(helper.initialOwners)
})

describe('adding a new owner', () => {
    test('Owner is added successfully', async() =>{
        const owner = {
            'name': 'Jay',
            'phone': 'Jay',
            'address': 'IIITB',
            'password': 'jay'
        }
    
        await api
                .post('/api/owners')
                .send(owner)
                .expect(201)
                .expect('Content-Type', /application\/json/)

        const owners = await helper.ownersInDb()
        expect(owners).toHaveLength(helper.initialOwners.length + 1)

        const ownerNames = owners.map(owner => owner.name)
        expect(ownerNames).toContain('Jay')
    })
    
    test('Please add all fields', async() => {
        const owner = {
            'name':'',
            'phone': 'Jayant',
            'address': 'IIITB',
            'password': 'jayant'
        }

        await api  
                .post('/api/owners')
                .send(owner)
                .expect(400)
    })

    test('Owner already exists', async() => {
        const owner = {
            'name':'gaurav',
            'phone': '9558342619',
            'address': 'IIITB',
            'password': 'gaurav'
        }

        await api  
                .post('/api/owners')
                .send(owner)
                .expect(400)
    })
})

describe('Login Owner', () => {
    test('Owner login successfull', async() => {
        await api.
                post('/api/owners/login')
                .send(helper.loginOwner)
                .expect(200)
                .expect('Content-Type', /application\/json/)
    })

    test('Invalid Credentials', async() => {
        const owner = {
            'phone': '958342619',
            'password': 'gaurav'
        }
        await api.
                post('/api/owners/login')
                .send(owner)
                .expect(400)
    })
  
})

afterAll(() => {
    mongoose.connection.close()
})