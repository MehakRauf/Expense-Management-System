const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./configs/connectDB');
const path = require('path');

// config env file
dotenv.config();

// call DB
connectDB();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// port
const PORT = 8080 || process.env.PORT;

app.use('/api/v1/users', require('./routes/userRoute'));
app.use('/api/v1/transactions', require('./routes/transactionRoute'));

app.listen(PORT, () => {
    console.log("App is listening!");
});