const express = require('express');
const connectDB = require('./src/server');
const app = express();
const PORT = 3000;

//middleware to parse the json data
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//for connecte
connectDB();


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