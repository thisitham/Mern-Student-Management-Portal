const router = require("express").Router(); //imports the Express.js router module and creates a new router instance. This router instance will be used to define routes related to students.

let Student = require('../models/Student'); //imports the Student model, which is defined in the ../models/Student file.


//ADD OR REG
router.route('/add').post((req,res) => {

    const name = req.body.name;  // extract the name and email properties from the request body (req.body). means user form eke enter krna data gannawa
    const email = req.body.email;  

    const newStudent = new Student({ //create new object in 'student' schema(Student table) with above extracted new student details
        name,
        email
    })

    // Normally mehema liynne object ekakadi {key(DB eka variable name eka) : values(udin ena walue eka)} . // Modern(Now) if key & value names are same then mehema liynne oni nehe uda widihata liynna puluwn
    /* 
    const newStudent = new Student({ 
         name : name,
         email : email
     }) 
    */

    newStudent.save().then(()=> { // save the new student in DB(Schema/student table)
        res.json("Student Saved!") //if student add success show this as json to client
    }).catch((err) => {  
        console.log(err);  //If an error occurs during the save operation, the .catch block executes, logging the error to the console.
    })

});



//GET ALL
router.route('/').get((req,res) => {
                                      //Student.find() method is a Mongoose query method that fetches all documents in the students collection.
    Student.find().then((admins) => { // 'Student' model to retrieve all student documents from the MongoDB database. //If the query is successful, the .then block executes, passing the retrieved student documents (students) to the callback function.
        res.json(admins)        //sends the retrieved student documents back to the client as a JSON response      
    }).catch((err) => {     //.catch block, which will execute if there is an error during the Student.find() query.
        console.log(err)    //logs the error to the console if an error occurs during the query.
    })

});


//GET specific user
// Async fun use krnne ekama welawa client gen ena requests godk crash wenne nathuwa response krnna. await eken eya promise wenawa carzh ekk nathuwa all request walata responses denawa kiyla 

router.route('/get/:id').get(async (req,res) => {
    let studentID = req.params.id;     //uda parameter eke(url) eke thiyna id eka fetch kara gannawa to this variable 

    const std = await Student.findById(studentID) //find the relavant id form Student schema using 'studentID' variable and findById function.
                //  await Student.findOne(email);  //we can use findone() if primary key(hoyana variable eka) string. means id nowana anith ekk nam like - name,email,NIC

    .then((student) => {           //'.then'  will execute if the 'findById' query is successful.
        res.status(200).send({status:"User Fetched!",student})  // then retrive all data to client relavanjt id (student variable eka use krnawa eka ganna) //sends a JSON response with a status code of 200 (OK) and a message "User Fetched!", along with the retrieved student document.
    }).catch((err) => {          //.catch will execute if there is an error during the findById query.
        console.log(err.message); //logs the error message to the console.
        res.status(500).send({status: "Error with get Student!", error: err.message})   // sends a JSON response with a status code of 500 (Internal Server Error) and a message "Error with get Admin!", along with the error message.
    })
});


//Update using put() 
router.route('/update/:id').put(async (req,res) => {   //defines a route handler for 'PUT' requests to the /update/:id endpoint.

    let studentID = req.params.id;  //extracts the 'id' parameter from the request URL and assigns it to the 'studentID' variable.

    const {name,email} = req.body;   //extracts the 'name' and 'email' properties from the request body (req.body). 
                                     //wena wenama line dekakata gannath puluwn kalin 'post' eke wage. but meka easy meka aluth feature ekk js wala 'destructor' kiyla
                                    // meke wenne client update krna data me variables walata gannawa

    const updateStudent = {  //creates an object updateStudent containing the new name and email values.
        name,                //user dunna updated values ekka object ekk hadanawa
        email
    }

    const update = await Student.findByIdAndUpdate(studentID, updateStudent)  //then that aluthen dunna values schema eke update karanawa relavant id ekata adalawa
                                                                              //findByIdAndUpdate(relavat id eka url eken fetch krgaththa, user dunna updated values(thats why we use above objec))
    
    .then((student) => {         //'.then'  will execute if the 'findByIdAndUpdate()' query is successful.
        res.status(200).send({status: "Student Updated", student}) //If the student document is successfully updated, 'student' parameter in this function represents the updated student data to client as JSON response with a status code of 200 (OK) and a message "Student Updated"
    }).catch((err) => {      //'.catch' block, which will execute if there is an error during the 'findByIdAndUpdate' query.
        console.log(err.message);    //logs the error message to the console.
        res.status(500).send({status: "Error with updating data", error : err.message}) //// sends a JSON response with a status code of 500 (Internal Server Error) and a message "Error with get Admin!", along with the error message.
    })

});



//Delete a student
router.route('/delete/:id').delete(async (req,res) => {

    let studentID = req.params.id; //extracts the 'id' parameter from the request URL and assigns it to the 'studentID' variable.

    await Student.findByIdAndDelete(studentID) //delete the relavant data with id(student) in Student Schema using findByIdAndDelete() fun

    .then(() => {         
        res.status(200).send({status:"Student Deleted..!"})  //then give msg to client if delete success
    }).catch((err) => {
        console.log(err.message)
        res.status(500).send({status:"Error with Delete Student..!", error:err.message})   //give error msg and the error to client if delete ont success
    })

});



//delete all records in table
router.route('/delete').delete(async (req,res) => {

await Student.deleteMany() // delete the all data in 'Student' schema using deleteMany() function

.then(() => {
    res.status(200).send({status:"All student Deleted..!"}) //then give msg to client if delete success
}).catch((err) => {
    console.log(err.message)
    res.status(500).send({status:"Error with Delete all Student..!", error:err.message}) ////give error msg and the error to client if delete ont success
})

});



module.exports = router; // export all function 