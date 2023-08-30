const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');


dotenv.config();

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }); 
        console.log('Connected To MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

//middleware
connectToDatabase();
app.use(helmet());
app.use(morgan('common'));
app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);


app.listen(8803,()=> {
    console.log('Backend is running!!')
})