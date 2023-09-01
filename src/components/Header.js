import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoginService from "../services/Login.service";
import ReservationService from "../services/Reservation.service";
import { useState } from "react";
import ContactServices from "../services/Contact.services";
import { Link } from "react-router-dom";
const Header = () => {
  const [contacts, setContacts] = useState([]);
  const deleteMsg = () => {
    console.log("hello");
    ContactServices.deleteMsg()
      .then((res) => {
        console.log(res);
        // Mettre à jour la liste des contacts après la suppression
        setContacts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [notif, setNotif] = useState([]);
  const deleteNotif = () => {
    console.log("hello");
    ContactServices.deleteNotif()
      .then((res) => {
        console.log(res);
        // Mettre à jour la liste des contacts après la suppression
        setNotif(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // Récupérer la liste des contacts initiale
    ContactServices.getMessages()
      .then((res) => {
        setContacts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  const [Data, setData] = useState();
  const Notification = () => {
    console.log("noification créer...");
    ReservationService.getAllNotifications()
      .then((result) => {
        const tabRes = result.data.data;
        console.log(tabRes);
        setData(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    Notification();
    FnMsg();
  }, []);
  const [DataMsg, setDataMsg] = useState();
  const FnMsg = () => {
    console.log("message found succesfuly...");
    ContactServices.getMessages()
      .then((result) => {
        const resMsg = result.data;
        console.log(resMsg);
        setDataMsg(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    Swal.fire({
      title: "Are you sure to Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        LoginService.logoutadmin();
        localStorage.clear();
        navigate("/").catch((err) => {
          console.log(err);
        });
        Swal.fire("", "", "success");
      }
    });
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/* Sidebar Toggle (Topbar) */}
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i className="fa fa-bars" />
        </button>
        {/* Topbar Search */}
        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <h1 className="h3 mb-0 " style={{color:"#e83e8c",fontFamily: "Times new roman",marginRight:"265px"}}><b>Dashboard</b>  </h1>
        </form>
        {/* Topbar Navbar */}
        <ul className="navbar-nav ml-auto">
          {/* Nav Item - Search Dropdown (Visible Only XS) */}
          <li className="nav-item dropdown no-arrow d-sm-none">
            <a 
              className="nav-link dropdown-toggle"
              href="#"
              id="searchDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-search fa-fw" />
            </a>
            {/* Dropdown - Messages */}
            <div
              className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
              aria-labelledby="searchDropdown"
            >
              <form className="form-inline mr-auto w-100 navbar-search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search fa-sm" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
          {/* Nav Item - Alerts */}
          <li className="nav-item dropdown no-arrow mx-1">
            <a  style={{color:"rgb(0 0 0 / 24%)"}}
              className="nav-link dropdown-toggle"
              href="#"
              id="alertsDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-bell fa-fw" style={{Color:"#007bff",fontSize:"24px"}}/>
              {/* Counter - Alerts */}
              <span className="badge badge-danger badge-counter" style={{marginTop:"-1rem",width: "22px"}}>
                {Data?.length}
              </span>
            </a>
            {/* Dropdown - Alerts */}

            <div
              className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="alertsDropdown"
            >
              <h6 className="dropdown-header">Alerts Center</h6>
              {Data?.map(
                (item, index) =>
                  !item.isRead && (
                    <a className="dropdown-item d-flex align-items-center">
                      <div className="mr-3">
                        <div className="icon-circle bg-danger">
                          <i className="fas fa-bell fa-fw text-white " />
                        </div>
                      </div>
                      <div key={index}>
                        <div className=" text-black-500">
                          <b>
                            {" "}
                            {new Date(item.createdAt).toLocaleDateString()}
                          </b>
                        </div>
                        {item.message}
                      </div>
                    </a>
                  )
              )}
              <Link to="/home/ListRsrv" className="nav-link">
                <a
                  className="dropdown-item text-center small text-gray-500"
                  href="#"
                >
                  <b style={{ color: "black" }}>Voir Détails</b>
                </a>
              </Link>
              <a
                className="dropdown-item text-center small text-gray-500"
                href="/home"
                onClick={() => {
                  if (
                    window.confirm(
                      "Êtes-vous sûr de vouloir supprimer tous les notifications ?"
                    )
                  ) {
                    deleteNotif();
                  }
                }}
              >
                {" "}
                <b style={{ color: "black" }}>Supprimer tous </b>
              </a>
            </div>
          </li>
          {/* Nav Item - Messages */}
          <li className="nav-item dropdown no-arrow mx-1">
            <a
            style={{color:"rgb(0 0 0 / 24%)"}}
              className="nav-link dropdown-toggle"
              href="#"
              id="messagesDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
            <i className="fas fa-envelope fa-fw" style={{Color:"#007bff",fontSize:"24px"}}></i> 
           
              {/* Counter - Messages */}
              <span className="badge badge-danger badge-counter" style={{marginTop:"-1rem",width:"22px"}}>
                {DataMsg?.length}
              </span>
            </a>
            {/* Dropdown - Messages */}
            <div
              className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="messagesDropdown"
            >
              <h6 className="dropdown-header">Message Center</h6>
              {DataMsg?.map((it, i) => {
                return (
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <div className="dropdown-list-image mr-3">
                      <img
                        className="rounded-circle"
                        src="img/undraw_profile_1.svg"
                        alt="..."
                      />
                      <div className="status-indicator bg-success" />
                    </div>
                    <div className="font-weight-bold">
                      <div className="text-truncate">{it.username}</div>
                      <div className="small text-gray-500"> {it.message}</div>
                    </div>
                  </a>
                );
              })}
              <a
                className="dropdown-item text-center small text-gray-500"
                href="/home"
                onClick={() => {
                  if (
                    window.confirm(
                      "Êtes-vous sûr de vouloir supprimer tous les messages ?"
                    )
                  ) {
                    deleteMsg();
                  }
                }}
              >
                {" "}
                <b style={{ color: "black" }}>Supprimer tous les messages</b>
              </a>
            </div>
          </li>

          <div className="topbar-divider d-none d-sm-block" />
          {/* Nav Item - User Information */}
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                <b>Bouabid Rabeb </b>
              </span>
              <img
                className="img-profile rounded-circle"
                src="assets/images/r.jpg"
              />
            </a>
            {/* Dropdown - User Information */}
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <a className="dropdown-item"  onClick={(e) => logout()}>
                              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-400"  style={{color:"#1425d7"}}></i>
                              <b style={{color:"#1425d7"}}>Deconnexion</b>
                            </a>
              {/* <a onClick={(e) => logout()}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                Logout
              </a> */}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
