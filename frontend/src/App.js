import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';  //react walatath routes denna oni ekata meka add karanawa ////need to import useState to  use to woindow.location
import Header from './components/Header';
import Addstudent from './components/AddStudent';
import GetAndDeleteAllStudents from './components/GetAndDeleteStudent';
import GetOneStudentAndUpdate from './components/GetOneStudentAndUpdate';
import AdminLogin from './components/AdminLogin';

//app.js eke thamai api api html gahala page ekata oni tika hadaganne me app fun eka athule
function App() {
  
  return (
    <Router>
        <div> 
        
        {/* <Header /> */}
        {window.location.pathname !== '/' && <Header />}  {/*it mean when in /login path don't show <Header/> and only <Header/> show other routes*/}
          
          <Routes>
            <Route path='/addone/:id' exact element={<GetOneStudentAndUpdate/>}/>  {/*Frontend URL ekaka id enawann me widihata '.../:id' denna oni (meka 'id' ma wenna oni ne wena name ekk dennath puluwn)*/}
            <Route path='/add' exact element={<Addstudent />} />           {/* <router> athule <routes> ,<routes> athule <route>,then <route> eke thamai relavant funtion path eka denne */}
            <Route path='/all' exact element={<GetAndDeleteAllStudents/>}/>
            <Route path='/' exact element={<AdminLogin/>}/> 
          </Routes>
        </div>
    </Router>
  );
}


//then me fun export karala index.js ekata arn yanawa
export default App;
