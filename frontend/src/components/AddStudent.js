//'useEffect' & 'useState' dekama hooks kiyna functions. eka react walata kalekata kalin apu functions wargayak  
import React, { useState } from 'react';
import axios from 'axios';  //axios make HTTP request to servers(backend) to get/update/delete/add data 

function Addstudent () {

    const [name, setName] = useState("");  //'[variable, function]'.  useState("") eken krnne variable ekata value eka assign wena eka (ex - if useState(0) means name=0 ). methanadi api denne na value ekk, null string"" ekk widiyata thiynawa, ekata api ganne ara user dena value eka
    const [email, setEmail] = useState("");

    function sendData(e){    //form eka submit karama me function eka excute wenawa.
        e.preventDefault();  //meken krnne submit karama page eka reload wena eka nawaththanawa. mokada ehema reload wunoth Axios use karala data eka server ekata yawana process eka krganna bari wenna puluwn.
                             // 'e' means event object (it's inside fun parameter)

        const newStudent = {  //object ekk hadanawa as 'newStudent'. uda client dunna values assign wuna varibles mekata gannawa.
            name,
            email
        }

        //console.log(newStudent); //meka client submit karapu values, console eke pennana using above object

        
        //then axios use karala post method eken data server(backend) ekata pass karanawa
        //parameters dekai, post('Backend post method eke URL eka', client dunna values ekk hadagaththa above object eka)
        axios.post('http://localhost:8070/student/add',newStudent).then(() => {  //meke parameter 3k thiyanna puluwn 'authentication' use kaloth
            alert("Student Added")     //if added success show this message 
        }).catch((err) => {
            alert(err) //if not success show error
        })

    }

    return (
        <div className="container">
            <form onSubmit={sendData} >  {/* methanata function eka denawa inside 'onsubmit' to form submit karama function eka excute wenna   */}
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Name</label>
                    <input type="name" className="form-control" id="exampleInputName1" 
                    onChange={(e) =>{ // 'e' valin kiynne event object ekk kiyna eka
                        setName(e.target.value); //user always enter karana values me function eken aragena eken ara uda thiyana 'name' variable ekata always assign karagannawa'... e kiynne me userstate("") eka athulata e value eka yanawa ..(const [name, setName] = useState(""));
                    }}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}/>
                </div>
                <button type="submit" className="btn btn-primary"
                // onSubmit={sendData}
                >Submit</button>
            </form>
        </div>
    )
}

export default Addstudent;