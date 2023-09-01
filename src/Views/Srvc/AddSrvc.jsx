import { Button } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import SrvcService from '../../services/Srvc.service'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify';
const AddSrvc=()=>{
    const navigate = useNavigate()
    const [data,setData]=useState({})
    const [Image,setImage]=useState({})
        const onChangeHandler=(e)=>{
          setData({
            ...data,
            [e.target.name]:e.target.value
          })
          console.log(data)
        }
        const formData = new FormData();
        const onSubmitHandler=(e)=>{
        e.preventDefault()
       
        formData.append('ServiceName', data.ServiceName);
        formData.append('description', data.description);
        formData.append('price', data.price);
     ;
        for (let i = 0; i <= Image.length; i++){
          formData.append('file',Image[i])
        }
        Swal.fire({
          title: 'Do you want to save a new service?',
          showDenyButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
        }).then((result) => {
          if (result.isConfirmed) {
            SrvcService.createService(formData)
              .then((res) => {
                console.log(res);
                Swal.fire('Service ajouté avec succès', '', 'success').then(() => {
                  navigate('/home/ListSrvc');
              });
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info');
          }
        });
      }        
        const onChangeHandlerImage=(e)=>{
          e.preventDefault()
          setImage(e.target.files)
        }
  
  return (
    
 <div>
<div className="col-12">
<ToastContainer />
  <div className="card">
    <div className="card-body">
      <h2 className="text-center mb-4" style={{ color: 'blue', fontFamily: "Times New Roman", fontSize: "35px" }}>
        <b>Add Services</b>
      </h2>
      <form className="form-sample" onSubmit={onSubmitHandler}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label" style={{ color: "blue", fontWeight: "bold", fontFamily: "sans-serif" }}>
              New Service
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="New Service"
              name="ServiceName"
              onChange={onChangeHandler}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" style={{ color: "blue", fontWeight: "bold", fontFamily: "sans-serif" }}>
              Price
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                name="price"
                onChange={onChangeHandler}
              />
              
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" style={{ color: "blue", fontWeight: "bold", fontFamily: "sans-serif" }}>
            Description
          </label>
          <textarea
            className="form-control"
            placeholder="Description"
            rows="3"
            name="description"
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" style={{ color: "blue", fontWeight: "bold", fontFamily: "sans-serif" }}>
            Image
          </label>
          <input
            type="file"
            className="form-control"
            name="file"
            onChange={onChangeHandlerImage}
          />
        </div>
        <br />
        <button type="submit" style={{ padding: "12px", width: "20%", borderRadius: "10px", background: "#336699", color: "#fff", border: "none", boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)", cursor: "pointer", transition: "transform 0.2s" }}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}>
          <b>Add</b>
        </button>
      </form>
    </div>
  </div>
</div>


    </div>
    
  )
} 


export default AddSrvc
