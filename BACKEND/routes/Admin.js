const router = require("express").Router();

let Admin = require('../models/Admin');


router.route('/add').post((req,res) => {

    const username = req.body.username;
    const password = req.body.password;

    //const { username, password } = req.body; // this way also correct

    const newAdmin = new Admin({
        username,
        password
    })

    newAdmin.save().then(() => {
        res.json("Admin Registered")
    }).catch((err) => {
        console.log(err)
    })

});


router.route('/login').post((req,res) => {

    const username = req.body.username; // extract the name and email properties from the request body (req.body). means user form eke enter krna data gannawa
    const password = req.body.password;

    //const { username, password } = req.body; // this way also correct

                                  //'!' is not oparator
    if (!username || !password) {   //if username or password empty(no values/null) . '!username' - username ekata values awilla ne(empty/no value/not available/null)
        return res.status(400).send('Username and password are required'); // then show this msg
    }
 
                                               //inside findOne({}) must need to contain as object({})
    Admin.findOne({username}).then((admin) => { //find relavant user using username and using findone() fun from Admin collection(schema) // so then give those user details to "admin" parameter
        if(!admin){                        //if 'adimin' variable null(empty)//means no user in colloction for provided username
            return res.status(400).send('incorrect username username or password'); // then give this msg
        }else if (password !== admin.password){       // if user given password not equel to the password stored in collection(registerd password)
            return res.status(400).send('incorrect password');  //then show this msg
        }else{
            res.status(200).send('loging succesful')   //else login success
        } 
    }).catch((err) => {  // catch if their any other error
        console.log(err)  //show error
    })

})



router.route('/get/:id').get(async (req,res) => {
    let adimnID = req.params.id;     //uda parameter eke(url) eke thiyna id eka fetch kara gannawa to this variable 

    const std = await Admin.findById(adimnID) //find the relavant id form Student schema using 'studentID' variable and findById function.
                      //we can use findone() if primary key(hoyana variable eka) string. means id nowana anith ekk nam like - name,email,NIC

    .then((admin) => {           //'.then'  will execute if the 'findById' query is successful.
        res.status(200).send({status:"User Fetched!",admin})  // then retrive all data to client relavanjt id (admin variable eka use krnawa eka ganna) //sends a JSON response with a status code of 200 (OK) and a message "User Fetched!", along with the retrieved admin document.
    }).catch((err) => {          //.catch will execute if there is an error during the findById query.
        console.log(err.message); //logs the error message to the console.
        res.status(500).send({status: "Error with get Admin!", error: err.message})   // sends a JSON response with a status code of 500 (Internal Server Error) and a message "Error with get Admin!", along with the error message.
    })
});




module.exports = router;



