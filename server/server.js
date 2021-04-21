const express = require('express');
const Mongoose = require('mongoose')
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');


const server = express();
const {
    SERVER_PORT,
    DB_URL
} = process.env
//middlewares
server.use(bodyParser.json())
server.use(cors());
server.use(morgan('tiny'))
//routes
server.use('api/users', userRoutes);


//start

const dbConnection = Mongoose.createConnection(DB_URL, {useNewUrlParser:true, useUnifiedTopology:true})

//db connection

dbConnection.on('connected', () => {
    server.listen(SERVER_PORT, ()=> {
        console.log('server is running')
    } )
});

dbConnection.on('error', (err) =>{
    console.log('db connection failed');
    console.log(err)
})