const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');


const app = express();

connectDB();

const port = process.env.PORT || 5000; //port from .env file using dotenv module

app.use(express.json()); //to make the express srver recongnize json request
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));




app.use(errorHandler);



app.listen(port, () => console.log(`Server running on port ${port}`));
