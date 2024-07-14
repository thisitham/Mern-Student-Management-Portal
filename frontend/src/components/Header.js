import React, {useState, useEffect} from 'react';
//import axios from 'axios';

function Header() {

   
  // const [admin, setAdmin] = useState([]); //'[variable, function]'.  useState([]) eken krnne variable ekata value eka assign wena eka (ex - if useState(0) means name=0 ). methanadi api MT array ekk dila thiyenne((useState([])))), beacause all data api gannawa(all students) 
    

  // useEffect(() => {    //useEffect use to fetching data in here
  //     function getAdmin(adminID) {   //create function to get data
  //         axios.get(`http://localhost:8070/admin/get/${adminID}`).then((res) => {  //use axios and "get' http method to insert URL(BACKEND get all student method's URL). use to accessing schema and fetch data to frontend
  //             console.log(res.data); //if fetch success show fetched data in console //console.log(res); witharak dunnoth 'data' kiyna array eka athule thamai console eke all data pennanne
  //             setAdmin(res.data); //if fetch success , 'setStudent' function ekata gannawa all data,then uda thiyana 'student' variable(array) ekata assign karanawa arn gihin
  //         }).catch((err) => {
  //             alert(err.message); // if fetch fail show error msg
  //         })
  //     }
  //     getAdmin();  //excute the function
  // }, [])




   const handleLogoutClick = () => {                     //create function to navigate when click the button navigate to login page 
      window.location.replace('http://localhost:3000/')  //give login page URL(path)
   };

    //inside return api use krnne JSX (html and css wala mix ekk)
    //nomal html css copy krla dammata kmkne samahara than wala wenaskam thiynawa
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/all">All Students</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/add">Add Students</a>
              </li>        
            </ul>
            <div class="p-2 bg-light border">
            <button type="submit" className="btn btn-secondary btn-sm" onClick={() => handleLogoutClick()} >Logout</button>
            </div>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    )
}

export default Header;