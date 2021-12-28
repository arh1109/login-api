const express = require('express')

// express
const app = express();
require('dotenv').config()

// rest of the packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser')

// database
const connectDB = require('./db/connect.js');


// routers
const authRouter = require('./routes/authRoutes');


const PORT = process.env.PORT || 3000;

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('tiny'))
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'))

// routes
app.get('/', (req, res) => {
    res.send('Home Page')
})

app.get('/api/v1', (req, res) => {
    // console.log(req.cookies);
    console.log(req.signedCookies);
    res.send('Home Page')
})

app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)


const start = async () => {
    try {
        await connectDB(process.env.MONGO_FIRST_PART, process.env.MONGO_PASSWORD, process.env.MONGO_LAST_PART);
        app.listen(PORT, () => {
            console.log(`Listening on port:${PORT}`);
        })
        

    } catch(err) {
        console.log(err);
    }
}

start();