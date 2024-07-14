const mongoose = require('mongoose'); //imports the 'mongoose' module, used to interact with MongoDB from a Node.js application.

const Schema = mongoose.Schema; //This line extracts the 'Schema' constructor from 'mongoose'. The 'Schema' constructor is used to define the structure of documents within a MongoDB collection.

const StudentSchema = new Schema({ //Here, a new Schema object is created for the "Student" collection. The Schema constructor takes an object as an argument, which defines the structure of the documents in this collection.

    name: {
        type:String,
        required:true
    },

    email: {
        type:String,
        required:true
    },
    
    // 'name' and 'email' are fields in the StudentSchema
    
})

const Student = mongoose.model("student", StudentSchema); //This line creates a model named "Student" using the 'StudentSchema'. The 'mongoose.model' function takes two arguments: the name of the model and the schema to use for that model.
                                                          //'student' dunnata meka schema eka db eke hadeddi 'students' (bahu wachanayak) lesa sadei

module.exports = Student; //this line exports the Student model, making it available for import in other files within the application.