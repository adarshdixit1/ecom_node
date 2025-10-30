const express = require('express');
const connectDB = require('./src/server');
const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'staging' ? '.env.staging' : '.env';
dotenv.config({ path: envFile });


const app = express();
const PORT = process.env.PORT || 3000;

const apiRoutes = require("./src/routes/route")


//middleware to parse the json data
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//for connected DB
connectDB();

// Routes for app
app.use("/api", apiRoutes);


//404 error
app.use((req,res,next)=>{
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

// 500 handler
app.use((err,req, res, next) => {
    console.error('Error:', err.message || err);
    res.status(err.status || 500).json({
        error: false,
        message: err.message || 'Internal Server Error',
    });
})

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})