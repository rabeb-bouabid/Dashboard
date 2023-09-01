import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LoginService from '../services/Login.service'

const Sidebar = () => {

  const [admin,setAdmin]=useState()
  const {id} = useParams()
  
  const getAdminById = () => {
    LoginService.getAdmin(id)
  
      .then((res) => {
        console.log("hello",res.data.data)
        console.log(res);
        setAdmin([res.data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(()=>{
    getAdminById()
  },[])


  return (
    <div>


       <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      
      {/* Sidebar - Brand */} 
       <Link  to ="/home" className="nav-link">
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink" />
        </div>
        <div className="sidebar-brand-text mx-3" style={{fontSize:"27px"}}> Admin </div>
      </a> 
      </Link>
      {/* Divider */}
      <hr className="sidebar-divider my-0" />
      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
      <div className="user-profile" style={{ margin: "2rem 0", textAlign: "center", color: "#ffffff", fontWeight: "bold" }}>
  <div className="user-image" style={{ display: "inline-block", margin: "auto" }}>
    <img src="assets/images/r.jpg" style={{ width: "79px", height: "79px", borderRadius: "100%", marginBottom: "0.625rem" }} />
  </div>
  <div className="user-name" style={{fontFamily:"italic", color:"white", fontSize:"19px"}}>
    Bouabid Rabeb
  </div>
  
</div>

      <Link  to ="/home" className="nav-link">
        <a className="nav-link">
          <i className="fas fa-fw fa-tachometer-alt" style={{fontSize:"25px"}}/>
          <span style={{fontWeight:"bold",fontStyle:"italic",fontSize:'20px'}}>Dashboard</span></a> 
          </Link>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider" />
      {/* Heading */}
      <div className="sidebar-heading" style={{textAlign:"center", color:"#FFC0CB", fontWeight:"bold", fontSize:"0.9rem",height:"35px"}}>Menu principal</div>
      {/* Nav Item - Pages Collapse Menu */}
      {/* Nav Item - Utilities Collapse Menu */}
      {/* Divider */}
      <hr className="sidebar-divider" />
      {/* Heading */}
   

      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
          <i className="fas fa-fw fa-folder" style={{fontSize:"21px"}}/>
          <span style={{fontSize: "20px",fontFamily:"math",margin:"4px"}}><b>utilisateurs</b></span>
        </a>
        <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
          
            <Link   to ="/home/List" className="nav-link">
            <a className="collapse-item" style={{color:"black"}}><b>Liste utilisateurs</b></a></Link>
        
            <div className="collapse-divider" />
          </div>
        </div>
      </li>

      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
          <i className="fas fa-fw fa-folder" style={{fontSize:"21px"}}/>
          <span style={{fontSize: "20px",fontFamily:"math",margin:"4px"}} ><b>Services</b></span>
        </a>
        <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
          <Link   to ="/home/AddSrvc" className="nav-link">
            <a className="collapse-item" style={{color:"black"}}><b>Add Services</b></a>
            </Link>
            <Link   to ="/home/ListSrvc" className="nav-link">
            <a className="collapse-item" style={{color:"black"}}><b>Liste Services</b></a>
            </Link>
           
            <div className="collapse-divider" />
          </div>
        </div>
      </li>
      <li className="nav-item" >
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
          <i className="fas fa-fw fa-folder" style={{fontSize:"21px"}}/>
          <span style={{fontSize: "20px",fontFamily:"math",margin:"4px"}} ><b>Prestataires</b></span>
        </a>
        <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
          <Link   to ="/home/AddPrest" className="nav-link">
            <a className="collapse-item" style={{color:"black"}}><b>Add Prestataires</b></a>
            </Link>
            <Link   to ="/home/ListPresta" className="nav-link">
            <a className="collapse-item" style={{color:"black"}}><b>Liste Prestataires</b></a>
            </Link>
           
            <div className="collapse-divider" />
          </div>
        </div>
      </li>
   

      <li className="nav-item" >
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
          <i className="fas fa-fw fa-folder" style={{fontSize:"21px"}}/>
          <span style={{fontSize: "20px",fontFamily:"math",margin:"4px"}}><b>Reservation</b></span>
        </a>
        <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <Link   to ="/home/ListRsrv" className="nav-link">
            <a className="collapse-item" href="register.html"><b>Liste Reservation</b></a></Link>
          
            <div className="collapse-divider" />
          </div>
        </div>
      </li>

      {/* Nav Item - Charts */}
      
      {/* Nav Item - Tables */}
      
      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />
      {/* Sidebar Toggler (Sidebar) */}
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle" />
      </div>
      {/* Sidebar Message */}
      <div className="sidebar-card d-none d-lg-flex">
        <img className="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..." />
        <p className="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
        <a className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
      </div>
    </ul>
    </div>
  )
}

export default Sidebar
