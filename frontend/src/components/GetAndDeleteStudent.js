import React, {useState, useEffect} from "react"; //import react with hooks functions(useState and useEffect)
import axios from "axios"; //axios make HTTP request to servers(backend) to get/update/delete/add data 
import { useNavigate } from "react-router-dom"; // URL eka wenas karala page navigation karanna use karanawa(mekedi navigate wenakota user ID ekath URL ekata add wenna hadanawa )

function GetAndDeleteAllStudents() {
 
    const [students, setStudents] = useState([]); //'[variable, function]'.  useState([]) eken krnne variable ekata value eka assign wena eka (ex - if useState(0) means name=0 ). methanadi api MT array ekk dila thiyenne((useState([])))), beacause all data api gannawa(all students) 
    

    useEffect(() => {    //useEffect use to fetching data in here
        function getStudent() {   //create function to get data
            axios.get('http://localhost:8070/student/').then((res) => {  //use axios and "get' http method to insert URL(BACKEND get all student method's URL). use to accessing schema and fetch data to frontend
                console.log(res.data); //if fetch success show fetched data in console //console.log(res); witharak dunnoth 'data' kiyna array eka athule thamai console eke all data pennanne
                setStudents(res.data); //if fetch success , 'setStudent' function ekata gannawa all data,then uda thiyana 'student' variable(array) ekata assign karanawa arn gihin
            }).catch((err) => {
                alert(err.message); // if fetch fail show error msg
            })
        }
        getStudent();  //excute the function
    }, [])

    //.............................................

    const navigate = useNavigate(); //navigate variable ekata useNavigate() eka assign(initialize) karanawa ethakota 'navigate' also a function. (because useNavigate() can't use inside function directly)

    const handleUpdateClick = (studentId) => { //create function to navigate when click the button with relavant user ID //parameter ekata variable ekk denarwa ID eka widihata(button eke funtion eka call karama id eka pass karanawa parameter ekata)
        navigate(`/addone/${studentId}`);  //path give inside navigate function with with ID variable like this
      };


    //...........................................



    function DeleteStudent (studentID) {   //create function to delete one student with a parameter(because we need to pass relavant user id to parameter)
        axios.delete(`http://localhost:8070/student/delete/${studentID}`).then(() => {  //use axios 'delete' method to put backend delete student fun URL for delete student
            alert('Student Deleted Successfully'); //if delete success show this alert
            window.location.reload();   //to automatically refresh the page
        }).catch((err) => {
            alert(err.message);  //if error show error msg as alert
        })
    }



    function DeleteAllStudent () {
        axios.delete(`http://localhost:8070/student/delete`).then(() => {  //use axios 'delete' method to put backend delete student fun URL for delete all student
            alert('All Student Deleted Successfully');  //if delete success show this alert
        }).catch((err) => {
            alert(err.message); //if error show error msg as alert
        })
    }
    

    return(
        <div className="container">
                        <h1>Get All Students And Delete all</h1>
                        {students.map((student) => (
                            <div /*key={student._id}*/>
                                <p>{student._id}</p>  {/*'_id' arn thiyenne schema eke id's assign karala thiyna variable(key) eka '_id' widihata thiyenne (json neh key,value pairs ethakta ekai api json variables walata keys kiynne) */}
                                <p>{student.name}</p>
                                <p>{student.email}</p>
                            </div>
                        ))}

                        <button type="submit" className="btn btn-danger" onClick={() => DeleteAllStudent()} >Delete</button>    {/*call DeleteAllStudent() inside button onclick method */}  
                  

                    <h1>Delete Student</h1>
                    <h4>Navigate to Update page when click Update button with relavant ID</h4>


                    <table class="table" >
                    <thead>
                        <tr >
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        </tr>
                    </thead>

                    <tbody>

                    {students.map((student,index) => (  //'students' kiynne ude hadagaththa array variable eka. eketa thamai all data assigm wenne as a array
                                                        //map() function use to get iterates data inside array // methana student by student data ganna map() use karanawa
                                                        //then athule fun ekata uda 'sutudent' variable eka gaththa as parameter. 
                                                        //'index' variable eka '0' to continue one by one value iterate wenawa. ekata index ma newei kemathi namak denna puluwn.
                        <tr /*key={student._id}*/>
                        <td scope="row">{index+1}</td>  {/*index start eke 0 nisa 1 ken patan ganna 'index+1' kara*/} 
                        <td>{student.name}</td>         {/*then like this studed variable eka thiyna values walata access karanna puluwn name and email keys call karala*/}
                        <td>{student.email}</td>
                        <td><button type="submit" className="btn btn-success" onClick={() => handleUpdateClick(student._id)} >Update</button></td> {/*path eka dipu function eka call krnawa button eke. then get relavant id to inside paramete when click the button */}
                        <td><button type="submit" className="btn btn-danger" onClick={() => DeleteStudent(student._id)} >Delete</button></td> {/*call DeleteAStudent() inside delete button onclick method. And get relavant user id inside function as parameter(uda 'students' variable ekata avilla thiyenne okkoma students lage data. so eka map() eken iterate wenna dalane thiyenne, so eken mehema click karanakota relavant id eka ganna puluwn) */}
                        </tr>
                        ))}
                    </tbody>
                    </table>



        </div>
    )

} 

export default GetAndDeleteAllStudents;
