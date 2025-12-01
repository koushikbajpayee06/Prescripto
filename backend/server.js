import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'


// app config 
const app = express()
const port = process.env.PORT ||  4000;
connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(port, () => {
            console.log("server is successful listening on",port);
        });
    })
    .catch(err => {
        console.error("Database cant be connected");
    });


// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.get('/abc',(req, res)=>{
    res.send("API working")
});

