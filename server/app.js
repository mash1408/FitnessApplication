const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors")
const user = require('./Routes/user');
const calories = require('./Routes/calories');

const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');


const cluster_url=process.env.DB_CONNECT;
mongoose.connect(
  cluster_url,
  {useNewUrlParser: true, useUnifiedTopology: true
  },

  () => {
    console.log('connected to DB');
  }
);
var db = mongoose.connection;

const whitelist = ["http://localhost:5000"]
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors(corsOptions))
//Middleware for auth


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//bodyParser is deprecated. Changed it to express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', user);
app.use('/calories', calories);

//Error handler. See admin controller to check how to use this error handler
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const msg = error.message;
  const data = error.data;
  res.status(status).json({ msg, data });
});

app.listen(process.env.PORT, () => {
  console.log('app is running ');
});
