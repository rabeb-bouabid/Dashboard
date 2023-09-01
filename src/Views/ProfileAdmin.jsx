import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"
import { Table, Pagination, Form, FormControl, Button } from "react-bootstrap";
import { Navigate, useNavigate, Link, useParams } from "react-router-dom";
import LoginService from "../services/Login.service";
import Swal from "sweetalert2";

const ProfileAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, settotalItems] = useState();
  const [totalPages, settotalPages] = useState();
  const [user, setUser] = useState({ user: null });
  const [startIndex, setstartIndex] = useState();
  const [endIndex, setendIndex] = useState();
  const [paginatedData, setpaginatedData] = useState();
  const [data, setData] = useState([]);
  const itemsPerPage = 1;
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : false;
  }, []);
  const handleInputChange = (e) => {
    console.log("+++", user, e.target.name, e.target.value);

    setUser((prevUser) => ({
      ...prevUser,
      user: {
        ...prevUser.user,
        [e.target.name]: e.target.value,
      },
    }));
  };
  const updateProfilAction = () => {
    console.log("user?.user?._Fid, user?.user", user?.user?._id, user?.user);
    LoginService
      .updateProfil(user?.user?._id, user?.user)
      .then((res) => {
        Swal.fire({
          title: "Votre compte est mis a jour",
          showDenyButton: false,
          confirmButtonText: "D'accord",
        });
        let user = JSON.parse(localStorage.getItem("user"));
        user.user = res.data.data;
        localStorage.setItem("user", JSON.stringify(user));
        setUser(...user.user, res.data.data);
      })
      .catch((err) => {});
  };
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const formatDate = (date) => {
    return (
      new Date(date).toLocaleDateString() +
      " ," +
      new Date(date).toLocaleTimeString()
    );
  };

  return (
    <>
    <div hideSlider={true}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 mt-5">
            <div className="card">
              <div className="card-body">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1 mt-5">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Profile Information</h5>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    votre nom d'utilisateur
                  </label>
                  <input
                    type="text"
                    value={user?.user?.username}
                    className="form-control"
                    name="username"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="nom" className="form-label">
                    Votre nom
                  </label>
                  <input
                    type="text"
                    value={user?.user?.nom}
                    className="form-control"
                    name="nom"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="prenom" className="form-label">
                    Votre prenom
                  </label>
                  <input
                    type="text"
                    value={user?.user?.prenom}
                    className="form-control"
                    name="prenom"
                    onChange={handleInputChange}
                  />
                </div>{" "}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Votre email
                  </label>
                  <input
                    type="email"
                    value={user?.user?.email}
                    className="form-control"
                    name="email"
                    onChange={handleInputChange}
                  />
                </div>{" "}
                <div className="mb-3">
                  <label htmlFor="ville" className="form-label">
                    Votre ville
                  </label>
                  <input
                    type="text"
                    value={user?.user?.ville}
                    className="form-control"
                    name="ville"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="telephone" className="form-label">
                    Votre numéro de telephone
                  </label>
                  <input
                    type="number"
                    value={user?.user?.telephone}
                    className="form-control"
                    onChange={handleInputChange}
                    name="telephone"
                  />
                </div>
                <button
                  type="submit"
                  onClick={updateProfilAction}
                  className="btn btn-primary"
                >
                  Mettre a jour
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-10 offset-md-1 mt-5">
            <div className="container">
            
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProfileAdmin
