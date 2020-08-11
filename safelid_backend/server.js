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
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// Routes
app.use('/api', require('./routes/users'));
app.use('/api/dashboard', require('./routes/dashboard'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('safelid_frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'safelid_frontend', 'build', 'index.html'));
    });
}