const express = require('express');
const colors = require('colors')
const cors = require('cors');
const winston = require('winston')
const { ElasticsearchTransport } = require('winston-elasticsearch');

const mongoDB = require('./config/db');

const app = express();
const port = process.env.PORT;
require('dotenv').config();

const {errorHandler} = require('./middleware/errorMiddleware');

const logger = winston.createLogger({
	level: 'info',
	transports: [
	  new ElasticsearchTransport({
		level: 'info',
		index: 'logs',
		clientOpts: {
		  node: 'https://750f-119-161-98-68.ngrok-free.app',
	  }
	}),
	],
  });

  app.use((req, res, next) => {
	logger.info({
	  message: "API request",
	  method: req.method,
	  path: req.path,
	  query: req.query,
	  body: req.body
	});
  
	res.on("finish", () => {
	  logger.info({
		message: "API response",
		method: req.method,
		path: req.path,
		status: res.statusCode
	  });
	});
  
	next();
  });

//database connection function:


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.raw({extended: false}));

app.use('/api/properties', require('./routes/propertyRoutes'))
app.use('/api/owners', require('./routes/ownerRoutes'))
app.use('/api/bookings', require('./routes/bookingRoutes'))
app.use('/api/customers', require('./routes/customerRoutes'))

app.use(errorHandler);

mongoDB().then(() => {
	console.log('Successfully connected to MongoDB')
})
.catch((error) => {
	console.log(`Failed to connect to MongoDB: ${error.message}`)
});

module.exports = app
