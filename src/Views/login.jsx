import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LoginService from '../services/Login.service'
import { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { callback } = useParams();
  console.log("params", callback);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');

    LoginService.signinadmin({ username, password })
      .then((result) => {
        localStorage.setItem("userData", JSON.stringify(result.data));
        if (result.data)
        {
          localStorage.setItem('dataData', JSON.stringify(result.data));
          navigate('home'); 
          toast.success("connecté");
        } else {
          toast.error(result.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('User Name or Password is incorrect!!');
      });
  };

  return (
    
    <div className="bg-gradient-primary full-screen" style={{ height: "100vh" }}>
      <ToastContainer />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image" style={{ height: "670px" }} />
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4" style={{ fontFamily: "cursive", fontSize: "40px", color: "#3d63d2", marginTop: "74px" }}>
                          <b style={{ color: "rgb(0 80 204)", fontFamily: "Times New Roman" }}>Sign In</b>
                        </h1>
                      </div>
                      <form className="user" method="post" onSubmit={onSubmitHandler}>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            name="username"
                            placeholder="Username"
                            style={{ borderRadius: "2.35rem", height: "50px", marginBottom: "35px",fontSize:"0.9rem" }}
                            onChange={onChangeHandler}
                          />
                        </div>
                        <div className="form-group position-relative">
                        <input
  type={showPassword ? "text" : "password"}
  className="form-control form-control-user"
  placeholder="Password"
  name="password"
  style={{ borderRadius: "2.35rem", height: "50px", marginBottom: "35px",fontSize:"0.9rem"}}
  onChange={onChangeHandler}
/>
<FontAwesomeIcon
  icon={showPassword ? faEyeSlash : faEye}
  className="position-absolute top-50 start-2 translate-middle-y"
  style={{ cursor: "pointer", zIndex: "1", marginLeft: "-30px",marginTop:"-67px",marginLeft: "138px"}}
  onClick={() => setShowPassword(!showPassword)}

/>                      </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input type="checkbox" className="custom-control-input" id="customCheck" />
                            <label className="custom-control-label" htmlFor="customCheck"><b>Remember Me</b></label>
                          </div>
                        </div>
                        <div className="form-group">
                        <button
  type="submit"
  style={{
    backgroundColor: "rgb(0 80 204)",
    border: "none",
    color: "white",
    textAlign: "center",
    marginTop: "12px",
    fontSize: "16px",
    padding: "9px 107px",
    borderRadius: "2.35rem",
    transition: "transform 0.3s ease",
  }}
  onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
>
  <b style={{ color: "white" }}>Se connecter</b>
</button>
                        </div>
                      </form>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



  
  )
}

export default Login
