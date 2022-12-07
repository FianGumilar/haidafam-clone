require('dotenv').config();
require('./routes/auth')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const flash = require('connect-flash');

const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const hotelRouter = require('./routes/hotels');
const roomRouter = require('./routes/rooms');
const foodRouter = require('./routes/food');
const souvenirRouter = require('./routes/souvenir');
const { ppid } = require('process');

const app = express();
app.use(session({ secret: process.env.AUTH_SEC, 
    resave: false, 
    saveUninitialized: true,
    maxAge: 60 * 1000,
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
 }));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//middlewares
app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Login with Google</a>');
})

app.use('/', authRouter);
app.use('/profile/guest-profile', userRouter);
app.use('/hotels/:hotelID', roomRouter);
app.use('/hotels/rooms', hotelRouter);
app.use('/hotels/:hotelid', foodRouter);
app.use('/hotels/:hotelId', souvenirRouter);

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

app.use((req, res, next) => {
    res.locals.error = req.flash('error');
    next();
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
