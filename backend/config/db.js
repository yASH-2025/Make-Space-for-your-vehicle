const mongoose = require('mongoose')
const dotenv = require('dotenv');
const path = require('path');

require("dotenv").config({
    path: path.resolve(__dirname, '../.env')
});

const mongoDB = async() => {
    const uri = process.env.ATLAS_URI;
    const uri_test = process.env.ATLAS_URI_TEST
    if(process.env.NODE_ENV=='test'){
        conn = await mongoose.connect(uri_test)
        console.log(`MongoDB database connection established successfully : ${conn.connection.host}`.cyan.underline);
    } else {
        conn = await mongoose.connect(uri)
        console.log(`MongoDB database connection established successfully : ${conn.connection.host}`.cyan.underline);
    }
}

module.exports = mongoDB; //we don't want to call it here, we want to export it so don't use () method here..!
