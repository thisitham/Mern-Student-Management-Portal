import React, { useState } from 'react'; 
import axios from 'axios';


function AdminLogin() {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    

    function loginAdmin(e) {
        e.preventDefault();

        const admin = {
            username,
            password
        }

        const response = axios.post('http://localhost:8070/admin/login',admin).then(()=> {
            alert("Login Successfull")
            window.location.replace('http://localhost:3000/all'); //this is for navigate page after login 
        }).catch((err) => {
            alert(err)
        })
    }


    return (
        <div className="container">
            <h1>ADMIN LOGIN</h1>
        <form onSubmit={loginAdmin}>
        <div className="mb-3">
            <label for="" className="form-label">User Name</label>
            <input type="" className="form-control" id="exampleInputEmail1"
            onChange={(e)=>{
                setUsername(e.target.value)
            }}/>
        </div>
        <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1"
             onChange={(e)=>{
                setPassword(e.target.value)
            }}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>  
        </div>    
    )
}

export default AdminLogin;