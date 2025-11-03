const express = require('express');
const connectDB = require('./src/server');
const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'staging' ? '.env.staging' : '.env';
dotenv.config({ path: envFile });

// imports for cluster
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const app = express();
const PORT = process.env.PORT || 3000;

const apiRoutes = require("./src/routes/route")
const path  =require('path')

//middleware to parse the json data
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//for connected DB
connectDB();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

// basic cluster
if (cluster.isMaster) {
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        // Optionally restart a new worker
        cluster.fork();
    });
} else {
    // WORKER: Serve the Express app
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started on port ${PORT}`);
    });
}

// app.listen(PORT,()=>{
//     console.log(`Server is running at ${PORT}`)
// })