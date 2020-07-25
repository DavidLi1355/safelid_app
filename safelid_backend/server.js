const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
// const fs = require('fs');

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

// Connect database
const uri = config.get('ATLAS_URI');
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
    // const bucket = new mongoose.mongo.GridFSBucket(connection.db, { bucketName: 'files' });
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});



// Routes
app.use('/', require('./routes/users'));
app.use('/', require('./routes/dashboard'));
app.use('/dashboard', require('./routes/dashboard'));