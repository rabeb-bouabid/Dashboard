import React, { useEffect } from 'react'
import { Bar,Doughnut, Line, Radar, } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import SrvcService from '../services/Srvc.service'
import { useState } from 'react';
import PrestatairesService from '../services/Prestataires.service';
import ContactServices from '../services/Contact.services';
import ReservationService from '../services/Reservation.service';
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify';


Chart.register(...registerables);
const Layouts = () => {
  const [prestataire,setPrestataire]=useState()
  const [countPresta,setcountPresta]=useState(0)
  const [DataMsg,setDataMsg]=useState([])
  const [countDataMsg,setcountDataMsg]=useState(0)
  const [reservation,setReservation]=useState()
  const [Countreservation,setcountReservation]=useState(0)
  const getAllReservation=()=>{
    ReservationService.getAllReservation().then((res)=>{
      console.log(res)
      setcountReservation(res.data.data.length)
      setReservation(res.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getAllReservation('/Reservation')
    FnMsg()
  },[])
  

  const FnMsg =()=>
  {
  console.log("message found succesfuly...")
  ContactServices.getMessages().then((result)=>{
    const resMsg = result.data;
    //console.log("resMsg",resMsg)
    setDataMsg(result.data)

  }).catch((err)=>{
    console.log(err)
  })

}

  
  const [service,setService]=useState()
  const [countservice,setcountService]=useState(0)
  const getAllServices=()=>{
    SrvcService.getAllServices().then((res)=>{
      console.log(res)
      setcountService(res.data.data.length)
      setService(res.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getAllServices()
  },[])

  useEffect(()=>{
   // toast.success("connecté");
  },[])

  const getAllPrestataires=()=>{
    PrestatairesService.getAllPrestataires().then((res)=>{
      console.log(res.data.data)
      setcountPresta(res.data.data.length)
      setPrestataire(res.data.data)
      
    }).catch((err)=>{
      console.log(err)
    })
    console.log("presta",prestataire)
  }
  useEffect(()=>{
    getAllPrestataires()
  },[])
  const [services,setServices]=useState()
  SrvcService.getAllServices().then((res)=>{
 
    setServices(res.data.data)
    }).catch((err)=>{
    console.log(err)
    })

    const [time, setTime] = useState(new Date());
    useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };
  const getGreetingMessage = () => {
    const currentHour = time.getHours();

    if (currentHour >= 0 && currentHour < 12) {
      return 'Bonjour  !';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Bon après-midi  !';
    } else {
      return 'Bonsoir !';
    }
  };

  return (
    <div>
      <div className="container-fluid">
          {/* Page Heading */}
          <ToastContainer />
         
          {/* Content Row */}
          <div className="row">
            {/* Earnings (Monthly) Card Example */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">

       
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    <b style={{fontSize:"15px"}}>Prestataires</b>     </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{countPresta}</div>
                    </div>
                    <div className="user-icon">
                      <i className="fas fa-user  fa-2x text-300" style={{color:"#486edb"}}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Earnings (Monthly) Card Example */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                      <b style={{fontSize:"15px"}}>Total Services</b> </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{countservice}</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-cogs fa-2x text-300" style={{color:"rgb(28 200 138)"}}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Earnings (Monthly) Card Example */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                        <b style={{fontSize:"15px"}}>Réservation</b>
                      </div>
                      <div className="row no-gutters align-items-center">
                        <div className="col-auto">
                          <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{Countreservation}</div>
                        </div>
                        <div className="col">
                          <div className="progress progress-sm mr-2">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: Countreservation+'%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-calendar-check fa-2x text-300" style={{color:"rgb(54 185 204)"}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Pending Requests Card Example */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      <b style={{fontSize:"15px"}}>Messages</b></div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{DataMsg?.length}</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-envelope fa-2x text-300" style={{color:"rgb(246 194 62)"}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Content Row */}
          <div className="row">
            {/* Area Chart */}
            <div className="col-xl-8 col-lg-7">
              <div className="card shadow mb-4">
                {/* Card Header - Dropdown */}
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">Service Chart</h6>
                  <div className="dropdown no-arrow">
                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                      <div className="dropdown-header">Dropdown Header:</div>
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                </div>

                  {/* START USERS ACTIVITY BLOCK */}
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title-box">
              <h3 style={{color:"#fa3a9c"}}><b>Service Price </b>  </h3>
            </div>
            <Doughnut
                  data={{
                    labels: services?.map((x) => x.ServiceName),
                    datasets: [
                      {
                        label: "# of Votes",
                        data: services?.map((x) => x.price),
                        backgroundColor: [
                          "rgba(250, 10, 132, 0.8)",
                          "rgba(54, 162, 235, 0.5)",
                          "rgba(255, 206, 86, 0.8)",
                          "rgba(75, 192, 192, 0.7)",
                          "rgba(153, 102, 255, 0.8)",
                          "rgba(255, 159, 64, 0.7)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(75, 192, 192, 1)",
                          "rgba(153, 102, 255, 1)",
                          "rgba(255, 159, 64, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
          </div>
          <div className="panel-body padding-0"/>
        </div>
        {/* END USERS ACTIVITY BLOCK */}
                {/* Card Body */}
                <div className="card-body">
                  <div className="chart-area">
                    <canvas id="myAreaChart" />
                  </div>
                </div>
              </div>
            </div>
            {/* Pie Chart */}
            <div className="col-xl-4 col-lg-5">
              <div className="card shadow mb-4">
                {/* Card Header - Dropdown */}
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">Time</h6>
                  <div className="dropdown no-arrow">
                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                      <div className="dropdown-header">Dropdown Header:</div>
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                </div>
                {/* Card Body */}
                <div className="card-body">
                <h2 style={{color:"#fa3a9c"}}><b>{getGreetingMessage()}</b></h2>
          <div className="clock" style={{display: "flex",color:"#4e73df",alignItems: "center",justifyContent: "center",height: "200px",fontFamily: "Arial" }}>
      <h1 style={{ fontSize:"72px",fontWeight: "bold",}}>{formatTime(time)}</h1>
    </div>
                </div>
              </div>
            </div>
          </div>
          {/* Content Row */}
          <div className="row">
            {/* Content Column */}
            <div className="col-lg-6 mb-4">
              {/* Project Card Example */}
              <div className="card shadow mb-4">
              
              </div>
              {/* Color System */}
              
            </div>
            
          </div>
        </div>
    </div>
  )
}

export default Layouts
