import React, {useState, useEffect} from "react"; //import react with hooks functions(useState and useEffect)
import axios from "axios"; //axios make HTTP request to servers(backend) to get/update/delete/add data 
import { Navigate, useNavigate, useParams } from 'react-router-dom'; // Import useParams for accessing URL parameters

function GetOneStudentAndUpdate() {


    //getoneStudent methana indan 
    const { id } = useParams(); // Extract student ID from URL parameter (frontend URL eke ena Student ID eka me 'id' variable ekata gannawa)
    const [students, setStudents] = useState({}); //'[variable, function]'.  useState({}) eken krnne variable ekata value eka assign wena eka (ex - if useState(0) means name=0 ). methanadi api MT object ekk dila thiyenne((useState({}))), beacause only one studant kenekge data witharai api ganne(only one students data) 

    useEffect(() => {    //useEffect use to fetching data in here
        function getStudent() {   //create function to get data
            axios.get(`http://localhost:8070/student/get/${id}`).then((res) => {  //use axios and "get' http method to insert URL(BACKEND get one student method's URL). use to accessing schema and fetch data to frontend
                                                                         //methana ${id} ude useParams() eken extract karapu id eka
                console.log(res.data.student); //if fetch success show fetched data in console //console.log(res) witharak dunnoth console eke pennanawa 'data' kiyna array eka athule 'student' array ekk thiynawa, e 'student' array eka athule thamai relavant student ge data pennanne
                setStudents(res.data.student); //if fetch success , 'setStudent' function ekata gannawa all data,then uda thiyana 'students' variable(array) ekata assign karanawa arn gihin
            }).catch((err) => {
                alert(err.message); // if fetch fail show error msg
            })
        }
        getStudent();  //excute the function
    }, [id]) // this is dependancy array of useEffect() //meka empty thibbath methana awulk ne //id eka wenas wuna gaman useEffect() excute wena eka thamai meken wenne



    
    //update methana indan //update also same as add(post)
    const [name, setName] = useState("");  //'[variable, function]'.  useState("") eken krnne variable ekata value eka assign wena eka (ex - if useState(0) means name=0 ). methanadi api denne na value ekk, null string"" ekk widiyata thiynawa, ekata api ganne ara user dena value eka
    const [email, setEmail] = useState("");  

    function sendData(e) {     //form eka submit karama me function eka excute wenawa.
        e.preventDefault();    //meken krnne submit karama page eka reload wena eka nawaththanawa. // 'e' means event object (it's inside fun parameter)
 
        const newStudent = {  //object ekk hadanawa as 'newStudent'. uda client dunna values assign wuna varibles mekata gannawa.
            name,
            email
        }

        //console.log(newStudent); //meka client submit karapu values, console eke pennana using above object

                                                                                            //then axios use karala post method eken data server(backend) ekata pass karanawa
        axios.put(`http://localhost:8070/student/update/${id}`, newStudent).then(() => {   //parameters dekai, post('Backend post method eke URL eka', client dunna values ekk hadagaththa above object eka) //meke parameter 3k thiyanna puluwn 'authentication' use kaloth
                                                                                //'${id}' is uda useParams() use karala frontend URL eken gaththa id eka (const { id } = useParams();)
            alert("Student Updated")     //if added success show this message 
            //window.location.replace(`http://localhost:8070/student/update/${id}`)
            window. location. reload()         //to refresh the same page
        }).catch((err) => {
            alert(err);      //if not success show error
        })
        
    }




    return(
        <div className="container">
            <h1>Display One Student And Update</h1>

        <div className="container">
        <div className="row">
            <div className="col-6" >Name</div>
            <div className="col-6">{students.name}</div> {/*fetch karagaththu student 'students' object eke thiyenne. so me widihata e data display karanawa*/}
        </div>
        <div className="row">
            <div className="col-6">E-Mail</div>
            <div className="col-6">{students.email}</div>
        </div>
        </div>


        <form onSubmit={sendData} >  {/* methanata function eka denawa inside 'onsubmit' to form submit karama update wena function eka excute wenna   */}
            <div className="mb-3">
                <label for="exampleInputName1" className="form-label">Name</label>
                <input type="name" className="form-control" id="exampleInputName1"
                onChange={(e) => { //'e' valin kiynne event object ekk kiyna eka
                    setName(e.target.value); //user always enter karana values me function eken aragena, eken ara uda thiyana 'name' variable ekata always assign karagannawa'... e kiynne me userstate("") eka athulata e value eka yanawa ..(const [name, setName] = useState(""));
                }}/>
            </div>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email</label>
                <input type="email" className="form-control" id="exampleInputEmail1" 
                onChange={(e) => {
                    setEmail(e.target.value);
                }}/>
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    </div>
    )

} 

export default GetOneStudentAndUpdate;
