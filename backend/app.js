require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const hotelRouter = require('./routes/hotels');
const roomRouter = require('./routes/rooms');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//middlewares
app.get('/', (req, res) => {
    res.send('welcome to home page')
})

app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/rooms', roomRouter);
app.use('/hotels', hotelRouter);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Somenthing went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); 
        console.log("MongoDB Connected");
    } catch(error) {
        throw(error)
    }
}

mongoose.connection.on("disconected",() => {
    console.log("MongoDB disconnected");
});
/*
mongoose.connection.on("connected", () => {
    console.log("Mongodb connected");
})
*/
 connect();

module.exports = app;
