const express = require("express"); //framework for Node.js
const mongoose = require("mongoose"); //to connect with mongodb
const bodyParser = require("body-parser");
const cors =  require("cors"); //when client and server side have different domain(two address) there can be error when responding client to server ,so to solve ti cors use as a middlware
const dotenv = require("dotenv") //using this we can create .env file using it we can contain sensitive information seperatly

const app = express()   //creates an instance of the Express application

app.use(cors());  //app.use() is excuting function in express
app.use(bodyParser.json());

const PORT = process.env.PORT || 8070; //give port number in .env file to PORT variable and defaults to port 5000 if no port is specified.

dotenv.config();                      //Using dotenv: dotenv is a module that loads environment variables from a .env file into process.env. It helps keep your environment-specific configuration separate from your 



        //mongoose.connect(): This function is used to connect to a MongoDB database.
        //process.env.MONGO_URL: This retrieves the MongoDB URI from the environment variables. 
        //.then(): This is a promise function. If the connection is successful, the code inside .then() is executed.
        //.catch(): This is also a promise function. If an error occurs during the connection, the code inside .catch() is executed.

mongoose.connect(process.env.MONGO_URL,{
     //useCreateIndex: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
     //useFindAndVerify: false
})
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log("NOT CONNECTED TO NETWORK", err))


        //app.listen() is used to start a web server and make it listen for connections on a specified port.
        //app.listen(PORT, callback)
        //PORT: The port number on which the server should listen.
        //callback: A function that is called once the server is running and ready to accept connections.


const StudentRouter = require('./routes/Student'); //get Student.js route file
const AdminRouter = require('./routes/Admin')

app.use("/student", StudentRouter ); // (http://localhost:8070/student/..)  //to excute functions inside student route file. that time url show /student path
app.use("/admin", AdminRouter);                   


app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
})