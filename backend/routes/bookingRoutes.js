const express = require('express');
const router = express.Router();

const { getBooking, newBooking, goingOut, getOnGoingBooking, pastBookings } = require('../controllers/bookingsController')

router.post('/newBooking', newBooking)

router.get('/get', getBooking) // by vehicle number

router.put('/out', goingOut) // by vehicle number

router.post('/currentBooking', getOnGoingBooking)

router.post('/pastBooking', pastBookings)

// router.delete('/cancel', deleteProperty);

module.exports = router