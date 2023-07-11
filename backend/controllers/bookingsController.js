const asyncHandler = require('express-async-handler')

const Booking = require('../models/bookingsModel')
const Property = require('../models/propertiesModel')

// @desc GET properties..
// @route GET /api/properties
// @access Private
const getBooking = asyncHandler(async (req,res) => {
    const bookings = await Booking.find({vehicle_reg_no: req.params.vehicle_reg_no});
    res.status(200).json(bookings)
})

const getOnGoingBooking = asyncHandler(async (req,res) => {
    const bookings = await Booking.find({customer_id: req.body.customer_id, out_date: null});
    if(bookings.length === 0){
        res.status(400)
        throw new Error('No such booking found!')
    }
    const curDate = new Date();
    // console.log(bookings[0].in_date);

    updatedBookings = [];

        bookings.map(async(booking)=>{
            // const property = await Property.findById(booking.prop_id);
            // const prop_address = property.prop_address;
            // console.log(prop_address);
            const inDate = new Date(booking.in_date);
            const timeDifference = curDate.getTime() - inDate.getTime();
            let differentDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
            let price = 50*differentDays;
            updatedBookings = [...updatedBookings, {...booking, price}]
            // booking = {...booking, price};
        })

    // const inDate = new Date(bookings[0].in_date);

    // const timeDifference = curDate.getTime() - inDate.getTime();

    // let differentDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    // console.log(inDate);
    // console.log(updatedBookings)
    res.status(200).json(updatedBookings);
})

const newBooking = asyncHandler(async (req,res) => {
    const {prop_id, prop_address, owner_id, customer_id, vehicle_reg_no} = req.body

    if(!prop_id || !owner_id || !customer_id || !vehicle_reg_no || !prop_address) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const property = await Property.findById(prop_id);
    // console.log(property.prop_address);
    // const prop_address = property.prop_address;

    const booking = await Booking.create({
        prop_id,
        prop_address,
        owner_id,
        customer_id,
        vehicle_reg_no,
        in_date: new Date(),
        out_date: null,
        price: null
    })

    if(property.slots === 0){
        res.status(400)
        throw new Error('No more slots available!')
    }
    const updatedProperty = await Property.findByIdAndUpdate(prop_id, {slots: property.slots-1}, {new: true,})

    res.status(200).json(booking)
})

const goingOut = asyncHandler(async (req,res) => { //:id is parameter
    const filter = {_id: req.body._id, out_date: null};
    const booking = await Booking.findOne(filter);

    if(!booking){
        res.status(400)
        throw new Error('No such booking found!')
    }

    const updatedBooking = {out_date: new Date(), price: req.body.price}

    await Booking.findOneAndUpdate(filter, updatedBooking)

    const property = await Property.findOne({_id: booking.prop_id});

    await Property.findOneAndUpdate({_id: booking.prop_id},{slots: property.slots+1});

    res.status(200).json({Sucess: "Done"})
})

const pastBookings = asyncHandler(async(req,res) => {
    const filter = {customer_id: req.body.customer_id};
    const bookings = await Booking.find(filter);

    let historyBookings = [];

    bookings.filter(booking =>
        booking.out_date !== null).map(history => {
            historyBookings = [...historyBookings, history];
        })

    res.status(200).json(historyBookings);
})

module.exports = {
    getBooking,
    newBooking,
    goingOut,
    getOnGoingBooking,
    pastBookings
}