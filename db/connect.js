const mongoose = require('mongoose');


const options = { useNewUrlParser: true, useUnifiedTopology: true }

const connectDB = (first, pw, last) => {
    return mongoose.connect(first + `${encodeURIComponent(pw)}` + last, options);
}

module.exports = connectDB;