import logo from './logo.svg';
import './App.css';
import Home from './Views/Home';
import Layouts from './Views/Layouts';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AddSrvc from './Views/Srvc/AddSrvc';
import ListSrvc from './Views/Srvc/ListSrvc';
import EditSrvc from './Views/Srvc/EditSrvc';
import Login from './Views/login';
import ListRsrv from './Views/Reservation/ListRsrv';

import EditResrv from './Views/Reservation/EditResrv';
import AddPrestataires from './Views/prestataires/AddPrestataires';
import ListPrestataires from './Views/prestataires/ListPrestataires';
import EditPresta from './Views/prestataires/EditPresta';
import ProfileAdmin from './Views/ProfileAdmin';
import ListUser from './Views/user/ListUser';



function App() {
  const Privateroute = ({children})=>{
    if(!localStorage.getItem("userData")){
       return   <Navigate to="/"></Navigate>
    } return children
  }
  return (
    <div className="App">
      
    <BrowserRouter>
        <Routes>
    <Route path="/home" element={<Home/>} >
    <Route path="/home" element={<Privateroute><Layouts/></Privateroute>}></Route>
    <Route path="/home/List" element={ <ListUser/>}></Route>
    <Route path="/home/AddSrvc" element={<AddSrvc/> }></Route>
    <Route path='/home/ListSrvc' element={<ListSrvc /> }> </Route>
    <Route path='/home/pofil' element={<ProfileAdmin/> }> </Route>
    <Route path='/home/ListPresta' element={<ListPrestataires /> }> </Route>
    <Route path="/home/EditSrvc/:id" element={ <EditSrvc/>}></Route>
    <Route path="/home/ListRsrv" element={ <ListRsrv/>}></Route>
    <Route path="/home/EditPresta/:id" element={ <EditPresta/>}></Route>
    <Route path="/home/EditRsrv/:id" element={ <EditResrv/>}></Route>
    <Route path="/home/AddPrest" element={ <AddPrestataires/>}></Route> </Route>
    <Route path="/:callback?" element={<Login/>} ></Route>


        
        </Routes>
        </BrowserRouter> 
    </div>
  );
}

export default App;
